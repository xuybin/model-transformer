import { ObjectField } from "./validator/object.ts";
import { EnumField } from "./validator/enum.ts";

type ResolveRef<R> = R extends string
  ? Pick<ObjectField, "fieldType" | "objectType">
  : Pick<EnumField, "fieldType" | "objectType">;

export function ref<T extends string | object>(value: T): ResolveRef<T> {
  return (typeof value == "string"
    ? new ObjectField(value) as Pick<ObjectField, "fieldType" | "objectType">
    : new EnumField(
      Object.values(value).filter((x) => typeof x != "number"),
    ) as Pick<EnumField, "fieldType" | "objectType">) as ResolveRef<T>;
}
