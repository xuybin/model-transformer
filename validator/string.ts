import { Field } from "../model/field.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
}

export const string = new StringField();
