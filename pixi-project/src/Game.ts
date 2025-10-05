import { Board } from "./Board";
import { GameManager } from "./managers/GameManager";

export class Game {

  #board : Board
  #gameManager: GameManager

  constructor() {
    this.#board = new Board();
    this.#gameManager = new GameManager();
  }
}
