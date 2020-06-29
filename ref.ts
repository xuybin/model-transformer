import { ObjectField } from "./validator/object.ts";
import { EnumField } from "./validator/enum.ts";
import { OmitType } from "./validator/field.ts";

type ResolveRef<R> = R extends string ? Omit<ObjectField, OmitType>
  : Omit<EnumField, OmitType>;

export function ref<T extends object | string = string>(
  name: string,
  value?: T,
): ResolveRef<T> {
  if (value == undefined) {
    return new ObjectField(name) as Omit<ObjectField, OmitType> as ResolveRef<
      T
    >;
  } else {
    if (
      Object.keys(value).sort().join(",") !=
        Object.values(value).sort().join(",")
    ) {
      throw new Error(`Expected value to be 'enum ${name}'`);
    }
    return (new EnumField(
      name,
      Object.values(value).filter((x) => typeof x != "number"),
    ) as Omit<EnumField, OmitType>) as ResolveRef<T>;
  }
}

export function validateRef<S>(schema: S) {
  const modelNames = Object.keys(schema);
  for (const key in schema) {
    if ((schema[key] as any).hasOwnProperty("_fields")) {
      const fields = (schema[key] as any)["_fields"];
      for (const fk in fields) {
        const field = fields[fk];
        if (
          field instanceof ObjectField &&
          !modelNames.includes(field.fieldType.replace("[]", ""))
        ) {
          throw new Error(
            `${key}.${fk}'s ref("${
              field.fieldType.replace("[]", "")
            }") not exist in schema`,
          );
        }
      }
    }
  }
  return schema;
}
