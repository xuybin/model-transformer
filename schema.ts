import { Model, FieldType, model } from "./model.ts";

export type Schema<F extends { [name: string]: FieldType }> = {
  [name: string]: Pick<Model<F>, "attributes" | "fields">;
};

export function schema<F extends { [name: string]: FieldType }>(
  schema: Schema<F>,
) {
  return schema;
}
