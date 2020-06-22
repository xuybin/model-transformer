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

export class DateInterval {
  public left: { gt: Date } | { gte: Date };
  public right: { lt: Date } | { lte: Date };
  constructor(
    left: { gt: Date } | { gte: Date },
    right: { lt: Date } | { lte: Date },
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
      ? (this.left as { gte: Date }).gte
      : (this.left as { gt: Date }).gt;
  }

  public get rightValue() {
    return this.rightSymbol.includes("=")
      ? (this.right as { lte: Date }).lte
      : (this.right as { lt: Date }).lt;
  }

  public format(datetime: Date) {
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1 < 10
      ? "0" + (datetime.getMonth() + 1)
      : datetime.getMonth() + 1;
    const date = datetime.getDate() < 10
      ? "0" + datetime.getDate()
      : datetime.getDate();
    const hour = datetime.getHours() < 10
      ? "0" + datetime.getHours()
      : datetime.getHours();
    const minute = datetime.getMinutes() < 10
      ? "0" + datetime.getMinutes()
      : datetime.getMinutes();
    const second = datetime.getSeconds() < 10
      ? "0" + datetime.getSeconds()
      : datetime.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" +
      second;
  }

  public toString() {
    return `${this.leftSymbol.includes("=") ? "[" : "("}${
      this.format(this.leftValue)
    },${this.format(this.rightValue)}${
      this.rightSymbol.includes("=") ? "]" : ")"
    }`;
  }
}
