import { GameStats } from './interfaces/game-stats';
import { ParseLogController } from './controller/parse-log-controller';

export class Main {
  public constructor(private readonly parseLogController: ParseLogController) {}

  public async run(filename: string): Promise<GameStats> {
    return this.parseLogController.parseLogFile(filename);
  }
}
