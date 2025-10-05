import { PieceType } from "../enums/PieceType";
import { Board } from "../game-logic/Board";
import { Piece } from "../pieces/Piece";
import { PieceManager } from "./PieceManager";

export class BoardManager {
  private static readonly START_TILE: [number, number] = [2, 2];
  private static BOARD_SIZE = 5;
  private static EVEN_DIVISOR = 2;


  private pieceManager: PieceManager;
  
  private board: Board;
  // private pieceTypePool: Set<Piece>;

  constructor() {
    this.pieceManager = new PieceManager();
      this.board = new Board(BoardManager.BOARD_SIZE, BoardManager.BOARD_SIZE);
  }

  // generateBoard(board: Board): void {

  //   // this.pieceManager.createPiece();
  // }

  // help me randomly place pieces on the board that are not already occupied and not the start tile
  populateBoard(board: Board): void {
    const gameBoard: Piece[][] | null[][] = board.getBoard();

    this.placeTwoDarkTridentPieces();
    this.placeTwoLightTridentPieces();

    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[j].length; j++) {
        if (i == 2 && j == 2) {
          continue;
        }

        if (gameBoard[i][j] !== null && (i === BoardManager.START_TILE[0] && j === BoardManager.START_TILE[1])) {
          continue;
        }
        
        // Place other pieces randomly on the board
        const pieceTypes = [PieceType.STAG, PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN];
        const randomIndex = Math.floor(Math.random() * pieceTypes.length);
        const selectedPieceType = pieceTypes[randomIndex];
        const piece = this.pieceManager.createPiece(selectedPieceType, i, j);
        board.getBoard()[i][j] = piece;

      }
    }
  }

  private isDarkSquare(row: number, col: number): boolean {
    return ((row + col) % BoardManager.EVEN_DIVISOR) === 0;
  }

  private isLightSquare(row: number, col: number): boolean {
    return ((row + col) % BoardManager.EVEN_DIVISOR) !== 0;
  }

  private isValidTridentDarkSquare(row: number, col: number): boolean {
    if ( 
      (row === 2 && col === 0) || // west
      (row === 0 && col === 2) || // north
      (row === 2 && col === 4) || // east
      (row === 4 && col === 2)  // south
    ) {
      return false;
    }
    return true;
  }

  private isValidTridentLightSquare(row: number, col: number): boolean {
    if (
      (row === 1 && col === 2) ||
      (row === 1 && col === 4) ||
      (row === 2 && col === 1) ||
      (row === 4 && col === 1) ||
      (row === 5 && col === 2) ||
      (row === 5 && col === 4) ||
      (row === 2 && col === 5) ||
      (row === 4 && col === 5)
    ) {
      return false;
    }
    return true;
  }

  private placeTwoDarkTridentPieces() {
    const validDarkSquares: [number, number][] = [];
    
    // Add valid dark squares to list
    for (let i = 0; i < BoardManager.BOARD_SIZE; i++) {
      for (let j = 0; j < BoardManager.BOARD_SIZE; j++) {
        if (this.isDarkSquare(i, j) && this.isValidTridentDarkSquare(i, j)) {
          validDarkSquares.push([i, j]);
        }
      }
    }

    const selectedCoordsOne = validDarkSquares [ Math.random() * validDarkSquares.length ];
    const selectedCoordsTwo = validDarkSquares [ Math.random() * validDarkSquares.length ];
    const selected = [selectedCoordsOne, selectedCoordsTwo];

    for (const [selectedRow, selectedCol] of selected) {
        const piece = this.pieceManager.createPiece(PieceType.TRIDENT, selectedRow, selectedCol);
        this.board.getBoard()[selectedRow][selectedCol] = piece;
        return piece; 
    }
  }

  private placeTwoLightTridentPieces() {
    const validLightSquares: [number, number][] = [];
    for (let i = 0; i < BoardManager.BOARD_SIZE; i++) {
      for (let j = 0; j < BoardManager.BOARD_SIZE; j++) {
        if (this.isLightSquare(i, j) && this.isValidTridentLightSquare(i, j)) {
          validLightSquares.push([i, j]);
        }
      }
    }

    const selectedCoordsOne = validLightSquares[Math.random() * validLightSquares.length];
    const selectedCoordsTwo = validLightSquares[Math.random() * validLightSquares.length];
    const selected = [selectedCoordsOne, selectedCoordsTwo];

    for (const [selectedRow, selectedCol] of selected) {
      const piece = this.pieceManager.createPiece(PieceType.TRIDENT, selectedRow, selectedCol);
      this.board.getBoard()[selectedRow][selectedCol] = piece;
      return piece;
    }
  }

  updateBoardDisplay(board: Board) : void {
    const gameBoard: Piece[][] | null[][] = board.getBoard();

    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[j].length; j++) {
        const piece = gameBoard[i][j];
        if (piece) {
          console.log(`Piece at (${i}, ${j}): ${piece.constructor.name}`);
        } else {
          console.log(`No piece at (${i}, ${j})`);
        }
      }
    }

  }

  handleTileClick(row: number, col: number, board: Board): void {
    const piece = board.getBoard()[row][col];
    if (piece) {
      console.log(`Clicked on piece at (${row}, ${col}): ${piece.constructor.name}`);
      // Additional logic for handling piece selection or movement can be added here
    } else {
      console.log(`Clicked on empty tile at (${row}, ${col})`);
      // Additional logic for handling empty tile clicks can be added here
    }

    this.updateBoardDisplay(board);
    
  }

}
