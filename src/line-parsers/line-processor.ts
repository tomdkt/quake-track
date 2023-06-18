export abstract class LineProcessor {
  public static readonly key: RegExp;
  abstract processLine(line: string): void;
}
