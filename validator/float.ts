import { Field } from "../model/field.ts";

export class FloatField extends Field {
  constructor() {
    super("float");
  }
}

export const float = new FloatField();
