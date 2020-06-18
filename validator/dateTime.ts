import { Field, OmitType, onceError } from "./type.ts";

export class DateTimeField extends Field {
  constructor() {
    super("dateTime");
  }

  protected readonly _attributes: {
    null?: true;
    updatedAt?: true;
    default?: "now()";
  } = {
    null: undefined,
    updatedAt: undefined,
    default: undefined,
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
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected method to be mutually exclusive with 'updatedAt'`,
      );
    }
    this._attributes.null = true;
    return this;
  }

  public get updatedAt(): Omit<this, "updatedAt" | OmitType> {
    if (this._attributes.updatedAt) {
      throw onceError;
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    this._attributes.updatedAt = true;
    return this;
  }

  public default(
    value: "now()",
  ): Omit<this, "default" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected method to be mutually exclusive with 'updatedAt'`,
      );
    }
    this._attributes.default = value;
    return this;
  }
}

export function dateTime() {
  return new DateTimeField() as Omit<
    DateTimeField,
    OmitType
  >;
}
