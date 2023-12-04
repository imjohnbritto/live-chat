import { Types } from "mongoose";

export type AuthUser = {
  username: string;
  phone: string;
  isAdmin?: boolean;
  id?: string;
  isActive: boolean;
};

export type DBUser = {
  _id: Types.ObjectId;
  password: string;
} & AuthUser;

export type UserRequestBody = Omit<DBUser, "_id"> & {
  password: string;
};
