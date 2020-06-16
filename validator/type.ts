export const TYPE = {
  string: String.name.toLowerCase(),
  dateTime: String.name.toLowerCase(),
  float: Number.name.toLowerCase(),
  int: Number.name.toLowerCase(),
  json: Object.name.toLowerCase(),
  boolean: Boolean.name.toLowerCase(),
};

export class Field {
  private readonly _attributes: {
    null?: true;
    id?: true;
    unique?: true;
    updatedAt?: true;
    default?: string | number | boolean | "uuid()" | "cuid()" | "now()";
    relation?: {
      name?: string;
      references: string[];
    };
  } = {
    null: undefined,
    id: undefined,
    unique: undefined,
    updatedAt: undefined,
    default: undefined,
    relation: undefined,
  };

  public get attributes() {
    return this._attributes;
  }

  constructor(fieldType: keyof (typeof TYPE)) {
    this.fieldType = fieldType;
  }

  public readonly fieldType: keyof (typeof TYPE);

  public get objectType(): string {
    return TYPE[this.fieldType];
  }

  public get id(): this {
    if (this._attributes.id) {
      throw new Error("Expected to be called once");
    }
    this._attributes.id = true;
    return this;
  }

  public get null(): this {
    if (this._attributes.null) {
      throw new Error("Expected to be called once");
    }
    if (this._attributes.default) {
      throw new Error(`Expected to be called one of them 'null,default(*)'`);
    }
    this._attributes.null = true;
    return this;
  }

  public get unique(): this {
    if (this._attributes.unique) {
      throw new Error("Expected to be called once");
    }
    this._attributes.unique = true;
    return this;
  }

  public get updatedAt(): this {
    if (this._attributes.updatedAt) {
      throw new Error("Expected to be called once");
    }
    if (this.fieldType != "dateTime") {
      throw new Error(`Expected to be called by '${this.fieldType}'`);
    }
    if (this._attributes.default) {
      throw new Error(
        `Expected to be called one of them 'updatedAt,default(*)'`,
      );
    }
    this._attributes.updatedAt = true;
    return this;
  }

  public default(
    value: string | number | boolean | "uuid()" | "cuid()" | "now()",
  ): this {
    if (this._attributes.default) {
      throw new Error("Expected to be called once");
    }
    if (
      (value == "uuid()" || value == "cuid()") && this.fieldType != "string"
    ) {
      throw new Error(
        `Expected to be called with 'default("uuid()")|default("cuid()")' for '${this.fieldType}'`,
      );
    } else if (value == "autoincrement()") {
      throw new Error(
        `Expected to use 'uuid()|cuid()' instead of 'autoincrement()'`,
      );
    } else if (typeof value != this.objectType) {
      throw new Error(
        `Expected to be called with 'default(*:${this.objectType})' for '${this.fieldType}'`,
      );
    }

    if (this.fieldType == "dateTime" && value != "now()") {
      throw new Error(
        `Expected to be called with 'default("now()")' for '${this.fieldType}'`,
      );
    }
    if (this._attributes.null) {
      throw new Error(`Expected to be called one of them 'null,default(*)'`);
    }
    if (this._attributes.updatedAt) {
      throw new Error(
        `Expected to be called one of them 'updatedAt,default(*)'`,
      );
    }
    this._attributes.default = value;
    return this;
  }

  public relation(references: string[], name?: string): this {
    if (this._attributes.relation) {
      throw new Error("Expected to be called once");
    }
    this._attributes.relation = {
      name,
      references,
    };
    return this;
  }
}
