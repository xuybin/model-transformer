import { Field, OmitType, onceError, Interval } from "./type.ts";

export const Int = {
  MIN_VALUE: -2147483648,
  MAX_VALUE: 2147483647,
  MAX_RANGE: "[-2147483648,2147483647]",

  gt(value: number) {
    if (value < this.MIN_VALUE || value > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be float,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { gt: value };
  },
  gte(value: number) {
    if (value < this.MIN_VALUE || value > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be float,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { gte: value };
  },
  lt(value: number) {
    if (value < this.MIN_VALUE || value > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be float,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { lt: value };
  },
  lte(value: number) {
    if (value < this.MIN_VALUE || value > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be float,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { lte: value };
  },
};

export class IntField extends Field {
  constructor() {
    super("int");
  }
  protected readonly _attributes: {
    null?: true;
    unique?: true;
    default?: number;
    range: Array<Interval>;
  } = {
    null: undefined,
    unique: undefined,
    default: undefined,
    range: [],
  };

  public get attributes() {
    return this._attributes;
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

  public get unique(): Omit<this, "unique" | "default" | OmitType> {
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
  ): Omit<this, "default" | "null" | "unique" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    if (!Number.isInteger(value)) {
      throw new Error(`Expect value to be a int 'default(${value})'`);
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.unique) {
      throw new Error(`Expected method to be mutually exclusive with 'unique'`);
    }
    if (value < Int.MIN_VALUE || value > Int.MAX_VALUE) {
      throw new Error(
        `Expected value to be int,only in the range ${Int.MAX_RANGE}`,
      );
    }
    this._attributes.default = value;
    return this;
  }

  public range(
    left: ReturnType<typeof Int.gt> | ReturnType<typeof Int.gte> | "MIN_VALUE",
    right: ReturnType<typeof Int.lt> | ReturnType<typeof Int.lte> | "MAX_VALUE",
  ): Omit<this, OmitType> {
    const interval = new Interval(
      left == "MIN_VALUE"
        ? {
          gte: Int.MIN_VALUE,
        }
        : left,
      right == "MAX_VALUE"
        ? {
          lte: Int.MAX_VALUE,
        }
        : right,
    );
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

export function int() {
  return new IntField() as Omit<
    IntField,
    OmitType
  >;
}
