import { Container, Sprite } from "pixi.js";
import { Piece } from "../../pieces/Piece";
import { Tile } from "../../game-logic/Tile";

export class BoardContainer {
  private container: Container;

  constructor(boardData: Tile[][]) {
    this.container = new Container();
  }

  getContainer(): Container {
    return this.container;
  }

  addToContainer(sprite: Sprite) {
    this.container.addChild(sprite);
  }
}
