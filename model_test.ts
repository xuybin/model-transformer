import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { model, ResolveType } from "./model.ts";

import { int } from "./validator/int.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";

const { test } = Deno;

test("model_type", () => {
  const User = model({
    id: int().id.default("autoincrement()"),
    userName: string().unique,
    email: string().unique,
    name: string().null,
    createdAt: dateTime().default("now()"),
  }).index("name", "email");

  assertEquals(User.attributes.index.join(","), "name,email");
  assertEquals(User.fields.id.attributes.id, true);
  assertThrows(
    () => {
      User.index("userName");
    },
    Error,
    "Expected to be called once",
  );
});
