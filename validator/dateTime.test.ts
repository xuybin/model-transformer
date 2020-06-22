import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { DateTimeField } from "./dateTime.ts";

const { test } = Deno;

test("dateTime_type", () => {
  assertEquals(new DateTimeField().fieldType, "dateTime");
  assertEquals(new DateTimeField().objectType(), "string");
  assertEquals(
    (new DateTimeField().null as DateTimeField).attributes.null,
    true,
  );
  assertEquals(
    (new DateTimeField().default("now()") as DateTimeField).attributes.default,
    "now()",
  );
  assertEquals(
    (new DateTimeField().default("2020-06-22 13:04:50") as DateTimeField)
      .attributes.default,
    new Date("2020-06-22 13:04:50"),
  );
  assertEquals(
    (new DateTimeField().updatedAt as DateTimeField).attributes.updatedAt,
    true,
  );

  assertThrows(
    () => {
      new DateTimeField().null.default("now()");
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
});
