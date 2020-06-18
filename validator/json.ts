import { Field, OmitType, onceError } from "./type.ts";

export class JsonField extends Field {
  constructor() {
    super("json");
  }
  protected readonly _attributes: {
    null?: true;
  } = {
    null: undefined,
  };

  public get attributes() {
    return this._attributes;
  }

  public get null(): Omit<this, "null" | OmitType> {
    if (this._attributes.null) {
      throw onceError;
    }
    this._attributes.null = true;
    return this;
  }
}

export function json() {
  return new JsonField() as Omit<
    JsonField,
    OmitType
  >;
}
