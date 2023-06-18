import { LineProcessor } from '../line-processor';
import { DeathCauses } from '../../interfaces/death-causes';
import { GameRepository } from '../../repository/game-repository';

export class KillProcessor extends LineProcessor {
  public static key = /\d+:\d+ Kill:/;

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

    if (this.isSelfDestruction(killer, killerId, deadPlayerId)) {
      this.gameRepository.reducePoints(deadPlayerId);
    } else {
      this.gameRepository.incrementPoints(killerId);
    }

    this.gameRepository.incrementTotalKills();
    this.gameRepository.incrementKillsByMean(deathCause);
  }

  private isSelfDestruction(killer: string, killerId: string, deadPlayerId: string): boolean {
    return killer === '<world>' || killerId === deadPlayerId;
  }
}
