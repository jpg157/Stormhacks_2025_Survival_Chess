import { Application, Container, WebGLRenderer } from "pixi.js";
import { GameManager } from "./managers/GameManager";

(async () => {
  // Create a new application
  const app = new Application();
  const renderer = new WebGLRenderer();
  await renderer.init();
  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window, preference: "webgl" });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  app.render();
  const gameManager: GameManager = new GameManager();
  gameManager.startGame(app);

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
})();
