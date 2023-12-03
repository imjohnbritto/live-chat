import mongoose, { DefaultSchemaOptions } from "mongoose";
import { DBOtherInfo } from "../../types/info";
import * as yup from "yup";

const Schema = mongoose.Schema;

const userSchema = new Schema<DBOtherInfo>(
  {
    note: {
      type: String,
    },
    target: {
      type: String,
    },
  },
  { timestamps: true }
);

const validationSchema = yup.object({
  note: yup.string().nullable().trim(),
  target: yup.string().nullable().trim(),
});

export const validateOtherInfoObject = (obj: any) => {
  let val, error;
  try {
    val = validationSchema.validateSync(obj, { stripUnknown: true });
  } catch (err: any) {
    error = err.errors;
  }
  return { val, error };
};

type OtherInfoModelType = mongoose.Model<
  DBOtherInfo,
  {},
  {},
  {},
  mongoose.Schema<
    DBOtherInfo,
    mongoose.Model<DBOtherInfo, any, any, any, any>,
    {},
    {},
    {},
    {},
    DefaultSchemaOptions,
    DBOtherInfo
  >
>;

export const OtherInfo: OtherInfoModelType =
  mongoose.models.OtherInfo ||
  mongoose.model("OtherInfo", userSchema, "otherInfo");
