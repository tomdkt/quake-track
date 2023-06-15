import fs from 'fs';

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
  public parseLogFile(filename: string): GameStats {
    const data = fs.readFileSync(filename, 'utf8');
    const games = data.split('------------------------------------------------------------');
    let gameCounter = 1;
    const gameStats: GameStats = {};

    for (const game of games) {
      const lines = game.split('\n');
      const playerStats: PlayerStats = {
        total_kills: 0,
        players: [],
        kills: {} as Record<string, number>,
        kills_by_means: {} as Record<DeathCauses, number>,
      };

      for (const line of lines) {
        if (line.includes('ClientUserinfoChanged:')) {
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

      gameStats[`game_${gameCounter}`] = playerStats;
      gameCounter += 1;
    }

    return gameStats;
  }
}
/*
const gameStats = parseLogFile('src/assets/qgames.log');
console.log(gameStats);*/
