import { LineProcessor } from '../line-processor';
import { GameRepository } from '../../repository/game-repository';

export class ClientUserInfoChanged extends LineProcessor {
  public static key = 'ClientUserinfoChanged:';

  public constructor(private readonly gameRepository: GameRepository) {
    super();
    this.gameRepository = gameRepository;
  }

  public processLine(line: string): void {
    const playerId = line.split(' ')[2];
    const playerInfo = line.split('n\\')[1];
    const playerName = playerInfo.split('\\')[0];

    if (this.gameRepository.doesPlayerNotExist(playerId)) {
      this.gameRepository.addNewPlayer(playerId, playerName);
    }
  }
}
