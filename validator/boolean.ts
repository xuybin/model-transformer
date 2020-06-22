import { Field, OmitType, onceError } from "./type.ts";

export class BooleanField extends Field {
  constructor() {
    super("boolean");
  }

  protected readonly _attributes: {
    null?: true;
    default?: boolean;
  } = {
    null: undefined,
    default: undefined,
  };

  public get attributes() {
    return this._attributes;
  }

  public get null(): Omit<this, "null" | "default" | OmitType> {
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

  public default(
    value: boolean,
  ): Omit<this, "default" | "null" | OmitType> {
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

export function boolean() {
  return new BooleanField() as Omit<
    BooleanField,
    OmitType
  >;
}
