import { LineProcessor } from '../line-processor';
import { DeathCauses } from '../../interfaces/death-causes';
import { GameRepository } from '../../repository/game-repository';

export class KillProcessor extends LineProcessor {
  public static key = 'Kill:';

  public constructor(private readonly gameRepository: GameRepository) {
    super();
    this.gameRepository = gameRepository;
  }

  public processLine(line: string): void {
    const segments = line.split(':');
    const killerId = segments[2].trim().split(' ')[0];
    const deadPlayerId = segments[2].trim().split(' ')[1];
    const killer = segments[3].split('killed')[0].trim();
    const killerName = this.gameRepository.getPlayerStats().playerNames[killerId];
    const deathCause = segments[3].split('by')[1].trim() as DeathCauses;
    this.gameRepository.getPlayerStats().total_kills += 1;
    if (killer !== '<world>' && killerId !== deadPlayerId) {
      this.gameRepository.getPlayerStats().kills[killerName] += 1;
    } else {
      const deadPlayerName = this.gameRepository.getPlayerStats().playerNames[deadPlayerId];
      this.gameRepository.getPlayerStats().kills[deadPlayerName] -= 1;
    }
    if (!this.gameRepository.getPlayerStats().kills_by_means[deathCause]) {
      this.gameRepository.getPlayerStats().kills_by_means[deathCause] = 0;
    }
    this.gameRepository.getPlayerStats().kills_by_means[deathCause] += 1;
  }
}
