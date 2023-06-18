import { DeathCauses } from './death-causes';

export interface PlayerStats {
  total_kills: number;
  players: string[];
  playerNames: Record<string, string>;
  kills: Record<string, number>;
  kills_by_means: Record<DeathCauses, number>;
}
