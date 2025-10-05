import { PieceType } from "../enums/PieceType";
import { Bishop } from "../pieces/Bishop";
import { Knight } from "../pieces/Knight";
import { Piece } from "../pieces/Piece";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { Trident } from "../pieces/Trident";

export class PieceManager {

  constructor() {}

  createPiece(pieceType: PieceType, row: number, col: number): Piece {
    switch (pieceType) {
      case (PieceType.BISHOP): {
        return new Bishop(row, col);
      }
      case (PieceType.KNIGHT): {
        return new Knight(row, col);
      }
      case (PieceType.QUEEN): {
        return new Queen(row, col);
      }
      case (PieceType.ROOK): {
        return new Rook(row, col);
      }
      case (PieceType.STAG): {
        return new Rook(row, col);
      }
      case (PieceType.TRIDENT): {
        return new Trident(row, col);
      }
      default: {
        throw new Error("The type specified does not match any of the existing piece types");
      }
    }
  }
}