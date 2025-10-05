import { Board } from "./game-logic/Board";
import { GameManager } from "./managers/GameManager";

export class Game {
  #board: Board;
  #gameManager: GameManager;

  constructor() {
    this.#board = new Board(8, 8); // Example: 8 rows and 8 columns
    this.#gameManager = new GameManager();
  }

  start(): void {
    console.log("Game started");
    // Additional game start logic here
    this.#gameManager.generateTargetBlock();
  }
}
