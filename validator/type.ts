type ObjectType = { ts: string };

const TYPE = {
  string: { ts: "string" },
  dateTime: { ts: "string" },
  enum: { ts: "enum" },
  float: { ts: "number" },
  int: { ts: "number" },
  json: { ts: "object" },
  boolean: { ts: "boolean" },
  "": { ts: "" },
};

export type OmitType = "array" | "attributes" | "fieldType" | "objectType";
export const onceError = new Error("Expected method to be called once");

export class Field {
  protected _array = false;
  private readonly _fieldType: keyof (typeof TYPE);

  constructor(fieldType: keyof (typeof TYPE)) {
    this._fieldType = fieldType;
  }

  public get array(): this {
    this._array = true;
    return this;
  }

  public get fieldType(): string {
    return this._array ? `${this._fieldType}[]` : `${this._fieldType}`;
  }

  public objectType(language: keyof ObjectType = "ts"): string {
    return this._array
      ? `${TYPE[this._fieldType][language]}[]`
      : `${TYPE[this._fieldType][language]}`;
  }
}
