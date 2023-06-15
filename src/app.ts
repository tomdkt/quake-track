import * as fs from 'fs';
import * as readline from 'readline';

enum DeathCauses {
  MOD_UNKNOWN = 'MOD_UNKNOWN',
  MOD_SHOTGUN = 'MOD_SHOTGUN',
  MOD_GAUNTLET = 'MOD_GAUNTLET',
  MOD_TRIGGER_HURT = 'MOD_TRIGGER_HURT',
  MOD_RAILGUN = 'MOD_RAILGUN',
  MOD_ROCKET_SPLASH = 'MOD_ROCKET_SPLASH',
  MOD_FALLING = 'MOD_FALLING',
}

interface PlayerStats {
  total_kills: number;
  players: string[];
  kills: Record<string, number>;
  kills_by_means: Record<DeathCauses, number>;
}

export interface GameStats {
  [key: string]: PlayerStats;
}

export class ParseLogController {
  public async parseLogFile(filename: string): Promise<GameStats> {
    const fileStream = fs.createReadStream(filename, 'utf8');
    const rl = readline.createInterface({ input: fileStream });
    let gameCounter = 0;
    const gameStats: GameStats = {};
    let playerStats: PlayerStats = this.initializePlayerStats();

    for await (const line of rl) {
      if (line.includes('InitGame:')) {
        playerStats = this.initializePlayerStats();
      } else if (line.includes('ShutdownGame:')) {
        gameStats[`game_${gameCounter + 1}`] = playerStats;
        gameCounter += 1;
      } else if (line.includes('ClientUserinfoChanged:')) {
        const playerInfo = line.split('n\\')[1];
        const playerName = playerInfo.split('\\')[0];
        if (!playerStats.players.includes(playerName)) {
          playerStats.players.push(playerName);
          playerStats.kills[playerName] = 0;
        }
      } else if (line.includes('Kill:')) {
        const segments = line.split(':');
        const killer = segments[3].split('killed')[0].trim();
        const deathCause = segments[3].split('by')[1].trim() as DeathCauses;
        playerStats.total_kills += 1;
        if (killer !== '<world>') {
          playerStats.kills[killer] += 1;
        } else {
          const deadPlayer = segments[3].split('killed')[1].split('by')[0].trim();
          playerStats.kills[deadPlayer] -= 1;
        }
        if (!playerStats.kills_by_means[deathCause]) {
          playerStats.kills_by_means[deathCause] = 0;
        }
        playerStats.kills_by_means[deathCause] += 1;
      }
    }

    return gameStats;
  }

  private initializePlayerStats(): PlayerStats {
    return {
      total_kills: 0,
      players: [],
      kills: {} as Record<string, number>,
      kills_by_means: {} as Record<DeathCauses, number>,
    };
  }
}
/*
const gameStats = parseLogFile('src/assets/qgames.log');
console.log(gameStats);*/
