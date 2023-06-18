import { LineProcessor } from './line-processor';
import { ClientUserInfoChanged } from './line-processors/client-user-info-changed';
import { PlayerStats } from '../interfaces/player-stats';
import { KillProcessor } from './line-processors/kill-processor';

export class LineProcessorManager {
  private lineProcessors: { [key: string]: LineProcessor } = {};

  public constructor() {
    this.lineProcessors[ClientUserInfoChanged.key] = new ClientUserInfoChanged();
    this.lineProcessors[KillProcessor.key] = new KillProcessor();
  }

  public processLine(line: string, playerStats: PlayerStats): void {
    for (const key in this.lineProcessors) {
      if (line.includes(key)) {
        this.lineProcessors[key].processLine(line, playerStats);
        break;
      }
    }
  }
}
