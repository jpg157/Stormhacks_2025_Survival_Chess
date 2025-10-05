import { Assets, Container, Sprite } from "pixi.js";
import { Tile } from "../../game-logic/Tile";
import { BoardTile } from "../BoardTile";
import { PieceType } from "../../enums/PieceType";

export class BoardContainer {
  private container: Container;

  constructor(boardData: Tile[][]) {
    this.container = new Container();
    
    for (let row = 0; row < boardData.length; row++) {
      for (let col = 0; col < boardData[row].length; col++) {
        const logicBoardTile: Tile = boardData[row][col];
        const uiBoardTile: BoardTile = new BoardTile(row, col, logicBoardTile.getColor());
        this.container.addChild(uiBoardTile.getSprite());
      }
    }
  }

  getContainer(): Container {
    return this.container;
  }

  // Remove or set new
  setBoardTilePiece(row: number, col: number, piece: PieceType | null): void {
    const tileSprite: Sprite = this.container.getChildByLabel(`tile${row}${col}`) as Sprite;
    const pieceSprite: Sprite = tileSprite.getChildByLabel(`piece${row}${col}`) as Sprite;
    if (piece !== null) {
      pieceSprite.texture = Assets.get(piece);
    }
    else {
      tileSprite.removeChild(pieceSprite);
    }
  }
}
