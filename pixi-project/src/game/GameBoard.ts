import { Piece } from './pieces/piece';
import { Bishop } from './pieces/Bishop';
import { Knight } from './pieces/Knight';
import { Queen } from './pieces/Queen';
import { Rook } from './pieces/Rook';
import { Trident } from './pieces/Trident';
import { Stag } from './pieces/Stag';

type Board = (Piece | null)[][];
type PieceCtor = new (row: number, col: number) => Piece;

const BOARD_SIZE = 5;
const CENTER = Math.floor(BOARD_SIZE / 2);
const EVEN_DIVISOR = 2;

// Match Java generator caps
const NUM_PIECE_PER_TYPE_ALLOWED = 4; // 6 types * 4 = 24 (everything but center)
const NUM_BISHOP_ARCHER_ALLOWED   = 2; // per color (dark/light)

export class GameBoard {
  public readonly board: Board;

  constructor() {
    this.board = Array.from({ length: BOARD_SIZE }, () => Array<Piece | null>(BOARD_SIZE).fill(null));
    this.initializeBoard();
  }

  /**
   * Initializes the 5×5 board using the constraints from generateTargetBlock(),
   * placing one empty center at [2][2].
   *
   * Constraints:
   * - Only these piece types: Queen, Knight, Rook, Bishop, Trident, Stag
   * - ≤ 4 of each type total
   * - ≤ 2 Bishops on dark + ≤ 2 Bishops on light
   * - ≤ 2 Tridents on dark + ≤ 2 Tridents on light
   */
  public initializeBoard(): void {
  const MAX_CELL_ATTEMPTS = 100; // try up to 100 rolls per cell
  const MAX_RESTARTS = 10;       // try up to 10 full regenerations

  const availablePieces: PieceCtor[] = [Queen, Knight, Rook, Bishop, Trident, Stag];

  for (let restart = 0; restart < MAX_RESTARTS; restart++) {
    // clear board & counters
    for (let r = 0; r < BOARD_SIZE; r++) this.board[r].fill(null);
    this.board[CENTER][CENTER] = null;

    const pieceCounts = new Array(availablePieces.length).fill(0);
    let darkBishops = 0, lightBishops = 0, darkTridents = 0, lightTridents = 0;

    let failed = false;

    for (let i = 0; i < BOARD_SIZE && !failed; i++) {
      for (let j = 0; j < BOARD_SIZE && !failed; j++) {
        if (i === CENTER && j === CENTER) continue;

        let placed: Piece | null = null;
        let attempts = 0;

        while (!placed && attempts < MAX_CELL_ATTEMPTS) {
          attempts++;

          const idx = Math.floor(Math.random() * availablePieces.length);
          const Ctor = availablePieces[idx];
          const isDark = this.isDarkSquare(i, j);

          // Per-type total cap
          if (pieceCounts[idx] >= NUM_PIECE_PER_TYPE_ALLOWED) {
            continue;
          }

          // Per-color caps for Bishop / Trident
          if (Ctor === Bishop) {
            if (isDark && darkBishops >= NUM_BISHOP_ARCHER_ALLOWED) continue;
            if (!isDark && lightBishops >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          } else if (Ctor === Trident) {
            if (isDark && darkTridents >= NUM_BISHOP_ARCHER_ALLOWED) continue;
            if (!isDark && lightTridents >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          }

          // All checks passed → place
          placed = new Ctor(i, j);
          pieceCounts[idx]++;

          if (Ctor === Bishop) {
            if (isDark) darkBishops++; else lightBishops++;
          } else if (Ctor === Trident) {
            if (isDark) darkTridents++; else lightTridents++;
          }
        }

        if (!placed) {
          // couldn't place after MAX_CELL_ATTEMPTS → restart whole board
          failed = true;
        } else {
          this.board[i][j] = placed;
        }
      }
    }

    if (!failed) {
      // success
      return;
    }

    // optional: console.debug(`[GameBoard] regenerate (restart #${restart + 1})`);
  }

  // If we somehow failed all restarts, throw (or relax caps here)
  throw new Error('Failed to generate 5x5 board within restart limit.');
}

  public getBoard(): Board {
    return this.board;
  }

  public static size(): number {
    return BOARD_SIZE;
  }

  private isDarkSquare(row: number, col: number): boolean {
    return ((row + col) % EVEN_DIVISOR) === 0;
  }
}
