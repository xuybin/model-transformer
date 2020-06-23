import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { StringField, string } from "./string.ts";

const { test } = Deno;

test("string_type", () => {
  assertEquals(new StringField().objectType(), "string");
  assertEquals(new StringField().fieldType, "string");
  assertThrows(
    () => {
      string().id.regexp(/^.*$/).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'id'",
  );
  assertThrows(
    () => {
      string().id.regexp(/^.*$/).unique;
    },
    Error,
    "Expected method to be mutually exclusive with 'id'",
  );
  assertThrows(
    () => {
      string().default("uuid()").regexp(/^.*$/).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
  assertThrows(
    () => {
      string().null.regexp(/^.*$/).default("");
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
});
