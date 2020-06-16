import { Field } from "./type.ts";

export class IntField extends Field {
  constructor() {
    super("int");
  }
  protected readonly intAttributes: {
    min?: number;
    max?: number;
  } = {
    min: undefined,
    max: undefined,
  };

  public min(
    value: number,
  ): Omit<this, "min" | "attributes" | "fieldType" | "objectType"> {
    this.intAttributes.min = value;
    return this;
  }
  public max(
    value: number,
  ): Omit<this, "max" | "attributes" | "fieldType" | "objectType"> {
    this.intAttributes.max = value;
    return this;
  }

  public get attributes() {
    return {
      ...this._attributes,
      ...this.intAttributes,
    };
  }
}

export function int() {
  return new IntField() as Omit<
    IntField,
    "array" | "attributes" | "fieldType" | "objectType"
  >;
}
