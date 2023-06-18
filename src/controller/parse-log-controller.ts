import { GameStats } from '../interfaces/game-stats';
import { LineProcessorManager } from '../line-parsers/line-processor-manager';
import { FileReader } from '../reader/file-reader';

export class ParseLogController {
  public async parseFileReader(filename: string): Promise<GameStats> {
    const reader = new FileReader(filename);
    const lineProcessorManager = new LineProcessorManager();

    for await (const line of reader.read()) {
      lineProcessorManager.processLine(line);
    }

    return lineProcessorManager.getReport();
  }
}
