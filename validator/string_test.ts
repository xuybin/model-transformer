import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { string } from "./string.ts";

const { test } = Deno;

test("string_type", () => {
  assertEquals(string().objectType, "string");
  assertEquals(string().fieldType, "string");
});
