import { Field, OmitType, onceError } from "./field.ts";

export class StringField extends Field {
  constructor() {
    super("string");
  }
  protected readonly _attributes: {
    id?: true;
    null?: true;
    unique?: true;
    default?: string;
    regexp: Array<RegExp>;
  } = {
    id: undefined,
    null: undefined,
    unique: undefined,
    default: undefined,
    regexp: [],
  };

  public get attributes() {
    return this._attributes;
  }

  public get id(): Omit<this, "id" | "unique" | "null" | OmitType> {
    if (this._attributes.id) {
      throw onceError;
    }
    if (this._attributes.unique) {
      throw new Error(`Expected method to be mutually exclusive with 'unique'`);
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    this._attributes.id = true;
    return this;
  }

  public get null(): Omit<this, "null" | "id" | "default" | OmitType> {
    if (this._attributes.null) {
      throw onceError;
    }
    if (this._attributes.id) {
      throw new Error(`Expected method to be mutually exclusive with 'id'`);
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
    }
    this._attributes.null = true;
    return this;
  }

  public get unique(): Omit<this, "unique" | "id" | "default" | OmitType> {
    if (this._attributes.unique) {
      throw onceError;
    }
    if (this._attributes.id) {
      throw new Error(`Expected method to be mutually exclusive with 'id'`);
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
    value: string | "uuid()" | "cuid()",
  ): Omit<this, "default" | "null" | "unique" | "id" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }

    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.unique) {
      throw new Error(`Expected method to be mutually exclusive with 'unique'`);
    }
    if (value != "uuid()" && value != "cuid()") {
      if (this._attributes.id) {
        throw new Error(
          `Expected method to be mutually exclusive with 'id' when value!='uuid()' && value!='cuid()'`,
        );
      }
      for (const iterator of this._attributes.regexp) {
        if (!iterator.test(value)) {
          throw new Error(
            `Expected to pass regular(${iterator}) check's string value`,
          );
        }
      }
    }

    this._attributes.default = value;
    return this;
  }

  public regexp(
    value: RegExp,
  ): Omit<this, OmitType> {
    for (const iterator of this._attributes.regexp) {
      if (`${value}` == `${iterator}`) {
        throw new Error(`Expected regular value unique`);
      }
    }
    this._attributes.regexp.push(value);
    return this;
  }
}

export function string() {
  return new StringField() as Omit<
    StringField,
    OmitType
  >;
}
