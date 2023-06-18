import { LineProcessor } from '../line-processor';
import { GameRepository } from '../../repository/game-repository';
import assert from 'assert';

export class InitGame extends LineProcessor {
  public static key = 'InitGame:';

  public constructor(private readonly gameRepository: GameRepository) {
    super();
    this.gameRepository = gameRepository;
  }

  public processLine(line: string): void {
    assert(line);
    this.gameRepository.initNewGame();
  }
}
