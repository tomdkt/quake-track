import { LineProcessor } from '../line-processor';
import { GameRepository } from '../../repository/game-repository';
import { deathCauseMapping, DeathCauses } from '../../interfaces/death-causes';

export class KillProcessor extends LineProcessor {
  public static key = /\d+:\d+ Kill:/;
  private readonly regex = /Kill: (\d+) (\d+) (\d+)/;
  private readonly WORLD_ID = '1022';

  public constructor(private readonly gameRepository: GameRepository) {
    super();
    this.gameRepository = gameRepository;
  }

  public processLine(line: string): void {
    const match = line.match(this.regex);
    if (!match) {
      return;
    }

    const killerId = match[1];
    const deadPlayerId = match[2];
    const deathCauseId = match[3] as string;
    const deathCauseName = this.getDeathCauses(deathCauseId);

    if (this.isSelfDestruction(killerId, deadPlayerId)) {
      this.gameRepository.reducePoints(deadPlayerId);
    } else {
      this.gameRepository.incrementPoints(killerId);
    }

    this.gameRepository.incrementTotalKills();
    this.gameRepository.incrementKillsByMean(deathCauseName);
  }

  private isSelfDestruction(killerId: string, deadPlayerId: string): boolean {
    return this.WORLD_ID === killerId || killerId === deadPlayerId;
  }

  private getDeathCauses(deathCause: string): DeathCauses {
    return deathCauseMapping[deathCause];
  }
}
