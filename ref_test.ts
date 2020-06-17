import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { model } from "./model.ts";
import { string } from "./validator/string.ts";
import { ref } from "./ref.ts";

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

  // assertEquals(ref(OrderStatus).fieldType, "enum");
  // assertEquals(ref(OrderStatus).objectType(), "enum");
  // assertEquals(ref("User").fieldType, "User");
  // assertEquals(ref("User").objectType(), "User");
  assertThrows(
    () => {
      ref(User);
    },
    Error,
    "Expected to be 'enum'",
  );
});
