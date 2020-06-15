export const TYPE = {
  string: String.name.toLowerCase(),
  dateTime: String.name.toLowerCase(),
  float: Number.name.toLowerCase(),
  int: Number.name.toLowerCase(),
  json: Object.name.toLowerCase(),
  boolean: Boolean.name.toLowerCase(),
};

export class Field {
  private _null?: true;
  private _id?: true;
  private _unique?: true;
  private _default?: unknown;
  private _relation?: {
    name?: string;
    references: string[];
  };

  constructor(fieldType: keyof (typeof TYPE)) {
    this.fieldType = fieldType;
  }

  public readonly fieldType: keyof (typeof TYPE);

  public get objectType(): string {
    return TYPE[this.fieldType];
  }

  public get id(): this {
    this._id = true;
    return this;
  }

  public get null(): this {
    this._null = true;
    return this;
  }

  public get unique(): this {
    this._unique = true;
    return this;
  }

  public default(value: unknown): this {
    this._default = value;
    return this;
  }

  public relation(references: string[], name?: string): this {
    this._relation = {
      name,
      references,
    };
    return this;
  }
}

export type Model = {
  index?: string[];
  id?: string[];
  unique?: string[];
} & {
  [name: string]: Field;
};

export type Schema = {
  [name: string]: Model;
};

// const UserSchema = {
//   userName: {
//     unique:true,
//     validator: (params: Typeof["string"][]) => {
//       return params[0];
//     },
//   },
//   name:{
//     first:(params: Typeof["string"][]) => {
//       return params[0];
//     },
//     last:(params: Typeof["string"][]) => {
//       return params[0];
//     },
//   },
//   age: {
//     validator: (params: Typeof["int"][]) => {
//       return params[0];
//     },
//   },
//   disable:{
//     validator: (params: Typeof["boolean"][]) => {
//       return params[0];
//     },
//   }
// };
// for (const key in UserSchema) {
//   console.log(`UserSchema.${key}`)
// }