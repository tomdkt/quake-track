import { PlayerStats } from '../interfaces/player-stats';

export abstract class LineProcessor {
  public static readonly key: string;
  abstract processLine(line: string, playerStats: PlayerStats): void;
}
