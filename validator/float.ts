import { Field, OmitType, onceError } from "./type.ts";

export class FloatField extends Field {
  constructor() {
    super("float");
  }
  protected readonly _attributes: {
    null?: true;
    unique?: true;
    default?: number;
    min?: number;
    max?: number;
  } = {
    null: undefined,
    unique: undefined,
    default: undefined,
    min: undefined,
    max: undefined,
  };

  public get attributes() {
    return this._attributes;
  }

  public get null(): Omit<this, "null" | OmitType> {
    if (this._attributes.null) {
      throw onceError;
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
    }
    this._attributes.null = true;
    return this;
  }

  public get unique(): Omit<this, "unique" | OmitType> {
    if (this._attributes.unique) {
      throw onceError;
    }
    this._attributes.unique = true;
    return this;
  }

  public default(
    value: number,
  ): Omit<this, "default" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    this._attributes.default = value;
    return this;
  }
}

export function float() {
  return new FloatField() as Omit<
    FloatField,
    OmitType
  >;
}
