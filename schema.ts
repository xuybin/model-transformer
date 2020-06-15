import { Model } from "./model.ts";

export type Schema = {
  [name: string]: Model;
};

export function schema(schema: Schema) {
  return schema;
}
