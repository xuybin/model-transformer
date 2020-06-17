import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { schema } from "./schema.ts";
import { model } from "./model.ts";
import { ref } from "./ref.ts";
import { int } from "./validator/int.ts";
import { string } from "./validator/string.ts";
import { dateTime } from "./validator/dateTime.ts";
import { boolean } from "./validator/boolean.ts";

const { test } = Deno;

test("schema_type", () => {
  enum Status {
    Enable,
    Disable,
  }
  const Schema = schema({
    User: model({
      id: string().id.default("cuid()"),
      email: string().unique,
      name: string().null,
      age: int().min(3).default(18).max(130),
      status: ref(Status).default("Enable"),
      createdAt: dateTime().default("now()"),
      updatedAt: dateTime().updatedAt,
      posts: [ref("Post")],
    }).index("name", "email"),
    Post: model({
      id: string().id.default("cuid()"),
      title: string(),
      content: string().null,
      published: boolean().default(false),
      flag: [int().null],
      author: ref("User").relation(["id"]),
    }),
  });

  assertEquals(Schema.User.attributes.index.join(","), "name,email");
  assertEquals(Schema.User.fields.id.attributes.id, true);
  assertEquals(Schema.User.fields.age.attributes.min, 3);
  assertEquals(Schema.User.fields.status.attributes.default, "Enable");
  assertEquals(Schema.Post.fields.title.objectType(), `string`);
  assertEquals(Schema.Post.fields.flag.fieldType, `int[]`);
  assertEquals(Schema.Post.fields.flag.objectType(), `number[]`);
  assertEquals(Schema.Post.fields.flag.attributes.null, true);
  assertEquals(
    Schema.Post.fields.author.attributes.relation?.references.join(","),
    "id",
  );
});
