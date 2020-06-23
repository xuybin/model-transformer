import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";
import { Type } from "./type.ts";
import { StringField, string } from "./validator/string.ts";

const { test } = Deno;

test("type", () => {
  assertEquals(
    (string().regexp(Type.idCard).default("11010119900101581X") as StringField)
      .attributes.default,
    "11010119900101581X",
  );
  assertThrows(
    () => {
      string().regexp(Type.idCard).default("11010119900101581x");
    },
    Error,
    `Expected to pass regular(${Type.idCard}) check's string value`,
  );

  assertEquals(
    (string().regexp(Type.addressCode).default("520115000000") as StringField)
      .attributes.default,
    "520115000000",
  );
  assertThrows(
    () => {
      string().regexp(Type.addressCode).default("5201150000001");
    },
    Error,
    `Expected to pass regular(${Type.addressCode}) check's string value`,
  );

  assertEquals(
    (string().regexp(Type.uniformSocialCreditCode).default(
      "1210000040077753X1",
    ) as StringField)
      .attributes.default,
    "1210000040077753X1",
  );
  assertThrows(
    () => {
      string().regexp(Type.uniformSocialCreditCode).default(
        "1210000040077753x1",
      );
    },
    Error,
    `Expected to pass regular(${Type.uniformSocialCreditCode}) check's string value`,
  );

  assertEquals(
    (string().regexp(Type.email).default("admin@qq.com") as StringField)
      .attributes.default,
    "admin@qq.com",
  );
  assertThrows(
    () => {
      string().regexp(Type.email).default("adminqq");
    },
    Error,
    `Expected to pass regular(${Type.email}) check's string value`,
  );
  assertEquals(
    (string().regexp(Type.url).default("https://www.baidu.com") as StringField)
      .attributes.default,
    "https://www.baidu.com",
  );
  assertEquals(
    (string().regexp(Type.url).default(
      "http://www.baidu.com/123",
    ) as StringField)
      .attributes.default,
    "http://www.baidu.com/123",
  );
  assertEquals(
    (string().regexp(Type.url).default("www.baidu.com") as StringField)
      .attributes.default,
    "www.baidu.com",
  );
  assertThrows(
    () => {
      string().regexp(Type.url).default("pic.baidu.com");
    },
    Error,
    `Expected to pass regular(${Type.url}) check's string value`,
  );

  assertEquals(
    (string().regexp(Type.ipAddress).default("192.168.0.1") as StringField)
      .attributes.default,
    "192.168.0.1",
  );
  assertThrows(
    () => {
      string().regexp(Type.ipAddress).default("192.168.256.1");
    },
    Error,
    `Expected to pass regular(${Type.ipAddress}) check's string value`,
  );

  assertEquals(
    (string().regexp(Type.mobileNo).default("13800000000") as StringField)
      .attributes.default,
    "13800000000",
  );
  assertThrows(
    () => {
      string().regexp(Type.mobileNo).default("138000000001");
    },
    Error,
    `Expected to pass regular(${Type.mobileNo}) check's string value`,
  );
  assertEquals(
    (string().regexp(Type.telephoneNo).default("0857-88084888") as StringField)
      .attributes.default,
    "0857-88084888",
  );
  assertEquals(
    (string().regexp(Type.telephoneNo).default(
      "0857-88084888-011",
    ) as StringField)
      .attributes.default,
    "0857-88084888-011",
  );
  assertThrows(
    () => {
      string().regexp(Type.telephoneNo).default("138000000001");
    },
    Error,
    `Expected to pass regular(${Type.telephoneNo}) check's string value`,
  );
});
