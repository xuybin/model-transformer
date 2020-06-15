import { Field } from "./type.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
}

export const string = new StringField();
