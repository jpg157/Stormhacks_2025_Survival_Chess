import { Container, Sprite } from "pixi.js";
import { Tile } from "../../game-logic/Tile";

export class BoardContainer {
  private container: Container;

  constructor(boardData: Tile[][]) {
    this.container = new Container();
    this.setupContainer(boardData);
  }

  getContainer(): Container {
    return this.container;
  }

  addToContainer(sprite: Sprite) {
    this.container.addChild(sprite);
  }

  private setupContainer(boardData: Tile[][]) {
  }
}
