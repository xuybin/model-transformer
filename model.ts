import { IntField } from "./validator/int.ts";
import { FloatField } from "./validator/float.ts";
import { BooleanField } from "./validator/boolean.ts";
import { StringField } from "./validator/string.ts";
import { DateTimeField } from "./validator/dateTime.ts";
import { JsonField } from "./validator/json.ts";

type FieldType =
  | Pick<IntField, "attributes">
  | Pick<FloatField, "attributes">
  | Pick<BooleanField, "attributes">
  | Pick<StringField, "attributes">
  | Pick<DateTimeField, "attributes">
  | Pick<JsonField, "attributes">;

type ResolveType<S> = S extends { [name: string]: FieldType } ? keyof S
  : unknown extends S ? unknown
  : never;

export class Model<
  F extends { [name: string]: FieldType } = { [name: string]: FieldType },
> {
  private readonly _attributes: {
    index: Array<ResolveType<F>>;
    id: Array<ResolveType<F>>;
    unique: Array<ResolveType<F>>;
  } = { index: [], id: [], unique: [] };

  public get attributes() {
    return this._attributes;
  }

  public unique(...unique: Array<ResolveType<F>>): this {
    if (this._attributes.unique.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(unique).size != unique.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.id.push(...unique);
    return this;
  }

  public id(...id: Array<ResolveType<F>>): this {
    if (this._attributes.id.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(id).size != id.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.id.push(...id);
    return this;
  }

  public index(...index: Array<ResolveType<F>>): this {
    if (this._attributes.index.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(index).size != index.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.index.push(...index);
    return this;
  }

  private readonly _fields: F;

  public get fields(): F {
    return this._fields;
  }

  constructor(fields: F) {
    this._fields = fields;
  }
}

export function model<F extends { [name: string]: FieldType }>(model: F) {
  return new Model(model);
}
