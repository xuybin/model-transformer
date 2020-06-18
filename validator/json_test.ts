import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { JsonField } from "./json.ts";

const { test } = Deno;

test("json_type", () => {
  assertEquals(new JsonField().objectType(), "object");
  assertEquals(new JsonField().fieldType, "json");
});
