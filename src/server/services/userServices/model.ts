import mongoose, { DefaultSchemaOptions } from "mongoose";
import { DBUser } from "../../types/user";
import * as yup from "yup";

const Schema = mongoose.Schema;

const userSchema = new Schema<DBUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const validationSchema = yup.object({
  username: yup.string().trim().required("Name is required"),
  password: yup.string().trim().required("Password is required"),
  phone: yup.string().trim().required("Mobile number is required"),
  isAdmin: yup.string().nullable().trim(),
  isActive: yup.boolean(),
});

export const validateUserObject = (obj: any) => {
  let val, error;
  try {
    val = validationSchema.validateSync(obj, { stripUnknown: true });
  } catch (err: any) {
    error = err.errors;
  }
  return { val, error };
};

type UserModelType = mongoose.Model<
  DBUser,
  {},
  {},
  {},
  mongoose.Schema<
    DBUser,
    mongoose.Model<DBUser, any, any, any, any>,
    {},
    {},
    {},
    {},
    DefaultSchemaOptions,
    DBUser
  >
>;

export const User: UserModelType =
  mongoose.models.User || mongoose.model("User", userSchema, "users");
User.createIndexes();
