import { IntField } from "./validator/int.ts";
import { FloatField } from "./validator/float.ts";
import { BooleanField } from "./validator/boolean.ts";
import { StringField } from "./validator/string.ts";
import { DateTimeField } from "./validator/dateTime.ts";
import { JsonField } from "./validator/json.ts";

export type Model = {
  index?: string[];
  id?: string[];
  unique?: string[];
} & {
  [name: string]:
    | IntField
    | FloatField
    | BooleanField
    | StringField
    | DateTimeField
    | JsonField;
};

export function model(model: Model) {
  return model;
}
