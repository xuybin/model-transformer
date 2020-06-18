import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { BooleanField } from "./boolean.ts";

const { test } = Deno;

test("boolean_type", () => {
  assertEquals(new BooleanField().fieldType, "boolean");
  assertEquals(new BooleanField().objectType(), "boolean");

  assertEquals((new BooleanField().null as BooleanField).attributes.null, true);
  assertEquals(
    (new BooleanField().default(false) as BooleanField).attributes.default,
    false,
  );

  assertThrows(
    () => {
      new BooleanField().default(true).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
  assertThrows(
    () => {
      new BooleanField().null.default(false);
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
});
