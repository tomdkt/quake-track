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
    const deathCause = segments[3].split('by')[1].trim() as DeathCauses;

    if (killer !== '<world>' && killerId !== deadPlayerId) {
      this.gameRepository.incrementPoints(killerId);
    } else {
      this.gameRepository.reducePoints(deadPlayerId);
    }

    this.gameRepository.incrementTotalKills();
    this.gameRepository.incrementKillsByMean(deathCause);
  }
}
