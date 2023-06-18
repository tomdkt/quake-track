export interface Reader {
  read(): AsyncIterable<string>;
}
