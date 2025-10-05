import { LocalStorageDataSource } from "./LocalStorageDataSource";

interface Player {
  id: string;
  name: string;
  hitpoints: number;
  score: number;
}

const playerSource = new LocalStorageDataSource<Player>('players');

