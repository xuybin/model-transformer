import { Field } from "./type.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
}

export function string() {
  return new StringField();
}
