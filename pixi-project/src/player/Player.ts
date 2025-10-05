import { LocalStorageDataSource } from "./LocalStorageDataSource";

export interface Player {
  id: string;
  name: string;
  hitpoints: number;
  score: number;
}

const playerSource = new LocalStorageDataSource<Player>("players");
