import { Model } from "./model.ts";

export function schema<
  S extends { [name: string]: Pick<Model, "attributes" | "fields"> },
>(
  schema: S,
) {
  return schema as { [K in keyof S]: Pick<S[K], "attributes" | "fields"> };
}
