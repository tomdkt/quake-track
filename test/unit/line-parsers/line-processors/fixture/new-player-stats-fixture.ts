import { DeathCauses } from '../../../../../src/interfaces/death-causes';
import { PlayerStats } from '../../../../../src/interfaces/player-stats';

export const newPlayerStats = (): PlayerStats => {
  return {
    total_kills: 0,
    players: [],
    playerNames: {} as Record<string, string>,
    kills: {} as Record<string, number>,
    kills_by_means: {} as Record<DeathCauses, number>,
  };
};
