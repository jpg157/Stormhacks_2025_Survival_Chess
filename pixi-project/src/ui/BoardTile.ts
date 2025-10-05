import { Sprite } from "pixi.js";
import { TileColor } from "../game-logic/Tile";

export class BoardTile {
  private row: number;
  private col: number;
  private color: TileColor;
  private sprite: Sprite;
  constructor(row: number, col: number, color: TileColor) {
    this.row = row;
    this.col = col;
    this.color = color;
    // @@TODO: set texture based on color
    this.sprite = new Sprite();
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

}
