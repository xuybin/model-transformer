import { Field, OmitType, onceError } from "./type.ts";

export class IntField extends Field {
  constructor() {
    super("int");
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
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
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
    if (!Number.isInteger(value)) {
      throw new Error(`Expect value to be a int "default(${value})"`);
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.unique) {
      throw new Error(`Expected method to be mutually exclusive with 'unique'`);
    }
    this._attributes.default = value;
    return this;
  }

  public min(
    value: number,
  ): Omit<this, "min" | OmitType> {
    if (this._attributes.min) {
      throw onceError;
    }
    if (!Number.isInteger(value)) {
      throw new Error(`Expect value to be a int "min(${value})"`);
    }
    this._attributes.min = value;
    return this;
  }

  public max(
    value: number,
  ): Omit<this, "max" | OmitType> {
    if (this._attributes.max) {
      throw onceError;
    }
    if (!Number.isInteger(value)) {
      throw new Error(`Expect value to be a int "max(${value})"`);
    }
    this._attributes.max = value;
    return this;
  }
}

export function int() {
  return new IntField() as Omit<
    IntField,
    OmitType
  >;
}
