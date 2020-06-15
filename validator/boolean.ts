import { Field } from "./type.ts";

export class BooleanField extends Field {
  constructor() {
    super("boolean");
  }
}

export function boolean() {
  return new BooleanField();
}