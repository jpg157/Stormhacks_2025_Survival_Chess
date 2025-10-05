import { Container, Sprite } from "pixi.js";

export class TutorialContainer {
  container: Container;

  constructor() {
    this.container = new Container();
    this.setupContainer();
  }

  private setupContainer() {
    this.container.addChild(Sprite.from("/assets/tutorial.png"));
  }
}
