import { Types } from "mongoose";

export type OtherInfo = {
  note: string;
  target: string;
  _id?: string;
};

export type DBOtherInfo = {
  _id: Types.ObjectId;
} & OtherInfo;

export type OtherInfoRequestBody = DBOtherInfo;
