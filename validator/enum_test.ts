import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { EnumField } from "./enum.ts";

const { test } = Deno;

test("enum_type", () => {
  assertEquals(
    (new EnumField("Status", ["Enable", "Disable"]).default(
      "Disable",
    ) as EnumField).fieldType,
    "Status",
  );

  assertEquals(
    (new EnumField("Status", ["Enable", "Disable"]).default(
      "Disable",
    ) as EnumField).objectType(),
    "Status",
  );

  assertEquals(
    (new EnumField("Status", ["Enable", "Disable"]).null as EnumField)
      .attributes.null,
    true,
  );

  assertEquals(
    (new EnumField("Status", ["Enable", "Disable"]).default(
      "Disable",
    ) as EnumField).attributes.default,
    "Disable",
  );
  assertEquals(
    new EnumField("Status", ["Enable", "Disable"]).attributes.enumValue.join(
      ",",
    ),
    "Enable,Disable",
  );
  assertThrows(
    () => {
      new EnumField("Status", ["Enable", "Disable"]).default("abc");
    },
    Error,
    "Expected value to be equal one of them 'Enable,Disable'",
  );
});
