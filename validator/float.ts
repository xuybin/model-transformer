import { Field , OmitType} from "./type.ts";

export class FloatField extends Field {
  constructor() {
    super("float");
  }
}

export function float() {
  return new FloatField()  as Omit<
  FloatField,
  OmitType
>;
}
