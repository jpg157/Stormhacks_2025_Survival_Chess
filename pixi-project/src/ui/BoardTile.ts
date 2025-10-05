import { Assets, Sprite } from "pixi.js";
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
    const label: string = `tile${row}${col}`;
    // @@TODO: set texture based on color
    this.sprite = new Sprite({label: label, anchor: 0.5, });
    this.sprite.getChildByLabel(label);
    const texture = Assets.get("todo");
    this.sprite.texture = texture;
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
