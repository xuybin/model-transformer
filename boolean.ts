import { Field } from "./type.ts";

export class BooleanField extends Field {
  constructor() {
    super("boolean");
  }
}

export const boolean = new BooleanField();
