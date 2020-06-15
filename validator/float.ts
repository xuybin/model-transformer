import { Field } from "./type.ts";

export class FloatField extends Field {
  constructor() {
    super("float");
  }
}

export function float() {
  return new FloatField();
}
