import { Container, Sprite } from "pixi.js";

export class BoardContainer {
  container: Container;

  constructor() {
    this.container = new Container();
  }

  addToContainer(sprite: Sprite) {
    this.container.addChild(sprite);
  }
}
