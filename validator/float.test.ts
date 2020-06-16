import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { float } from "./float.ts";

const { test } = Deno;

test("float_type", () => {
  assertEquals(float().objectType(), "number");
  assertEquals(float().fieldType, "float");
});
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

type a = typeof Days;
