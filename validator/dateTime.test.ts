import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { DateTimeField, DateTime } from "./dateTime.ts";

const { test } = Deno;

test("dateTime_type", () => {
  assertEquals(new DateTimeField().fieldType, "dateTime");
  assertEquals(new DateTimeField().objectType(), "string");
  assertEquals(
    (new DateTimeField().null as DateTimeField).attributes.null,
    true,
  );
  assertEquals(
    (new DateTimeField().default("now()") as DateTimeField).attributes.default,
    "now()",
  );
  assertEquals(
    (new DateTimeField().default("2020-06-22 13:04:50") as DateTimeField)
      .attributes.default,
    new Date("2020-06-22 13:04:50"),
  );
  assertEquals(
    (new DateTimeField().updatedAt as DateTimeField).attributes.updatedAt,
    true,
  );

  assertEquals(
    (new DateTimeField().range(
      DateTime.gte("2020-01-01 00:00:00"),
      "MAX_VALUE",
    ) as DateTimeField).attributes.range.toString(),
    "[2020-01-01 00:00:00,9999-12-31 23:59:59]",
  );
  assertEquals(
    (new DateTimeField().range(
      "MIN_VALUE",
      DateTime.lte("2020-01-01 00:00:00"),
    ) as DateTimeField).attributes.range.toString(),
    "[1000-01-01 00:00:00,2020-01-01 00:00:00]",
  );
  assertEquals(
    (new DateTimeField().range(
      DateTime.gt("1900-01-01 00:00:00"),
      DateTime.lte("1999-12-31 23:59:59"),
    ).range(
      DateTime.gte("2020-01-01 00:00:00"),
      DateTime.lt("2099-12-31 23:59:59"),
    ) as DateTimeField).attributes.range.toString(),
    "(1900-01-01 00:00:00,1999-12-31 23:59:59],[2020-01-01 00:00:00,2099-12-31 23:59:59)",
  );

  assertThrows(
    () => {
      new DateTimeField().null.range(
        DateTime.gt("2020-01-01 00:00:00"),
        "MAX_VALUE",
      ).default("now()");
    },
    Error,
    "Expected method to be mutually exclusive with 'null'",
  );
});
