import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { int } from "./int.ts";

const { test } = Deno;

test("int_type", () => {
  assertThrows(
    () => {
      int().default(123).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
});
