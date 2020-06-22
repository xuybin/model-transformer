import { OmitType } from "./validator/type.ts";
import { IntField } from "./validator/int.ts";
import { FloatField } from "./validator/float.ts";
import { BooleanField } from "./validator/boolean.ts";
import { StringField } from "./validator/string.ts";
import { DateTimeField } from "./validator/dateTime.ts";
import { JsonField } from "./validator/json.ts";
import { EnumField } from "./validator/enum.ts";
import { ObjectField } from "./validator/object.ts";

export type FieldType =
  | Pick<IntField, "attributes" | "fieldType" | "objectType">
  | Pick<FloatField, "attributes" | "fieldType" | "objectType">
  | Pick<BooleanField, "attributes" | "fieldType" | "objectType">
  | Pick<StringField, "attributes" | "fieldType" | "objectType">
  | Pick<DateTimeField, "attributes" | "fieldType" | "objectType">
  | Pick<JsonField, "attributes" | "fieldType" | "objectType">
  | Pick<EnumField, "attributes" | "fieldType" | "objectType">
  | Pick<ObjectField, "attributes" | "fieldType" | "objectType">;

type ResolveType<S> = S extends { [name: string]: FieldType } ? keyof S
  : unknown extends S ? unknown
  : never;

export class Model<
  M extends {
    [name: string]: Pick<FieldType, "attributes" | "fieldType" | "objectType">;
  } = {
    [name: string]: FieldType;
  },
> {
  private readonly _attributes: {
    index: Array<ResolveType<M>>;
    id: Array<ResolveType<M>>;
    unique: Array<ResolveType<M>>;
    constraint: Array<
      {
        first: ResolveType<M>;
        symbol: ">" | "<" | ">=" | "<=";
        second: ResolveType<M>;
      }
    >;
  } = { index: [], id: [], unique: [], constraint: [] };

  public get attributes() {
    return this._attributes;
  }

  public unique(...unique: Array<ResolveType<M>>): Omit<this, "unique"> {
    if (this._attributes.unique.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(unique).size != unique.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.id.push(...unique);
    return this;
  }

  public id(...id: Array<ResolveType<M>>): Omit<this, "id"> {
    if (this._attributes.id.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(id).size != id.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.id.push(...id);
    return this;
  }

  public index(...index: Array<ResolveType<M>>): Omit<this, "index"> {
    if (this._attributes.index.length > 0) {
      throw new Error("Expected to be called once");
    }
    if (new Set(index).size != index.length) {
      throw new Error("Expect value to not be repeated");
    }
    this._attributes.index.push(...index);
    return this;
  }

  public constraint(
    fieldName1: ResolveType<M>,
    symbol: ">" | ">=",
    fieldName2: ResolveType<M>,
  ): this {
    if (fieldName1 == fieldName2) {
      throw new Error("Expect the two fieldNames to be different");
    }
    for (const iterator of this._attributes.constraint) {
      if (
        `${iterator.first}_${iterator.symbol}_${iterator.second}` ==
          `${fieldName1}_${symbol}_${fieldName2}`
      ) {
        throw new Error("Expect constraint to be different");
      }
    }
    this._attributes.constraint.push(
      { first: fieldName1, symbol, second: fieldName2 },
    );
    return this;
  }

  private readonly _fields: M;

  public get fields(): {
    [K in keyof M]: Pick<M[K], "attributes" | "fieldType" | "objectType">;
  } {
    return this._fields;
  }

  constructor(fields: M) {
    this._fields = fields;
  }
}

export function model<
  M extends { [name: string]: FieldType },
>(
  model: { [K in keyof M]: Pick<M[K], never> | Array<Pick<M[K], never>> },
) {
  for (const fkey in model) {
    const element = model[fkey];
    if (Array.isArray(element)) {
      model[fkey] = (element[0]).array;
    }
  }
  return new Model(model as { [K in keyof M]: M[K] });
}
export type ResolveArray<F, T extends FieldType = FieldType> = F extends
  Array<T> ? T : F;
