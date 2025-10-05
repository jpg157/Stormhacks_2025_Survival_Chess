import { Container, Sprite } from "pixi.js";
import { Piece } from "../../pieces/Piece";

export class BoardContainer {
  private container: Container;

  constructor(boardData: Piece[][] | null[][]) {
    this.container = new Container();
  }

  getContainer(): Container {
    return this.container;
  }

  addToContainer(sprite: Sprite) {
    this.container.addChild(sprite);
  }
}
