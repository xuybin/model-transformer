import { Field } from "./type.ts";

export class IntField extends Field {
  constructor() {
    super("int");
  }
}

export function int() {
  return new IntField();
}
