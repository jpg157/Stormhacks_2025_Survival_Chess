import { BoardManager } from "./BoardManager";
import { DangerManager } from "./DangerManager";
import { LocalStorageDataSource } from "../player/LocalStorageDataSource";
import { Piece } from "../pieces/Piece";
import { Queen } from "../pieces/Queen";
import { Rook } from "../pieces/Rook";
import { Knight } from "../pieces/Knight";
import { Bishop } from "../pieces/Bishop";
import { Trident } from "../pieces/Trident";
import { Stag } from "../pieces/Stag";

interface Player {
  id: string;
  name: string;
  hitpoints: number;
  score: number;
}

type PieceType = 'Queen' | 'Knight' | 'Rook' | 'Bishop' | 'Archer' | 'Camel';

const TARGET_BLOCK_LENGTH = 3
const NUM_PIECE_PER_TYPE_ALLOWED = 4
const NUM_BISHOP_ARCHER_ALLOWED = 2

export class GameManager {

  #boardManager: BoardManager
  #dangerManager: DangerManager
  #playerSource: LocalStorageDataSource<Player>;
  private boardManager: BoardManager
  private dangerManager: DangerManager

  constructor() {
    this.#boardManager = new BoardManager();
    this.#dangerManager = new DangerManager();
    this.#playerSource = new LocalStorageDataSource<Player>('players');

    this.boardManager = new BoardManager();
    this.dangerManager = new DangerManager();
  }

  getPlayerHp(): number {
    const playerData = this.#playerSource.getById('hitpoints');
    return playerData?.hitpoints ?? 0;
  }

  setPlayerHp(playerId: number, hp : number): void {
    const playerData = this.#playerSource.getById(playerId);
    if (playerData) {
      playerData.hitpoints = hp;
      this.#playerSource.update(playerId, playerData);
    }
  }

  isDarkSquare(x: number, y: number): boolean {
    return (x + y) % 2 === 0;
  }

  createPiece(type: PieceType, x: number, y: number): Piece | null {
    if (!this.isValidPiecePosition(type, x, y)) {
      return null;
    }
    switch(type) {
      case 'Queen':
        return new Queen(x, y);
      case 'Rook':
        return new Rook(x, y);
      case 'Knight':
        return new Knight(x, y);
      case 'Bishop':
        return new Bishop(x, y);
      case 'Archer':
        return new Trident(x, y);
      case 'Camel':
        return new Stag(x, y);
      default:
        return null;
    }
  }

  private isValidPiecePosition(type: PieceType, x: number, y: number): boolean {
    const isDarkSquare = this.isDarkSquare(x, y);
    if (isDarkSquare) {
      return ['Queen', 'Rook', 'Knight', 'Bishop'].includes(type);
    } else {
      return ['Archer', 'Camel'].includes(type);
    }
  }

  pickPiece(dark: boolean,
    pieceCounts: Record<PieceType, number>,
    darkLight: { darkBishops: number; lightBishops: number; darkArchers: number; lightArchers: number}
  ): PieceType {
      const availablePieces: PieceType[] = ['Queen', 'Knight', 'Rook', 'Bishop', 'Archer', 'Camel'];

      for (let i = availablePieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availablePieces[i], availablePieces[j]] = [availablePieces[j], availablePieces[i]];
      }

      for (const piece of availablePieces) {
        if (pieceCounts[piece] >= NUM_PIECE_PER_TYPE_ALLOWED) continue;

        if (piece === 'Bishop') {
          if (dark && darkLight.darkBishops >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          if (!dark && darkLight.lightBishops >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          dark ? darkLight.darkBishops++ : darkLight.lightBishops++;
        }

        if (piece === 'Archer') {
          if (dark && darkLight.darkArchers >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          if (!dark && darkLight.lightArchers >= NUM_BISHOP_ARCHER_ALLOWED) continue;
          dark ? darkLight.darkArchers++ : darkLight.lightArchers++;
        }

        pieceCounts[piece]++;
    return piece;
    }

  // fallback
  return 'Queen'
  }

  generateTargetBlock(): Piece[][] {
    const counts: Record<PieceType, number> = {
      Queen: 0,
      Knight: 0,
      Rook: 0,
      Bishop: 0,
      Archer: 0,
      Camel: 0
    };

    const darkLight = { darkBishops: 0, lightBishops: 0, darkArchers: 0, lightArchers: 0 };

    const block: Piece[][] = [];


    for (let i = 0; i < TARGET_BLOCK_LENGTH; i++) {
      const row: Piece[] = []

      for (let j = 0; j < TARGET_BLOCK_LENGTH; j++) {
        const dark = this.isDarkSquare(i, j)
        const type = this.pickPiece(dark, counts, darkLight)
        const piece = this.createPiece(type, i, j);
        if (piece) {
          row.push(piece);
        }
      }

      block.push(row);
    }

  return block;
}
}
