import { Field, OmitType, DateInterval, onceError } from "./type.ts";

export const DateTime = {
  MIN_VALUE: new Date("1000-01-01 00:00:00"),
  MAX_VALUE: new Date("9999-12-31 23:59:59"),
  MAX_RANGE: "[1000-01-01 00:00:00,9999-12-31 23:59:59]",
  gt(value: string) {
    const dateTimeRegex =
      /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if (!dateTimeRegex.test(value) || isNaN(new Date(value).valueOf())) {
      throw new Error(
        `Expected valid date value`,
      );
    }
    const timeValue = new Date(value);
    if (timeValue < this.MIN_VALUE || timeValue > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be dateTime,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { gt: timeValue };
  },

  gte(value: string) {
    const dateTimeRegex =
      /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if (!dateTimeRegex.test(value) || isNaN(new Date(value).valueOf())) {
      throw new Error(
        `Expected valid date value`,
      );
    }
    const timeValue = new Date(value);
    if (timeValue < this.MIN_VALUE || timeValue > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be dateTime,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { gte: timeValue };
  },

  lt(value: string) {
    const dateTimeRegex =
      /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if (!dateTimeRegex.test(value) || isNaN(new Date(value).valueOf())) {
      throw new Error(
        `Expected valid date value`,
      );
    }
    const timeValue = new Date(value);
    if (timeValue < this.MIN_VALUE || timeValue > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be dateTime,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { lt: timeValue };
  },

  lte(value: string) {
    const dateTimeRegex =
      /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    if (!dateTimeRegex.test(value) || isNaN(new Date(value).valueOf())) {
      throw new Error(
        `Expected valid date value`,
      );
    }
    const timeValue = new Date(value);
    if (timeValue < this.MIN_VALUE || timeValue > this.MAX_VALUE) {
      throw new Error(
        `Expected value to be dateTime,only in the range ${this.MAX_RANGE}`,
      );
    }
    return { lte: timeValue };
  },
};

export class DateTimeField extends Field {
  constructor() {
    super("dateTime");
  }

  protected readonly _attributes: {
    null?: true;
    default?: "now()" | Date;
    updatedAt?: true;
    range: Array<DateInterval>;
  } = {
    null: undefined,
    default: undefined,
    updatedAt: undefined,
    range: [],
  };

  public get attributes() {
    return this._attributes;
  }

  public get null(): Omit<this, "null" | "default" | "updatedAt" | OmitType> {
    if (this._attributes.null) {
      throw onceError;
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
    }
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected method to be mutually exclusive with 'updatedAt'`,
      );
    }
    this._attributes.null = true;
    return this;
  }
  private dateTimeRegex =
    /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29) (20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;

  public default(
    value: "now()" | string,
  ): Omit<this, "default" | "null" | "updatedAt" | OmitType> {
    if (this._attributes.default) {
      throw onceError;
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected method to be mutually exclusive with 'updatedAt'`,
      );
    }
    if (
      value != "now()" &&
      (!this.dateTimeRegex.test(value) || isNaN(new Date(value).valueOf()))
    ) {
      throw new Error(
        `Expected valid dateTime value`,
      );
    }
    this._attributes.default = value == "now()" ? "now()" : new Date(value);

    return this;
  }

  public get updatedAt(): Omit<
    this,
    "updatedAt" | "range" | "default" | OmitType
  > {
    if (this._attributes.updatedAt) {
      throw onceError;
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected method to be mutually exclusive with 'default(*)'`,
      );
    }
    if (this._attributes.range.length > 0) {
      throw new Error(
        `Expected method to be mutually exclusive with 'range'`,
      );
    }
    if (this._attributes.null) {
      throw new Error(`Expected method to be mutually exclusive with 'null'`);
    }
    this._attributes.updatedAt = true;
    return this;
  }

  public range(
    left:
      | ReturnType<typeof DateTime.gt>
      | ReturnType<typeof DateTime.gte>
      | "MIN_VALUE",
    right:
      | ReturnType<typeof DateTime.lt>
      | ReturnType<typeof DateTime.lte>
      | "MAX_VALUE",
  ): Omit<this, "updatedAt" | OmitType> {
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected method to be mutually exclusive with 'updatedAt'`,
      );
    }
    const interval = new DateInterval(
      left == "MIN_VALUE"
        ? {
          gte: DateTime.MIN_VALUE,
        }
        : left,
      right == "MAX_VALUE"
        ? {
          lte: DateTime.MAX_VALUE,
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

export function dateTime() {
  return new DateTimeField() as Omit<
    DateTimeField,
    OmitType
  >;
}
