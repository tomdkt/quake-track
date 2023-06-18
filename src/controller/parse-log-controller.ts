import * as fs from 'fs';
import * as readline from 'readline';
import { GameStats } from '../interfaces/game-stats';
import { PlayerStats } from '../interfaces/player-stats';
import { DeathCauses } from '../interfaces/death-causes';

export class ParseLogController {
  public async parseLogFile(filename: string): Promise<GameStats> {
    const fileStream = fs.createReadStream(filename, 'utf8');
    const rl = readline.createInterface({ input: fileStream });
    let gameCounter = 0;
    const gameStats: GameStats = {};
    let playerStats: PlayerStats = this.initializePlayerStats();

    for await (const line of rl) {
      const trimmedLine = line.trim();

      if (trimmedLine.includes('InitGame:')) {
        if (gameCounter > 0) {
          gameStats[`game_${gameCounter}`] = playerStats;
          playerStats = this.initializePlayerStats();
        }
        gameCounter += 1;
      } else if (trimmedLine.includes('ClientUserinfoChanged:')) {
        const playerId = trimmedLine.split(' ')[2];
        const playerInfo = trimmedLine.split('n\\')[1];
        const playerName = playerInfo.split('\\')[0];
        if (!playerStats.playerNames[playerId]) {
          playerStats.players.push(playerName);
          playerStats.playerNames[playerId] = playerName;
          playerStats.kills[playerName] = 0;
        }
      } else if (trimmedLine.includes('Kill:')) {
        const segments = trimmedLine.split(':');
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

    // Save the last game stats
    if (gameCounter > 0) {
      gameStats[`game_${gameCounter}`] = playerStats;
    }

    return gameStats;
  }

  private initializePlayerStats(): PlayerStats {
    return {
      total_kills: 0,
      players: [],
      playerNames: {} as Record<string, string>,
      kills: {} as Record<string, number>,
      kills_by_means: {} as Record<DeathCauses, number>,
    };
  }
}
