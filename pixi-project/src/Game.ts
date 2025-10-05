import { GameManager } from "./managers/GameManager";

export class Game {

  #gameManager: GameManager;

  constructor() {
    this.#gameManager = new GameManager();
  }

  start(): void {
    console.log("Game started");
    // Additional game start logic here
    this.#gameManager.generateTargetBlock();
  }
}
