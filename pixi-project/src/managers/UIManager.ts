import { Application, Container } from "pixi.js";
// import { AssetManager } from "./AssetManager";
import { BoardContainer } from "../ui/containers/BoardContainer";
import { TutorialContainer } from "../ui/containers/TutorialContainer";
import { Tile } from "../game-logic/Tile";
import { BackgroundContainer } from "../ui/containers/BackgroundContainer";

export class UIManager {

  // private assetManager: AssetManager;

  constructor() {
    // this.assetManager = new AssetManager();
  }

  renderGame(
    app: Application, 
    boardData: Tile[][]
  ) {
    // const assetManager = new AssetManager();
    // assetManager.init();

    // RENDER UI

    // MAIN CONTAINER
    const mainContainer = new BackgroundContainer();

    // BOARD CONTAINER
    const boardContainer = new BoardContainer(boardData);

    // TUTORIAL CONTAINER (INITIALLY HIDDEN)
    const tutorialContainer = new TutorialContainer();

    // APPEND TO MAIN CONTAINER
    mainContainer.getContainer().addChild(boardContainer.getContainer());
    mainContainer.getContainer().addChild(tutorialContainer.getContainer());

    // const dict = await assetManager.getAssets();

  // // TEMP - to debug assets
  // const spriteSize = 64; // replace with your actual sprite size
  // const columns = 5;
  // const padding = 30;
  // let i = 0;

  // for (const key in dict) {
  //   const sprite = dict[key];

  //   const row = Math.floor(i / columns);
  //   const col = i % columns;

  //   sprite.x = col * (spriteSize + padding);
  //   sprite.y = row * (spriteSize + padding);

  //   app.stage.addChild(sprite);
  //   i++;
  // }
  // TEMP - to debug assets

    app.stage.addChild(mainContainer.getContainer());
  }
}
