import { Piece } from "../pieces/Piece";

export class Board {
  private numRows: number;
  private numCols: number;
  private board: Piece[][] | null[][];

  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.board  = [];

    for (let i = 0; i < numRows; ++i) {
      for (let i = 0; i < numCols; ++i) {
        this.board[numRows][numCols] = null;
      }
    }
  }
  
  getBoard(): Piece[][] | null[][] {
    return this.board;
  }

  movePiece(
    piece: Piece, 
    oldRow: number, 
    oldCol: number, 
    newRow: number, 
    newCol: number
  ): void {
    this.board[oldRow][oldCol] = null;
    this.board[newRow][newCol] = piece;
  }
}
