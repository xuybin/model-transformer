import { ObjectField } from "./validator/object.ts";
import { EnumField } from "./validator/enum.ts";
import { OmitType } from "./validator/type.ts";

type ResolveRef<R> = R extends string ? Omit<ObjectField, OmitType>
  : Omit<EnumField, OmitType>;

export function ref<T extends string | object>(value: T): ResolveRef<T> {
  if (typeof value == "string") {
    return new ObjectField(value) as Omit<ObjectField, OmitType> as ResolveRef<
      T
    >;
  } else {
    if (
      Object.keys(value).sort().join(",") !=
        Object.values(value).sort().join(",")
    ) {
      throw new Error(`Expected to be 'enum'`);
    }
    return (new EnumField(
      Object.values(value).filter((x) => typeof x != "number"),
    ) as Omit<EnumField, OmitType>) as ResolveRef<T>;
  }
  // return (typeof value == "string"
  //   ? new ObjectField(value) as Omit<ObjectField, OmitType>
  //   : new EnumField(
  //     Object.values(value).filter((x) => typeof x != "number"),
  //   ) as Omit<EnumField, OmitType>) as ResolveRef<T>;
}
