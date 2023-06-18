import * as fs from 'fs';
import * as readline from 'readline';
import { GameStats } from '../interfaces/game-stats';
import { PlayerStats } from '../interfaces/player-stats';
import { DeathCauses } from '../interfaces/death-causes';
import { LineProcessorManager } from '../line-parsers/line-processor-manager';

export class ParseLogController {
  public async parseLogFile(filename: string): Promise<GameStats> {
    const fileStream = fs.createReadStream(filename, 'utf8');
    const rl = readline.createInterface({ input: fileStream });

    const lineProcessorManager = new LineProcessorManager();
    for await (const line of rl) {
      const trimmedLine = line.trim();
      lineProcessorManager.processLine(trimmedLine);
    }

    return lineProcessorManager.getReport();
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
