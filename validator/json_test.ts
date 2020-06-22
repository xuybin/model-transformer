import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { JsonField } from "./json.ts";

const { test } = Deno;

test("json_type", () => {
  assertEquals(new JsonField().objectType(), "object");
  assertEquals(new JsonField().fieldType, "json");
  assertEquals(
    typeof (new JsonField().default("[]") as JsonField).attributes.default,
    "object",
  );
  assertEquals(
    (new JsonField().default(`[{"name":"中文姓名","age":87}]`) as JsonField)
      .attributes
      .default[0]?.age,
    87,
  );
  assertEquals(
    typeof (new JsonField().default("{}") as JsonField).attributes.default,
    "object",
  );
  assertEquals(
    (new JsonField().default(`{"name":"中文姓名","age":87}`) as JsonField)
      .attributes
      .default?.name,
    "中文姓名",
  );
  assertThrows(
    () => {
      new JsonField().default("abc");
    },
    Error,
    `Expected valid json value`,
  );
});
