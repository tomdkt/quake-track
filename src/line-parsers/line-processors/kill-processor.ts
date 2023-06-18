import { LineProcessor } from '../line-processor';
import { PlayerStats } from '../../interfaces/player-stats';
import { DeathCauses } from '../../interfaces/death-causes';

export class KillProcessor extends LineProcessor {
  public static key = 'Kill:';

  public processLine(line: string, playerStats: PlayerStats): void {
    const segments = line.split(':');
    const killerId = segments[2].trim().split(' ')[0];
    const deadPlayerId = segments[2].trim().split(' ')[1];
    const killer = segments[3].split('killed')[0].trim();
    const killerName = playerStats.playerNames[killerId];
    const deathCause = segments[3].split('by')[1].trim() as DeathCauses;
    playerStats.total_kills += 1;
    if (killer !== '<world>' && killerId !== deadPlayerId) {
      playerStats.kills[killerName] += 1;
    } else {
      const deadPlayerName = playerStats.playerNames[deadPlayerId];
      playerStats.kills[deadPlayerName] -= 1;
    }
    if (!playerStats.kills_by_means[deathCause]) {
      playerStats.kills_by_means[deathCause] = 0;
    }
    playerStats.kills_by_means[deathCause] += 1;
  }
}
