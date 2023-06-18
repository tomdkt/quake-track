import { LineProcessor } from './line-processor';
import { ClientUserInfoChanged } from './line-processors/client-user-info-changed';
import { KillProcessor } from './line-processors/kill-processor';
import { InitGame } from './line-processors/init-game';
import { GameRepository } from '../repository/game-repository';
import { GameStats } from '../interfaces/game-stats';

export class LineProcessorManager {
  private lineProcessors: { [key: string]: LineProcessor } = {};

  public constructor(private readonly gameRepository: GameRepository = new GameRepository()) {
    this.lineProcessors[InitGame.key] = new InitGame(gameRepository);
    this.lineProcessors[ClientUserInfoChanged.key] = new ClientUserInfoChanged(gameRepository);
    this.lineProcessors[KillProcessor.key] = new KillProcessor(gameRepository);
  }

  public processLine(line: string): void {
    for (const key in this.lineProcessors) {
      if (line.includes(key)) {
        this.lineProcessors[key].processLine(line);
        break;
      }
    }
  }

  public getReport(): GameStats {
    return this.gameRepository.getGameStats();
  }
}
