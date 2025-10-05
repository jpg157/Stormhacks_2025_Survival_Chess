import { BoardManager } from "./BoardManager";
import { DangerManager } from "./DangerManager";

export class GameManager {

  #boardManager: BoardManager
  #dangerManager: DangerManager

  constructor() {
    this.#boardManager = new BoardManager();
    this.#dangerManager = new DangerManager();
  }

  getPlayerHp(): number {
    throw new Error("not implemented");
  }

  setPlayerHp(hp : number): void {

  }
}
