import { LineProcessor } from '../line-processor';
import { PlayerStats } from '../../interfaces/player-stats';

export class ClientUserInfoChanged extends LineProcessor {
  public static key = 'ClientUserinfoChanged:';

  public processLine(line: string, playerStats: PlayerStats): void {
    const playerId = line.split(' ')[2];
    const playerInfo = line.split('n\\')[1];
    const playerName = playerInfo.split('\\')[0];
    if (!playerStats.playerNames[playerId]) {
      playerStats.players.push(playerName);
      playerStats.playerNames[playerId] = playerName;
      playerStats.kills[playerName] = 0;
    }
  }
}
