import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { model } from "./model.ts";
import { string } from "./validator/string.ts";
import { ref } from "./ref.ts";
import { EnumField } from "./validator/enum.ts";
import { ObjectField } from "./validator/object.ts";

const { test } = Deno;

test("enum_type", () => {
  enum OrderStatus {
    Start = 2,
    Unpaid,
    Shipping,
    Shipped,
    Complete,
  }

  const User = model({
    id: string().id.default("cuid()"),
    userName: string().unique,
    email: string().unique,
    name: string().null,
  }).index("name", "email");

  assertEquals(
    (ref("OrderStatus", OrderStatus).default("Start") as EnumField)
      .objectType(),
    "OrderStatus",
  );
  assertEquals(
    (ref("OrderStatus", OrderStatus).default("Start") as EnumField).fieldType,
    "OrderStatus",
  );
  assertEquals(
    (ref("OrderStatus", OrderStatus).default("Start") as EnumField).array
      .objectType(),
    "OrderStatus[]",
  );

  assertEquals(
    (ref("User").null as ObjectField)
      .objectType(),
    "User",
  );
  assertEquals(
    (ref("User").null as ObjectField).fieldType,
    "User",
  );
  assertEquals(
    (ref("User") as ObjectField).array
      .objectType(),
    "User[]",
  );
});
