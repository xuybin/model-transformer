/**
 * 1.选定条件列和条件值(固定值或来源于用户身份信息，关联租户),组成资源
 * 2.资源划分等原则，由 后端身份属性确定的，凡是由前端直接传递的值，都不应该作为资源划分的刻度标准
 * 3.资源可发布成各种动作和参数的接口，参数名称可自定义，但所有参数都需与后台一一对应（如有计算都都放到前端完成，后端只解决安全管控和存储细节屏蔽）
 * 4.资源可以跨多表，但表与表之间必须有关系，且指定 主表（只有主表但字段能发布为查询字段），主表还影响展现形式，1:n层次展示或 n:1 的平铺展示
 * 5.先确定行，再确定列（只保持引用，不具有别名，但发布为接口的时候再定义别名）
 * const res1 = res(Schema,{
 *   model('key').field('key')
 * })
 */

import { Model, FieldType } from "./model.ts";
import { ObjectField } from "./validator/object.ts";

export class Res<M extends Pick<Model, "attributes" | "fields">> {
  public readonly attributes: Array<
    { model: string; fields: string[]; link?: string }
  > = [];
  private readonly _model: M;
  constructor(
    model: M,
    fields: Array<keyof M["fields"]>,
    link?: string,
    attributes?: Array<{ model: string; fields: string[] }>,
  ) {
    if (fields.length != new Set(fields).size) {
      throw new Error(`Expect parameter fields to be unique`);
    }
    this._model = model;
    this.attributes.push(...attributes ?? []);
    this.attributes.push({
      link,
      model: model.attributes.modelName,
      fields: fields as Array<string>,
    });
  }

  public link<M2 extends Pick<Model, "attributes" | "fields">>(
    linkField: keyof M["fields"],
    model: M2,
    ...fields: Array<keyof M2["fields"]>
  ) {
    if (
      this._model.fields[`${linkField}`].fieldType.replace("[]", "") !=
        model.attributes.modelName
    ) {
      throw new Error(
        `Expect parameter linkField's fieldType to be equal model's name`,
      );
    }
    if (fields.length != new Set(fields).size) {
      throw new Error(`Expect parameter fields to be unique`);
    }
    return new Res(model, fields, linkField as string, this.attributes);
  }
}

export function res<M extends Pick<Model, "attributes" | "fields">>(
  model: M,
  ...fields: Array<keyof M["fields"]>
) {
  return new Res(model, fields);
}
