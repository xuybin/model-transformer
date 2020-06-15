import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { json } from "./json.ts";

const { test } = Deno;

test("json_type", () => {
  assertEquals(json.objectType, "object");
  assertEquals(json.fieldType, "json");
});
