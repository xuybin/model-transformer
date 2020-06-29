
# model-transformer

## Using `model-transformer`

```ts
import { schema, model, ref, int, float, boolean, string, dateTime, json} from 'https://deno.land/x/gh:xuybin:model-transformer/mod.ts';
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

console.log(Object.keys(Schema.User.fields).join(",")) // id,email,name,age,status,createdAt,updatedAt,posts
console.log(Schema.User.fields.age.attributes.range.toString()) // (0,130]
console.log(Schema.Post.fields.flag.objectType()); // number[]

```
