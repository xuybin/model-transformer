import { Field } from "./type.ts";

export class EnumField extends Field {
  public readonly enumValue: string[];
  constructor(value: string[]) {
    super("enum");
    if (value.length == 0) {
      throw new Error(`Expected to be nonempty for 'enum'`);
    }
    for (const iterator of value) {
      if (!/^[A-Za-z]{1,}[A-Za-z0-9_]*$/.test(iterator)) {
        throw new Error(`Expected start with a letter for 'enum'`);
      }
    }
    this.enumValue = value;
  }
}
