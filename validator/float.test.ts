import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { Float, FloatField } from "./float.ts";

const { test } = Deno;

test("float_type", () => {
  assertEquals(new FloatField().fieldType, "float");
  assertEquals(new FloatField().objectType(), "number");

  assertEquals((new FloatField().null as FloatField).attributes.null, true);
  assertEquals((new FloatField().unique as FloatField).attributes.unique, true);
  assertEquals(
    (new FloatField().default(1.2) as FloatField).attributes.default,
    1.2,
  );
  assertEquals(
    (new FloatField().precision(2) as FloatField).attributes.precision,
    2,
  );

  assertEquals(
    (new FloatField().range(Float.gt(0), Float.lte(18)).range(
      Float.gte(60),
      Float.lt(130),
    ) as FloatField).attributes.range.toString(),
    "(0,18],[60,130)",
  );

  assertThrows(
    () => {
      new FloatField().default(Number.MAX_VALUE);
    },
    Error,
    "Expected value to be float,only in the range [-3.402823466E+38,3.402823466E+38]",
  );
  assertThrows(
    () => {
      new FloatField().default(-Number.MAX_VALUE);
    },
    Error,
    "Expected value to be float,only in the range [-3.402823466E+38,3.402823466E+38]",
  );
  assertThrows(
    () => {
      new FloatField().default(-0.9).null;
    },
    Error,
    "Expected method to be mutually exclusive with 'default(*)'",
  );
  assertThrows(
    () => {
      new FloatField().null.default(-0.88);
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
  assertThrows(
    () => {
      new FloatField().unique.default(-0.88);
    },
    Error,
    "Expected method to be mutually exclusive with 'unique'",
  );
  assertThrows(
    () => {
      new FloatField().precision(-0.88);
    },
    Error,
    "Expected value to be int,and in the range [1 - 21]",
  );
  assertThrows(
    () => {
      new FloatField().precision(22);
    },
    Error,
    "Expected value to be int,and in the range [1 - 21]",
  );
});
