import { LineProcessor } from '../line-processor';
import { GameRepository } from '../../repository/game-repository';

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

    const { killerId, deadPlayerId, deathCauseId } = this.extracted(match);

    this.determineScore(killerId, deadPlayerId);
    this.gameRepository.incrementTotalKills();
    this.gameRepository.incrementKillsByMean(deathCauseId);
  }

  private determineScore(killerId: string, deadPlayerId: string) {
    if (this.isSelfDestruction(killerId, deadPlayerId)) {
      this.gameRepository.reducePoints(deadPlayerId);
    } else {
      this.gameRepository.incrementPoints(killerId);
    }
  }

  private extracted(match: RegExpMatchArray): {
    killerId: string;
    deadPlayerId: string;
    deathCauseId: string;
  } {
    const killerId = match[1];
    const deadPlayerId = match[2];
    const deathCauseId = match[3];
    return { killerId, deadPlayerId, deathCauseId };
  }

  private isSelfDestruction(killerId: string, deadPlayerId: string): boolean {
    return this.WORLD_ID === killerId || killerId === deadPlayerId;
  }
}
