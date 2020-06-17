import { Field, OmitType } from "./type.ts";

export class ObjectField extends Field {
  protected readonly objectAttributes: {
    objectName: string;
    relation?: {
      name?: string;
      references: string[];
    };
  } = {
    objectName: "",
    relation: undefined,
  };

  constructor(value: string) {
    super("");
    this.objectAttributes.objectName = value;
  }
  public get fieldType(): string {
    return this._array
      ? `${this.objectAttributes.objectName}[]`
      : `${this.objectAttributes.objectName}`;
  }

  public objectType(language = "ts"): string {
    return this._array
      ? `${this.objectAttributes.objectName}[]`
      : `${this.objectAttributes.objectName}`;
  }

  public relation(
    references: string[],
    name?: string,
  ): Omit<this, "relation" | OmitType> {
    if (this.objectAttributes.relation) {
      throw new Error("Expected to be called once");
    }
    this.objectAttributes.relation = {
      name,
      references,
    };
    return this;
  }

  public get attributes() {
    return {
      ...this._attributes,
      ...this.objectAttributes,
    };
  }
}
