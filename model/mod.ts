import { Field } from "./field.ts";

export * from "./field.ts";

export type Model = {
  index?: string[];
  id?: string[];
  unique?: string[];
} & {
  [name: string]: Field;
};
