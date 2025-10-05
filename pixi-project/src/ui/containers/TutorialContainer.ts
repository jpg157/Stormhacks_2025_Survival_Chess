import { Container, Sprite } from "pixi.js";

export class TutorialContainer {

  private container: Container;

  constructor() {
    this.container = new Container();
    this.setupContainer();
  }

  getContainer(): Container {
    return this.container;
  }

  private setupContainer() {
    this.container.addChild(Sprite.from("/assets/tutorial.png"));
  }
}
