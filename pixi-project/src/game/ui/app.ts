import { Application, Container } from 'pixi.js';
import { BACKGROUND_COLOR, BOARD_SIZE, TILE } from '../config';

export async function createApp(): Promise<Application> {
  const app = new Application();
  await app.init({
    background: BACKGROUND_COLOR,
    antialias: true,
    resizeTo: window,
  });

  const mount = document.getElementById('pixi-container') ?? document.body;
  mount.appendChild(app.canvas);

  return app;
}

export function centerStage(app: Application, root: Container): void {
  const center = () => {
    root.x = (app.renderer.width  - BOARD_SIZE * TILE) / 2;
    root.y = (app.renderer.height - BOARD_SIZE * TILE) / 2;
  };
  center();
  window.addEventListener('resize', center);
}
