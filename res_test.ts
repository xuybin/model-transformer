import { res } from "./res.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { schema } from "./schema.ts";
import { model } from "./model.ts";
import { ref } from "./ref.ts";
import { int, Int } from "./validator/int.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";
import { boolean } from "./validator/boolean.ts";

const { test } = Deno;

test("res_type", () => {
  enum Status {
    Enable,
    Disable,
  }
  const Schema = schema({
    User: model({
      id: string().id.default("cuid()"),
      email: string().unique,
      name: string().null,
      age: int().range(Int.gt(0), Int.lte(130)).default(18),
      status: ref("Status", Status).default("Enable"),
      createdAt: dateTime().default("now()"),
      updatedAt: dateTime().updatedAt,
      posts: [ref("Post")],
    }).index("name", "email").constraint("updatedAt", ">", "createdAt"),
    Post: model({
      id: string().id.default("cuid()"),
      title: string(),
      content: string().null,
      published: boolean().default(false),
      flag: [int().null],
      author: ref("User").relation(["id"]),
    }),
  });

  assertEquals(
    res(Schema.User, "id", "age").link("posts", Schema.Post, "id", "flag")
      .attributes.map((a) =>
        `${a.link ? ("link(" + a.link.toString() + ") ") : ""}${a.model}(${
          a.fields.join(",")
        })`
      ).join(
        " ",
      ),
    "User(id,age) link(posts) Post(id,flag)",
  );
  assertThrows(
    () => {
      res(Schema.User, "id", "age", "name", "age");
    },
    Error,
    "Expect parameter fields to be unique",
  );
  assertThrows(
    () => {
      res(Schema.User, "id", "age").link(
        "posts",
        Schema.Post,
        "id",
        "flag",
        "title",
        "title",
      );
    },
    Error,
    "Expect parameter fields to be unique",
  );
  assertThrows(
    () => {
      res(Schema.User, "id", "age").link(
        "name",
        Schema.Post,
        "id",
        "flag",
        "title",
      );
    },
    Error,
    "Expect parameter linkField's fieldType to be equal model's name",
  );
});
