import { Assets, Sprite } from "pixi.js";
import { PieceType } from "../enums/PieceType";

export class PieceUi {
  private row: number;
  private col: number;
  private sprite: Sprite;
  
  constructor(row: number, col: number, pieceType: PieceType) {
    this.row = row;
    this.col = col;

    const label: string = `piece${row}${col}`;
    const chessPieceAssets = Assets.loadBundle("chessPieces");
    
    this.sprite = new Sprite({ label: label, anchor: 0.5 });
  }

  getRow(): number {
    return this.row;
  }
  
  getCol(): number {
    return this.col;
  }
  
  setRow(row: number): void {
    this.row = row;
  }

  setCol(col: number): void {
    this.col = col;
  }

  getSprite(): Sprite {
    return this.sprite;
  }
}