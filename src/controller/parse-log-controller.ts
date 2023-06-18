import * as fs from 'fs';
import * as readline from 'readline';
import { GameStats } from '../interfaces/game-stats';
import { PlayerStats } from '../interfaces/player-stats';
import { DeathCauses } from '../interfaces/death-causes';
import { LineProcessorManager } from '../line-parsers/line-processor-manager';

export class ParseLogController {
  public constructor(private readonly lineProcessorManager = new LineProcessorManager()) {}

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
      } else {
        this.lineProcessorManager.processLine(trimmedLine, playerStats);
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
