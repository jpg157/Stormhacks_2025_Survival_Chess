export class LocalStorageDataSource<T extends { id: string | number }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  public getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as T[]) : [];
  }

  public getById(id: string | number): T | undefined {
    const items = this.getAll();
    return items.find((item) => item.id === id);
  }

  public add(item: T): void {
    const items = this.getAll();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  public update(id: string | number, updatedData: Partial<T>): void {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedData };
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } else {
      throw new Error(`Item with id ${id} not found.`);
    }
  }

  public delete(id: string | number): void {
    const items = this.getAll().filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}
