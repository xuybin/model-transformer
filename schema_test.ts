import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { schema } from "./schema.ts";
import { model } from "./model.ts";

import { int } from "./validator/int.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";

const { test } = Deno;

test("schema_type", () => {
  const Schema = schema({
    User: model({
      id: int().id.default("autoincrement()"),
      userName: string().unique,
      email: string().unique,
      name: string().null,
      createdAt: dateTime().default("now()"),
    }).index("name", "email"),
  });

  assertEquals(Schema.User.attributes.index.join(","), "name,email");
  assertEquals(Schema.User.fields.id.attributes.id, true);
});
