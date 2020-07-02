import { Field, OmitType, onceError } from "./field.ts";

export class ObjectField extends Field {
  private _name: string;
  protected readonly _attributes: {
    null?: true;
    relation?: {
      name?: string;
      references: string[];
      fields?: string[];
    };
  } = {
    relation: undefined,
  };

  constructor(name: string) {
    super("");
    if (!/^[A-Za-z]{1,}[A-Za-z0-9_]*$/.test(name)) {
      throw new Error(`Expected name start with a letter`);
    }
    this._name = name;
  }

  public get attributes() {
    return this._attributes;
  }

  public get fieldType(): string {
    return this._array ? `${this._name}[]` : `${this._name}`;
  }

  public objectType(language = "ts"): string {
    return this._array ? `${this._name}[]` : `${this._name}`;
  }

  public get null(): Omit<this, "null" | OmitType> {
    if (this._attributes.null) {
      throw onceError;
    }
    this._attributes.null = true;
    return this;
  }

  public relation(
    references: string[],
    name?: string,
    fields?: string[],
  ): Omit<this, "relation" | OmitType> {
    if (this._attributes.relation) {
      throw onceError;
    }
    this._attributes.relation = {
      name,
      references,
      fields,
    };
    return this;
  }
}
