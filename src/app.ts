import * as fs from 'fs';
import * as readline from 'readline';

enum DeathCauses {
  MOD_UNKNOWN = 'MOD_UNKNOWN',
  MOD_SHOTGUN = 'MOD_SHOTGUN',
  MOD_GAUNTLET = 'MOD_GAUNTLET',
  MOD_MACHINEGUN = 'MOD_MACHINEGUN',
  MOD_GRENADE = 'MOD_GRENADE',
  MOD_GRENADE_SPLASH = 'MOD_GRENADE_SPLASH',
  MOD_ROCKET = 'MOD_ROCKET',
  MOD_ROCKET_SPLASH = 'MOD_ROCKET_SPLASH',
  MOD_PLASMA = 'MOD_PLASMA',
  MOD_PLASMA_SPLASH = 'MOD_PLASMA_SPLASH',
  MOD_RAILGUN = 'MOD_RAILGUN',
  MOD_LIGHTNING = 'MOD_LIGHTNING',
  MOD_BFG = 'MOD_BFG',
  MOD_BFG_SPLASH = 'MOD_BFG_SPLASH',
  MOD_WATER = 'MOD_WATER',
  MOD_SLIME = 'MOD_SLIME',
  MOD_LAVA = 'MOD_LAVA',
  MOD_CRUSH = 'MOD_CRUSH',
  MOD_TELEFRAG = 'MOD_TELEFRAG',
  MOD_FALLING = 'MOD_FALLING',
  MOD_SUICIDE = 'MOD_SUICIDE',
  MOD_TARGET_LASER = 'MOD_TARGET_LASER',
  MOD_TRIGGER_HURT = 'MOD_TRIGGER_HURT',
  MOD_NAIL = 'MOD_NAIL', // #ifdef MISSIONPACK
  MOD_CHAINGUN = 'MOD_CHAINGUN',
  MOD_PROXIMITY_MINE = 'MOD_PROXIMITY_MINE',
  MOD_KAMIKAZE = 'MOD_KAMIKAZE',
  MOD_JUICED = 'MOD_JUICED', // #endif
  MOD_GRAPPLE = 'MOD_GRAPPLE',
}

export const DeathCausesArray = Object.values(DeathCauses);

interface PlayerStats {
  total_kills: number;
  playersIds: string[];
  players: string[];
  playerNames: Record<string, string>;
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
        if (!playerStats.playersIds.includes(playerId)) {
          playerStats.playersIds.push(playerId);
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
      playersIds: [],
      playerNames: {} as Record<string, string>,
      kills: {} as Record<string, number>,
      kills_by_means: {} as Record<DeathCauses, number>,
    };
  }
}
