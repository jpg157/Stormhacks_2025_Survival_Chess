import { Sprite } from "pixi.js";

export class PieceUi {
  private row: number;
  private col: number;
  private sprite: Sprite;
  
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;

    const label: string = `Piece ${row} ${col}`;

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