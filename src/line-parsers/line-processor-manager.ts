import { LineProcessor } from './line-processor';
import { ClientUserInfoChanged } from './line-processors/client-user-info-changed';
import { KillProcessor } from './line-processors/kill-processor';
import { InitGame } from './line-processors/init-game';
import { GameRepository } from '../repository/game-repository';
import { GameStats } from '../interfaces/game-stats';

export class LineProcessorManager {
  private readonly lineProcessors: Map<RegExp, LineProcessor> = new Map();

  public constructor(private readonly gameRepository: GameRepository = new GameRepository()) {
    this.lineProcessors.set(InitGame.key, new InitGame(gameRepository));
    this.lineProcessors.set(ClientUserInfoChanged.key, new ClientUserInfoChanged(gameRepository));
    this.lineProcessors.set(KillProcessor.key, new KillProcessor(gameRepository));
  }

  public process(line: Readonly<string>): void {
    for (const [key, lineProcessor] of this.lineProcessors) {
      if (key.test(line)) {
        lineProcessor.handle(line);
        break;
      }
    }
  }

  public getReport(): GameStats {
    return this.gameRepository.getGameStats();
  }
}
