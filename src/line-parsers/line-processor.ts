export abstract class LineProcessor {
  public static readonly key: string;
  abstract processLine(line: string): void;
}
