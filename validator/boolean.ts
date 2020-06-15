import { Field } from "../model/field.ts";

export class BooleanField extends Field {
  constructor() {
    super("boolean");
  }
}

export const boolean = new BooleanField();
