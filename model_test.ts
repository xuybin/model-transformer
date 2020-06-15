import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { model } from "./model.ts";

import { int } from "./validator/int.ts";
import { float } from "./validator/float.ts";
import { boolean } from "./validator/boolean.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";
import { json } from "./validator/json.ts";

const { test } = Deno;

test("model_type", () => {
  const User = model({
    id: int.id.default("autoincrement()"),
    email: string.unique,
    name: string.null,
  }).index("name", "email");

  assertEquals(User.attributes.index.join(","), "name,email");
  assertEquals(User.fields.id.attributes.id, true);
});
