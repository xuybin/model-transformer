import { Field } from "./type.ts";

export class IntField extends Field {
  constructor() {
    super("int");
  }
}

export const int = new IntField();
