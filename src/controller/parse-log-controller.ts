import { GameStats } from '../interfaces/game-stats';
import { LineProcessorManager } from '../line-parsers/line-processor-manager';
import { FileReader } from '../reader/file-reader';

export class ParseLogController {
  public async parseFileReader(filename: string): Promise<GameStats> {
    const reader = new FileReader(filename);
    const manager = new LineProcessorManager();

    for await (const line of reader.read()) {
      manager.process(line);
    }

    return manager.getReport();
  }
}
