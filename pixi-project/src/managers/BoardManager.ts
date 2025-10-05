import { PieceType } from "../enums/PieceType";
import { Board } from "../game-logic/Board";
import { Tile } from "../game-logic/Tile";
import { Piece } from "../pieces/Piece";
import { PieceManager } from "./PieceManager";

const NUM_PIECE_PER_TYPE_ALLOWED = 4;

export class BoardManager {
  private static readonly START_TILE: [number, number] = [2, 2];
  private static BOARD_SIZE = 5;
  private static EVEN_DIVISOR = 2;

  private readonly pieceManager: PieceManager;
  private readonly   board: Board;
  private static readonly center: number = Math.floor(BoardManager.BOARD_SIZE / 2);

  constructor() {
    this.pieceManager = new PieceManager();
    this.board = new Board(BoardManager.BOARD_SIZE, BoardManager.BOARD_SIZE);
    this.populateBoard()
  }

  getBoardData(): Tile[][] {
    return this.board.getBoard();
  }

  // help me randomly place pieces on the board that are not already occupied and not the start tile
  populateBoard(): void {
    console.log("populate board");
    const gameBoard: Tile[][] = this.board.getBoard();

    const availablePieces: PieceType[] = [
      PieceType.QUEEN,
      PieceType.KNIGHT,
      PieceType.ROOK,
      PieceType.BISHOP,
      PieceType.STAG,
      PieceType.TRIDENT,
    ];
    // Track how many of each piece type have been placed
    this.board.getBoard()[BoardManager.center][BoardManager.center].setPiece(null);
    const pieceCounts = new Array(availablePieces.length).fill(0);

    // Place tridents first.
    this.placeTwoDarkTridentPieces();
    this.placeTwoLightTridentPieces();

    let failed = false;
    
    for (let i = 0; i < BoardManager.BOARD_SIZE && !failed; i++) {
      for (let j = 0; j < BoardManager.BOARD_SIZE && !failed; j++) {
        if (i == BoardManager.center && j == BoardManager.center) continue;
        

        let placed: Piece | null = null;
        let attempts = 0;

        while (!placed && attempts < 10) {
          attempts++;
          const randomIndex = Math.floor(Math.random() * availablePieces.length);
          const selectedPieceType = availablePieces[randomIndex];

          if (pieceCounts[randomIndex] >= NUM_PIECE_PER_TYPE_ALLOWED) {
            continue;
          }
          placed = this.pieceManager.createPiece(selectedPieceType, i, j);
          pieceCounts[randomIndex]++;
        }
        
        if (!placed) {
          failed = true;
        } else {
          this.board.getBoard()[i][j].setPiece(placed);
        }

      }
    }
    if (!failed) {
      return;
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

    const coordIndexOne = Math.floor(Math.random() * validDarkSquares.length);
    validDarkSquares.splice(coordIndexOne, 1);
    
    const coordIndexTwo = Math.floor(Math.random() * validDarkSquares.length);

    const selectedCoordsOne = validDarkSquares[coordIndexOne];
    const selectedCoordsTwo = validDarkSquares[coordIndexTwo];

    const selected = [selectedCoordsOne, selectedCoordsTwo];

    for (const [selectedRow, selectedCol] of selected) {
        const piece = this.pieceManager.createPiece(PieceType.TRIDENT, selectedRow, selectedCol);
        this.board.getBoard()[selectedRow][selectedCol].setPiece(piece);
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

    const coordIndexOne = Math.floor(Math.random() * validLightSquares.length);
    validLightSquares.splice(coordIndexOne, 1);
    
    const coordIndexTwo = Math.floor(Math.random() * validLightSquares.length);

    const selectedCoordsOne = validLightSquares[coordIndexOne];
    const selectedCoordsTwo = validLightSquares[coordIndexTwo];

    const selected = [selectedCoordsOne, selectedCoordsTwo];

    selected.forEach((coords) => {
      const selectedRow = coords[0];
      const selectedCol = coords[1];
      
      const piece = this.pieceManager.createPiece(PieceType.TRIDENT, selectedRow, selectedCol);
      this.board.getBoard()[selectedRow][selectedCol].setPiece(piece);

      return piece;
    });
  }

}
