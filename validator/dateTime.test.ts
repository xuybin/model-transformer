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
      dateTime().default("now()").updatedAt;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
});
