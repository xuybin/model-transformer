import { Model } from "./model.ts";
import { validateRef } from "./ref.ts";

export function schema<
  S extends Record<string, Pick<Model, "attributes" | "fields">>,
>(
  schema: S,
) {
  return validateRef(
    schema as { [K in keyof S]: Pick<S[K], "attributes" | "fields"> },
  );
}
