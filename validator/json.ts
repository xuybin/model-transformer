import { Field, OmitType } from "./type.ts";

export class JsonField extends Field {
  constructor() {
    super("json");
  }
}

export function json() {
  return new JsonField() as Omit<
    JsonField,
    OmitType
  >;
}
