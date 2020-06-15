import { Field } from "./type.ts";

export class FloatField extends Field {
  constructor() {
    super("float");
  }
}

export const float = new FloatField();
