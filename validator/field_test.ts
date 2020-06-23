import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { Field } from "./field.ts";

const { test } = Deno;

test("field_type", () => {
  assertEquals(new Field("string").objectType(), "string");
  assertEquals(new Field("string").fieldType, "string");
  assertEquals(new Field("dateTime").fieldType, "dateTime");
  assertEquals(new Field("dateTime").objectType(), "string");
  assertEquals(new Field("float").fieldType, "float");
  assertEquals(new Field("float").objectType(), "number");
  assertEquals(new Field("int").fieldType, "int");
  assertEquals(new Field("int").objectType(), "number");
  assertEquals(new Field("json").fieldType, "json");
  assertEquals(new Field("json").objectType(), "any");
  assertEquals(new Field("boolean").fieldType, "boolean");
  assertEquals(new Field("boolean").objectType(), "boolean");
});
