import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { model } from "./model.ts";

import { int } from "./validator/int.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";
import { ref } from "./ref.ts";

const { test } = Deno;

test("model_type", () => {
  enum Status {
    Enable,
    Disable,
  }
  const User = model({
    id: string().id.default("cuid()"),
    userName: string().unique,
    status: ref("Status", Status).default("Enable"),
    email: string().unique,
    name: string().null,
    createdAt: dateTime().default("now()"),
    startTime: dateTime(),
    endTime: dateTime(),
    flag: [int().null],
  }).index("name", "email").constraint("startTime", ">", "endTime");

  assertEquals(User.attributes.index.join(","), "name,email");
  assertEquals(User.fields.id.attributes.id, true);
  assertEquals(User.fields.flag.fieldType, "int[]");
  assertEquals(User.fields.flag.objectType("ts"), "number[]");
  assertEquals(User.fields.status.fieldType, "Status");
  assertEquals(User.fields.status.objectType("ts"), "Status");
  assertEquals(User.fields.status.objectType("go"), "Status");
  assertThrows(
    () => {
      User.unique().index("userName");
    },
    Error,
    "Expected to be called once",
  );
});
