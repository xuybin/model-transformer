import { Field, OmitType, onceError } from "./type.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
  protected readonly _attributes: {
    id?: true;
    null?: true;
    unique?: true;
    default?: string;
  } = {
    id: undefined,
    null: undefined,
    unique: undefined,
    default: undefined,
  };

  public get attributes() {
    return this._attributes;
  }

  public get id(): Omit<this, "id" | OmitType> {
    if (this._attributes.id) {
      throw onceError;
    }
    this._attributes.id = true;
    return this;
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
    value: string | "uuid()" | "cuid()",
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

export function string() {
  return new StringField() as Omit<
    StringField,
    OmitType
  >;
}
