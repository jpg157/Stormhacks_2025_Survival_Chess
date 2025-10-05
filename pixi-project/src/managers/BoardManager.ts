import { Board } from "../game-logic/Board";
import { PieceManager } from "./PieceManager";

export class BoardManager {
  private pieceManager: PieceManager;

  constructor() {
    this.pieceManager = new PieceManager();
  }

  generateBoardPieces(board: Board): void {
    // this.pieceManager.createPiece();
  }

  updateBoardDisplay(board: Board): void {}

  handleTileClick(row: number, col: number, board: Board): void {}

  isDarkSquare(row: number, col: number) {}
}
