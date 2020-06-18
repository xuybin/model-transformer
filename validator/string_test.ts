import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { string } from "./string.ts";

const { test } = Deno;

test("string_type", () => {
  //assertEquals(string().objectType(), "string");
  //assertEquals(string().fieldType, "string");
  assertThrows(
    () => {
      string().id.null;
    },
    Error,
    "Expected method to be mutually exclusive with 'id'",
  );
  assertThrows(
    () => {
      string().id.unique;
    },
    Error,
    "Expected method to be mutually exclusive with 'id'",
  );
});
