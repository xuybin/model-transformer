import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { int } from "./int.ts";

const { test } = Deno;

test("int_type", () => {
  assertEquals(int().objectType, "number");
  assertEquals(int().fieldType, "int");
});
