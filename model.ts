import { Field } from "./validator/type.ts";
import { IntField } from "./validator/int.ts";
import { FloatField } from "./validator/float.ts";
import { BooleanField } from "./validator/boolean.ts";
import { StringField } from "./validator/string.ts";
import { DateTimeField } from "./validator/dateTime.ts";
import { JsonField } from "./validator/json.ts";

type FieldType =
  | Pick<IntField, "attributes" | "fieldType" | "objectType">
  | Pick<FloatField, "attributes" | "fieldType" | "objectType">
  | Pick<BooleanField, "attributes" | "fieldType" | "objectType">
  | Pick<StringField, "attributes" | "fieldType" | "objectType">
  | Pick<DateTimeField, "attributes" | "fieldType" | "objectType">
  | Pick<JsonField, "attributes" | "fieldType" | "objectType">;

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

export function model<
  T extends FieldType,
  F extends { [name: string]: T | Array<T> },
>(
  model: {
    [K in keyof F]: Omit<
      ResolveArray<T, F[K]>,
      "attributes" | "fieldType" | "objectType"
    >;
  },
) {
  for (const fkey in model) {
    const element = model[fkey];
    if (Array.isArray(element)) {
      model[fkey] = (element[0]).array;
    }
  }
  return new Model(
    model as {
      [K in keyof F]: Pick<
        ResolveArray<T, F[K]>,
        "attributes" | "fieldType" | "objectType"
      >;
    },
  );
}

export type ResolveArray<T, F> = F extends Array<T> ? F[0] : T;
