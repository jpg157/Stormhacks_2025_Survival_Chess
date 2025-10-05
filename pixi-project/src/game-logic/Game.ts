import { BoardConstants } from "../constants/ConstantsBoard";
import { Board } from "./Board";

export class Game {
  private board: Board;

  constructor() {
    this.board = new Board(BoardConstants.NUM_ROWS, BoardConstants.NUM_COLS);
  }

  play(): void {
    throw new Error("Not implemented yet");
  }
}
