import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { int } from "./int.ts";

const { test } = Deno;

test({
  name: "checkType",
  fn: () => {
    assertEquals(int.objectType, "number");
    assertEquals(int.fieldType, "int");
  },
});
