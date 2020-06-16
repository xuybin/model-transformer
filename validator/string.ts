import { Field, OmitType } from "./type.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
}

export function string() {
  return new StringField() as Omit<
    StringField,
    OmitType
  >;
}
