import { Piece } from "../pieces/Piece";

export enum TileColor {
  Light = "light",
  Dark = "dark"
}

export class Tile {
  private piece: Piece | null;
  private color: TileColor;
  
  constructor(color: TileColor, piece?: Piece) {
    if (piece) {
      this.piece = piece;
    } else {
      this.piece = null;
    }
    this.color = color;
  }

  public isOccupied(): boolean {
    return this.piece !== null;
  }

  public occupy(piece: Piece): void {
    this.piece = piece;
  }

  public addPiece(piece: Piece): void {
    this.piece = piece;
  }

  public setPiece(piece: Piece | null): void {
    this.piece = piece;
  }

  public getColor(): TileColor {
    return this.color;
  }
  
  public getPiece(): Piece | null {
    return this.piece;
  }
}