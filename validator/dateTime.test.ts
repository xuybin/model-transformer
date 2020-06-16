import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { dateTime } from "./dateTime.ts";

const { test } = Deno;

test("dateTime_type", () => {
  //assertEquals(dateTime().objectType(), "string");
  //assertEquals(dateTime().fieldType, "dateTime");
  assertThrows(
    () => {
      dateTime().default("uuid()");
    },
    Error,
    `Expected to be called with 'default("uuid()")|default("cuid()")' for 'string'`,
  );
  assertThrows(
    () => {
      dateTime().default("2020-03-19T14:21:00+0200");
    },
    Error,
    `Expected to be called with 'default("now()")' for 'dateTime'`,
  );
  assertThrows(
    () => {
      dateTime().default("now()").updatedAt;
    },
    Error,
    "Expected to be called one of them 'updatedAt,default(*)'",
  );
});
