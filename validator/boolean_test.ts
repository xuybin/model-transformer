import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { boolean } from "./boolean.ts";

const { test } = Deno;

test("boolean_type", () => {
  assertEquals(boolean().objectType, "boolean");
  assertEquals(boolean().fieldType, "boolean");
});
