type ObjectType = { ts: string };

const TYPE = {
  string: { ts: "string" },
  dateTime: { ts: "string" },
  enum: { ts: "enum" },
  float: { ts: "number" },
  int: { ts: "number" },
  json: { ts: "object" },
  boolean: { ts: "boolean" },
};

export class Field {
  protected readonly _attributes: {
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
  private _array = false;
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

  public get attributes() {
    return this._attributes;
  }

  public get id(): Omit<
    this,
    "id" | "array" | "attributes" | "fieldType" | "objectType"
  > {
    if (this._attributes.id) {
      throw new Error("Expected to be called once");
    }
    this._attributes.id = true;
    return this;
  }

  public get null(): Omit<
    this,
    "null" | "array" | "attributes" | "fieldType" | "objectType"
  > {
    if (this._attributes.null) {
      throw new Error("Expected to be called once");
    }
    if (this._attributes.default) {
      throw new Error(`Expected to be called one of them 'null,default(*)'`);
    }
    this._attributes.null = true;

    return this;
  }

  public get unique(): Omit<
    this,
    "unique" | "array" | "attributes" | "fieldType" | "objectType"
  > {
    if (this._attributes.unique) {
      throw new Error("Expected to be called once");
    }
    this._attributes.unique = true;
    return this;
  }

  public get updatedAt(): Omit<
    this,
    "updatedAt" | "array" | "attributes" | "fieldType" | "objectType"
  > {
    if (this._attributes.updatedAt) {
      throw new Error("Expected to be called once");
    }
    if (this._fieldType != "dateTime") {
      throw new Error(`Expected to be called by 'dateTime'`);
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
  ): Omit<
    this,
    "default" | "array" | "attributes" | "fieldType" | "objectType"
  > {
    if (this._attributes.default) {
      throw new Error("Expected to be called once");
    }
    if (typeof value != this.objectType()) {
      throw new Error(
        `Expected to be called with 'default(*:${this.objectType()})' for '${this._fieldType}'`,
      );
    } else if (
      (value == "uuid()" || value == "cuid()") && this._fieldType != "string"
    ) {
      throw new Error(
        `Expected to be called with 'default("uuid()")|default("cuid()")' for 'string'`,
      );
    } else if (value == "autoincrement()") {
      throw new Error(
        `Expected to use 'uuid()|cuid()' instead of 'autoincrement()'`,
      );
    }

    if (this._fieldType == "dateTime" && value != "now()") {
      throw new Error(
        `Expected to be called with 'default("now()")' for '${this._fieldType}'`,
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

  public relation(
    references: string[],
    name?: string,
  ): Omit<
    this,
    "relation" | "array" | "attributes" | "fieldType" | "objectType"
  > {
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
