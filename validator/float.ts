import { Field, OmitType, onceError } from "./type.ts";

export const Float = {
  MIN_VALUE: new Number("-3.402823466E+38").valueOf(),
  MAX_VALUE: new Number("3.402823466E+38").valueOf(),
  MAX_RANGE: "[-3.402823466E+38,3.402823466E+38]",
  gt(value: number) {
    return { gt: value };
  },
  gte(value: number) {
    return { gte: value };
  },
  lt(value: number) {
    return { lt: value };
  },
  lte(value: number) {
    return { lte: value };
  },
};

export class Interval {
  public left: ReturnType<typeof Float.gt> | ReturnType<typeof Float.gte>;
  public right: ReturnType<typeof Float.lt> | ReturnType<typeof Float.lte>;
  constructor(
    left: ReturnType<typeof Float.gt> | ReturnType<typeof Float.gte>,
    right: ReturnType<typeof Float.lt> | ReturnType<typeof Float.lte>,
  ) {
    this.left = left;
    this.right = right;
    if (
      this.leftValue < Float.MIN_VALUE || this.leftValue > Float.MAX_VALUE ||
      this.rightValue < Float.MIN_VALUE || this.rightValue > Float.MAX_VALUE
    ) {
      throw new Error(
        `Expected value to be float,only in the range ${Float.MAX_RANGE}`,
      );
    }
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

export class FloatField extends Field {
  constructor() {
    super("float");
  }
  protected readonly _attributes: {
    null?: true;
    default?: number;
    unique?: true;
    precision?: number;
    range: Array<Interval>;
  } = {
    null: undefined,
    default: undefined,
    unique: undefined,
    precision: undefined,
    range: [],
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
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.unique) {
      throw new Error(`Expected method to be mutually exclusive with 'unique'`);
    }
    if (value < Float.MIN_VALUE || value > Float.MAX_VALUE) {
      throw new Error(
        `Expected value to be float,only in the range ${Float.MAX_RANGE}`,
      );
    }
    this._attributes.default = value;
    return this;
  }

  /**
   * Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.
   * @param precision Number of significant digits. Must be in the range 1 - 21, inclusive.
   */
  public precision(precision: number): Omit<this, "precision" | OmitType> {
    if (!Number.isInteger(precision) || precision < 1 || precision > 21) {
      throw new Error(`Expected value to be int,and in the range [1 - 21]`);
    }
    this._attributes.precision = precision;
    return this;
  }

  public range(
    left: ReturnType<typeof Float.gt> | ReturnType<typeof Float.gte>,
    right: ReturnType<typeof Float.lt> | ReturnType<typeof Float.lte>,
  ): Omit<this, OmitType> {
    const interval = new Interval(left, right);
    for (const iterator of this._attributes.range) {
      if (
        (interval.leftValue >= iterator.leftValue &&
          interval.leftValue <= iterator.rightValue) || (
            interval.rightValue >= iterator.leftValue &&
            interval.rightValue <= iterator.rightValue
          )
      ) {
        throw new Error(
          `Expect ${interval.toString()} not to cross or connect ${iterator.toString()}`,
        );
      }
    }
    this._attributes.range.push(interval);
    return this;
  }
}

export function float() {
  return new FloatField() as Omit<
    FloatField,
    OmitType
  >;
}
