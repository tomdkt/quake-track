import { LineProcessor } from '../line-processor';
import { GameRepository } from '../../repository/game-repository';

export class ClientUserInfoChanged extends LineProcessor {
  public static key = /\d+:\d+ ClientUserinfoChanged:/;
  private readonly regex = /ClientUserinfoChanged: (\d+) n\\([^\\]+)\\t/;

  public constructor(private readonly gameRepository: GameRepository) {
    super();
    this.gameRepository = gameRepository;
  }

  public processLine(line: string): void {
    const match = line.match(this.regex);

    if (match) {
      const playerId = match[1];
      const playerName = match[2];
      if (this.gameRepository.doesPlayerNotExist(playerId)) {
        this.gameRepository.addNewPlayer(playerId, playerName);
      }
    }
  }
}
