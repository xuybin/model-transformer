import { Field } from "../model/field.ts";

export class DateTimeField extends Field {
  constructor() {
    super("dateTime");
  }
}

export const dateTime = new DateTimeField();
