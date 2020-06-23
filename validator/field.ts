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

  public objectType(language: keyof (typeof TYPE.string) = "ts"): string {
    return this._array
      ? `${TYPE[this._fieldType][language]}[]`
      : `${TYPE[this._fieldType][language]}`;
  }
}

export class Interval {
  public left: { gt: number } | { gte: number };
  public right: { lt: number } | { lte: number };
  constructor(
    left: { gt: number } | { gte: number },
    right: { lt: number } | { lte: number },
  ) {
    this.left = left;
    this.right = right;
  }
  public get leftSymbol() {
    return this.left.hasOwnProperty("gt") ? ">" : ">=";
  }
  public get rightSymbol() {
    return this.right.hasOwnProperty("lt") ? "<" : "<=";
  }
  public get leftValue() {
    return this.leftSymbol.includes("=")
      ? (this.left as { gte: number }).gte
      : (this.left as { gt: number }).gt;
  }

  public get rightValue() {
    return this.rightSymbol.includes("=")
      ? (this.right as { lte: number }).lte
      : (this.right as { lt: number }).lt;
  }

  public toString() {
    return `${
      this.leftSymbol.includes("=") ? "[" : "("
    }${this.leftValue},${this.rightValue}${
      this.rightSymbol.includes("=") ? "]" : ")"
    }`;
  }
}

export type OmitType = "array" | "attributes" | "fieldType" | "objectType";
export const onceError = new Error("Expected method to be called once");

const TYPE = {
  string: { ts: "string" },
  dateTime: { ts: "string" },
  float: { ts: "number" },
  int: { ts: "number" },
  json: { ts: "any" },
  boolean: { ts: "boolean" },
  "": { ts: "" },
};
