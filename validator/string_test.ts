import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { StringField, string } from "./string.ts";

const { test } = Deno;

test("string_type", () => {
  assertEquals(new StringField().objectType(), "string");
  assertEquals(new StringField().fieldType, "string");
  assertEquals(
    (string().id as StringField).attributes.id,
    true,
  );
  assertEquals(
    (string().null as StringField).attributes.null,
    true,
  );
  assertEquals(
    (string().unique as StringField).attributes.unique,
    true,
  );
  assertEquals(
    (string().default("abc") as StringField).attributes.default,
    "abc",
  );
  assertEquals(
    (string().regexp(/^[a-z0-9]{2,10}$/) as StringField).attributes.regexp[0],
    /^[a-z0-9]{2,10}$/,
  );
  assertEquals(
    (string().regexp(/^[a-z0-9]{2,10}$/).default("a12") as StringField)
      .attributes.default,
    "a12",
  );
  assertThrows(
    () => {
      string().regexp(/^[a-z0-9]{3,10}$/).default("a1");
    },
    Error,
    "Expected to pass regular(/^[a-z0-9]{3,10}$/) check's string value",
  );
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
