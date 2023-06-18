export abstract class LineProcessor {
  public static readonly key: RegExp;
  abstract handle(line: string): void;
}
