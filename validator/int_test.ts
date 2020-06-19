import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { IntField, Int } from "./int.ts";

const { test } = Deno;

test("int_type", () => {
  assertEquals(new IntField().fieldType, "int");
  assertEquals(new IntField().objectType(), "number");

  assertEquals((new IntField().null as IntField).attributes.null, true);
  assertEquals((new IntField().unique as IntField).attributes.unique, true);
  assertEquals(
    (new IntField().default(12) as IntField).attributes.default,
    12,
  );

  assertEquals(
    (new IntField().range(Int.gt(0), Int.lte(18)).range(
      Int.gte(60),
      Int.lt(130),
    ) as IntField).attributes.range.toString(),
    "(0,18],[60,130)",
  );

  assertThrows(
    () => {
      new IntField().default(-1.23);
    },
    Error,
    `Expect value to be a int 'default(-1.23)'`,
  );
  assertThrows(
    () => {
      new IntField().default(Number.MAX_VALUE);
    },
    Error,
    `Expected value to be int,only in the range ${Int.MAX_RANGE}`,
  );
  assertThrows(
    () => {
      new IntField().default(-Number.MAX_VALUE);
    },
    Error,
    `Expected value to be int,only in the range ${Int.MAX_RANGE}`,
  );
  assertThrows(
    () => {
      new IntField().default(-9).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
  assertThrows(
    () => {
      new IntField().null.default(-88);
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
  assertThrows(
    () => {
      new IntField().unique.default(-88);
    },
    Error,
    "Expected method to be mutually exclusive with 'unique'",
  );
});
