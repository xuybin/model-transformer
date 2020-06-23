import { Field, OmitType, onceError } from "./field.ts";

export class EnumField extends Field {
  private _name: string;
  constructor(name: string, value: string[]) {
    super("enum");
    if (value.length == 0) {
      throw new Error(`Expected to be nonempty for 'enum'`);
    }
    if (!/^[A-Za-z]{1,}[A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`Expected name start with a letter`);
    }
    for (const iterator of value) {
      if (!/^[A-Za-z]{1,}[A-Za-z0-9_]*$/.test(iterator)) {
        throw new Error(`Expected value start with a letter`);
      }
    }
    this._attributes.enumValue = value;
    this._name = name;
  }

  protected readonly _attributes: {
    null?: true;
    default?: string;
    enumValue: string[];
  } = {
    null: undefined,
    default: undefined,
    enumValue: [],
  };

  public get attributes() {
    return this._attributes;
  }

  public get fieldType(): string {
    return this._array ? `${this._name}[]` : `${this._name}`;
  }

  public objectType(language = "ts"): string {
    return this._array ? `${this._name}[]` : `${this._name}`;
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
    value: string,
  ): Omit<this, "default" | "null" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (!this._attributes.enumValue.includes(value)) {
      throw new Error(
        `Expected value to be equal one of them '${
          this._attributes.enumValue.join(",")
        }'`,
      );
    }
    this._attributes.default = value;
    return this;
  }
}
