import { Field, OmitType, onceError } from "./type.ts";

export class JsonField extends Field {
  constructor() {
    super("json");
  }
  protected readonly _attributes: {
    null?: true;
    default?: any;
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
    this._attributes.null = true;
    return this;
  }

  public default(
    value: string,
  ): Omit<this, "default" | "null" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    try {
      this._attributes.default = JSON.parse(value);
    } catch (error) {
      throw new Error(`Expected valid json value`);
    }
    return this;
  }
}

export function json() {
  return new JsonField() as Omit<
    JsonField,
    OmitType
  >;
}
