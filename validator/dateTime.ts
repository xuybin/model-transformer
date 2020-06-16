import { Field, OmitType } from "./type.ts";

export class DateTimeField extends Field {
  constructor() {
    super("dateTime");
  }
}

export function dateTime() {
  return new DateTimeField() as Omit<
    DateTimeField,
    OmitType
  >;
}
