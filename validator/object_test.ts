import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { ObjectField } from "./object.ts";

const { test } = Deno;

test("object_type", () => {
  assertEquals(new ObjectField("User").objectType(), "User");
  assertEquals(new ObjectField("User").array.objectType(), "User[]");
  assertEquals(new ObjectField("User").fieldType, "User");
  assertEquals(new ObjectField("User").array.fieldType, "User[]");
  assertEquals(
    (new ObjectField("User").null as ObjectField).attributes.null,
    true,
  );
  assertEquals(
    (new ObjectField("User").relation(["id"]) as ObjectField).attributes
      .relation?.references[0],
    "id",
  );
  assertEquals(
    (new ObjectField("User").relation(["id"], "user") as ObjectField)
      .attributes.relation?.name,
    "user",
  );
});
