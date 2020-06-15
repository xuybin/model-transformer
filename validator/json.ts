import { Field } from "../model/field.ts";

export class JsonField extends Field {
  constructor() {
    super("json");
  }
}

export const json = new JsonField();
