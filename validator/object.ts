import { Field } from "./type.ts";

export class ObjectField extends Field {
  private readonly _objectName: string;
  constructor(value: string) {
    super("");
    this._objectName = value;
  }
  public get fieldType(): string {
    return this._array ? `${this._objectName}[]` : `${this._objectName}`;
  }

  public objectType(language = "ts"): string {
    return this._array ? `${this._objectName}[]` : `${this._objectName}`;
  }
}
