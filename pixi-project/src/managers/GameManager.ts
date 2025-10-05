import { BoardManager } from "./BoardManager";
import { DangerManager } from "./DangerManager";
import { LocalStorageDataSource } from "../player/LocalStorageDataSource";

interface Player {
  id: string;
  name: string;
  hitpoints: number;
  score: number;
}

export class GameManager {

  #boardManager: BoardManager
  #dangerManager: DangerManager
  #playerSource: LocalStorageDataSource<Player>;

  constructor() {
    this.#boardManager = new BoardManager();
    this.#dangerManager = new DangerManager();
    this.#playerSource = new LocalStorageDataSource<Player>('players');

  }

  getPlayerHp(): number {
    const playerData = this.#playerSource.getById('hitpoints');
    return playerData?.hitpoints ?? 0;
  }

  setPlayerHp(playerId: number, hp : number): void {
    const playerData = this.#playerSource.getById(playerId);
    if (playerData) {
      playerData.hitpoints = hp;
      this.#playerSource.update(playerId, playerData);
    }
  }
}
