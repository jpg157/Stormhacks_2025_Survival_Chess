// src/main.ts
import { Application, Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { BoardManager } from './managers/BoardManager';
import { Piece } from './pieces/Piece';

// ---------- CONFIG ----------
const BOARD_SIZE = 5;
const TILE = 96;               // tile pixel size
const PIECE_SCALE = 0.6;       // sprite scale relative to tile
const BACKGROUND_COLOR = 0x0f0f13;

// Assets map: piece.getType() -> filename
const PIECE_ASSET: Record<string, string> = {
  Q: '/assets/pieces/queen_coloured.png',
  R: '/assets/pieces/rook_coloured.png',
  B: '/assets/pieces/bishop_coloured.png',
  N: '/assets/pieces/knight_coloured.png',
  T: '/assets/pieces/trident_coloured.png', // Trident
  S: '/assets/pieces/stag_coloured.png', // Stag
};

// ---------- GLOBALS ----------
let app: Application;
let root: Container;
let tilesLayer: Container;
let piecesLayer: Container;

let textures: Map<string, Texture> = new Map();
let game: BoardManager;

let selected: { row: number; col: number } | null = null;
let selectedHighlight: Graphics | null = null;

// ===== 1) start() =====
export async function start(): Promise<void> {
  app = new Application();

  // ✅ v8 requires await init()
  await app.init({
    background: '#0f0f13',   // or BACKGROUND_COLOR if you keep it as string
    antialias: true,
    resizeTo: window,
  });

  // ✅ v8 uses `canvas` (not `view`)
  const mount = document.getElementById('pixi-container') ?? document.body;
  mount.appendChild(app.canvas);

  root = new Container();
  tilesLayer = new Container();
  piecesLayer = new Container();
  app.stage.addChild(root);
  root.addChild(tilesLayer, piecesLayer);

  // Center the board
  root.x = (app.renderer.width  - BOARD_SIZE * TILE) / 2;
  root.y = (app.renderer.height - BOARD_SIZE * TILE) / 2;

  // Load textures
  await loadPieceImage();

  // Game state
  game = new BoardManager();

  renderBoard();
  updateBoardDisplay();

  // Handle resize
  window.addEventListener('resize', () => {
    root.x = (app.renderer.width  - BOARD_SIZE * TILE) / 2;
    root.y = (app.renderer.height - BOARD_SIZE * TILE) / 2;
  });
}

// ===== 2) loadPieceImage() =====
// Preload textures and store them in a map by piece type key
export async function loadPieceImage(): Promise<void> {
  const tasks: Promise<Texture>[] = [];
  for (const [kind, url] of Object.entries(PIECE_ASSET)) {
    tasks.push(
      Assets.load(url).then((tex) => {
        textures.set(kind, tex as Texture);
        return tex as Texture;
      })
    );
  }
  await Promise.all(tasks);
}

// ===== 3) renderBoard() =====
// Build the static tile grid and bind input handlers
export function renderBoard(): void {
  tilesLayer.removeChildren();
  piecesLayer.removeChildren();

  // Basic checker pattern
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const dark = ((r + c) % 2) === 0;
      const g = new Graphics();
      g.beginFill(dark ? 0x2b2f3a : 0x3b4150);
      g.drawRect(0, 0, TILE, TILE);
      g.endFill();
      g.x = c * TILE;
      g.y = r * TILE;

      // Enable pointer
      g.eventMode = 'static';
      g.cursor = 'pointer';
      // attach row/col
      (g as any).__row = r;
      (g as any).__col = c;

      g.on('pointertap', () => handleTileClick(r, c));

      tilesLayer.addChild(g);
    }
  }

  // Selection highlight (created once; toggled later)
  selectedHighlight = new Graphics();
  selectedHighlight.lineStyle(4, 0xffcc33);
  selectedHighlight.drawRect(0, 0, TILE, TILE);
  selectedHighlight.visible = false;
  tilesLayer.addChild(selectedHighlight);
}

// ===== 4) updateBoardDisplay() =====
// Rebuild piece sprites from the current game.board state
export function updateBoardDisplay(): void {
  piecesLayer.removeChildren();

  const board = game.getBoardData(); // (Piece|null)[][]
  
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const tile = board[r][c];
      
      const piece = tile.getPiece();
      if (!piece) continue;

      const kind = piece.getType();
      const tex = textures.get(kind);
      if (!tex) continue;

      const sp = new Sprite(tex);
      sp.anchor.set(0.5);
      sp.x = c * TILE + TILE / 2;
      sp.y = r * TILE + TILE / 2;
      sp.scale.set(PIECE_SCALE);

      // Clicking on a piece = same as clicking its tile
      sp.eventMode = 'static';
      sp.cursor = 'pointer';
      sp.on('pointertap', () => handleTileClick(r, c));

      piecesLayer.addChild(sp);
    }
  }

  // Move selection highlight if needed
  if (selected) {
    selectedHighlight!.visible = true;
    selectedHighlight!.x = selected.col * TILE;
    selectedHighlight!.y = selected.row * TILE;
  } else {
    selectedHighlight!.visible = false;
  }
}

// ===== 5) handleTileClick(row, col) =====
export function handleTileClick(row: number, col: number): void {
  const board = game.getBoardData();
  
  // If nothing is selected yet
  if (!selected) {
    const piece = board[row][col].getPiece();
    if (piece) {
      selected = { row, col };
      updateBoardDisplay();
    }
    return;
  }

  // If clicking the same tile, unselect
  if (selected.row === row && selected.col === col) {
    selected = null;
    updateBoardDisplay();
    return;
  }

  // Try to move selected piece to clicked tile
  const fromPiece = board[selected.row][selected.col].getPiece();
  if (!fromPiece) {
    selected = null;
    updateBoardDisplay();
    return;
  }

  // Only allow legal move (must land on empty tile, per your rules)
  const canMove =
    board[row][col] === null &&
    fromPiece.isValidMove(row, col, board);

  if (canMove) {
    // Perform the move (keep “move into empty tile” invariant)
    board[row][col].setPiece(fromPiece);
    board[selected.row][selected.col].setPiece(null);
    fromPiece.moveTo(row, col);

    // Clear selection and redraw
    selected = null;
    updateBoardDisplay();
    return;
  }

  // If clicked another piece, switch selection
  if (board[row][col]) {
    selected = { row, col };
    updateBoardDisplay();
    return;
  }

  // Otherwise, invalid move: keep selection as is (optional: flash)
}

// -------- Boot --------
start();
