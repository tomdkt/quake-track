/**
 * This is the documentation for the `AbstractClass`.
 * Unfortunately, an abstract class had to be used instead of an interface
 * because TypeScript doesn't provide a way to use static members like
 * "public static readonly key: RegExp;" in interfaces.
 *
 * Please remember that while this class might look and behave similarly to an interface, it does have some key differences.
 * The most notable one is that unlike interfaces, abstract classes can provide implementation details for its members.
 *
 * Note: Due to the limitation mentioned above, we are not able to use the more idiomatic TypeScript interface for this class.
 * This is a known limitation of TypeScript and we hope that future versions of the language will allow us to revert to
 * the more idiomatic style.
 */
export abstract class LineProcessor {
  public static readonly key: RegExp;
  abstract handle(line: Readonly<string>): void;
}
