import { Container, Sprite } from "pixi.js"

export class BackgroundContainer {

  private container: Container;
  
  // The actual appearance of the background container
  private background: Sprite;

  constructor() {
    this.container = new Container();

    //@TODO
    this.background = Sprite.from("todo");
    this.createBackground();
  }

  getContainer() {
    return this.container;
  }

  createBackground() {
    this.background.width = window.innerWidth;
    this.background.height = window.innerHeight;
    this.container.addChild(this.background);
  }
}
