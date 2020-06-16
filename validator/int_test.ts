import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { int } from "./int.ts";

const { test } = Deno;

test("int_type", () => {
  assertEquals(int().objectType(), "number");
  assertEquals(int().fieldType, "int");
  assertThrows(
    () => {
      int().default("abc");
    },
    Error,
    "Expected to be called with 'default(*:number)",
  );
  assertThrows(
    () => {
      int().default(123).null;
    },
    Error,
    "Expected to be called one of them 'null,default(*)'",
  );
  assertThrows(
    () => {
      int().id.id;
    },
    Error,
    "Expected to be called once",
  );
  assertThrows(
    () => {
      int().updatedAt;
    },
    Error,
    "Expected to be called by 'dateTime'",
  );
});
