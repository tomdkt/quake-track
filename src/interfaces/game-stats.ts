import { PlayerStats } from './player-stats';

export interface GameStats {
  [key: string]: PlayerStats;
}
