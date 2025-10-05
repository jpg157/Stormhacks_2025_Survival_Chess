import { Container } from 'pixi.js';
import { createApp, centerStage } from './game/ui/app';
import { loadPieceTextures } from './game/ui/assets';
import { GameBoard } from './game/game_board/GameBoard';
import { GameController } from './game/controllers/GameController';
import { BoardView } from './game/ui/BoardView';
import { GameUI } from './game/ui/GameUI';
import { TILE } from './game/config';

async function start(): Promise<void> {
  const app = await createApp();

  const root = new Container();
  app.stage.addChild(root);
  centerStage(app, root);

  const textures = await loadPieceTextures();

  const game = new GameBoard();
  const controller = new GameController(game);
  const view = new BoardView(controller, textures);
  const gameUI = new GameUI();

  // Position the UI to the right of the board
  const boardSize = TILE * 5; // 5x5 board
  gameUI.position(boardSize + 20, 20);

  root.addChild(view.root);
  root.addChild(gameUI.root);

  view.drawTiles();
  view.updatePieces();

  // Set up wave manager callbacks
  const waveManager = controller.getWaveManager();
  waveManager.setCallbacks({
    onWaveStart: (wave) => {
      gameUI.showWaveStart(wave.waveNumber, wave.targets.length, wave.totalTime);
      view.updatePieces(); // Refresh to show danger tiles and targeted pieces
    },
    onWaveEnd: (success, wave) => {
      if (success) {
        gameUI.showWaveSuccess(wave.waveNumber);
      } else {
        gameUI.showWaveFailure(wave.waveNumber);
      }
      view.updatePieces(); // Refresh to clear danger tiles
    },
    onGameOver: (finalWave) => {
      gameUI.showGameOver(finalWave);
    },
    onTimerUpdate: (timeRemaining) => {
      gameUI.updateTimer(timeRemaining);
    }
  });

  // Set up start button callback
  gameUI.onStartButtonClick(() => {
    // Regenerate board for new game
    game.regenerate();
    view.updatePieces();
    
    // Start the wave system
    waveManager.startGame();
  });
}

start();
