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
    if (!match) {
      return;
    }

    const { playerId, playerName } = this.extracted(match);
    if (this.gameRepository.doesPlayerNotExist(playerId)) {
      this.gameRepository.addNewPlayer(playerId, playerName);
    }
  }

  private extracted(match: RegExpMatchArray): { playerId: string; playerName: string } {
    const playerId = match[1];
    const playerName = match[2];
    return { playerId, playerName };
  }
}
