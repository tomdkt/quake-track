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
    if (!this.gameRepository.getPlayerStats().playerNames[playerId]) {
      this.gameRepository.getPlayerStats().players.push(playerName);
      this.gameRepository.getPlayerStats().playerNames[playerId] = playerName;
      this.gameRepository.getPlayerStats().kills[playerName] = 0;
    }
  }
}
