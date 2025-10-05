import { Piece } from "../pieces/Piece";
import { Tile, TileColor } from "./Tile";

export class Board {
  private numRows: number;
  private numCols: number;
  private board: Tile[][];

  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.board = [];

    for (let row = 0; row < numRows; ++row) {
      const boardRow: Tile[] = [];
      for (let col = 0; col < numCols; ++col) {
        const color: TileColor = (row + col) % 2 === 0 ? "light" as TileColor : "dark" as TileColor;
        boardRow.push(new Tile(color));
      }
      this.board.push(boardRow);
    }
  }

  getBoard(): Tile[][] {
    return this.board;
  }

  movePiece(
    piece: Piece,
    oldRow: number,
    oldCol: number,
    newRow: number,
    newCol: number,
  ): void {
    this.board[oldRow][oldCol]?.setPiece(null);
    this.board[newRow][newCol]?.setPiece(piece);
  }
}
