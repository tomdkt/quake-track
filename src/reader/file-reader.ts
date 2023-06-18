import { Reader } from './reader';
import * as fs from 'fs';
import * as readline from 'readline';

export class FileReader implements Reader {
  private readonly filename: string;

  public constructor(filename: string) {
    this.filename = filename;
  }

  public async *read(): AsyncIterable<string> {
    const fileStream = fs.createReadStream(this.filename, 'utf8');
    const rl = readline.createInterface({ input: fileStream });

    for await (const line of rl) {
      yield line.trim();
    }
  }
}
