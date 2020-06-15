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
    default?: unknown;
    relation?: {
      name?: string;
      references: string[];
    };
  } = {
    null: undefined,
    id: undefined,
    unique: undefined,
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

  public default(value: unknown): this {
    if (this._attributes.default) {
      throw new Error("Expected to be called once");
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
