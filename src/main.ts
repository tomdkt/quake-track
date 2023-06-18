import { GameStats } from './interfaces/game-stats';
import { ParseLogController } from './controller/parse-log-controller';

export class Main {
  public constructor(
    private readonly parseLogController: ParseLogController = new ParseLogController()
  ) {}

  public async run(filename: string): Promise<GameStats> {
    return this.parseLogController.parseFileReader(filename);
  }

  public async runFromEnv(): Promise<GameStats> {
    const filename = process.argv[2];
    return this.parseLogController.parseFileReader(filename);
  }
}
