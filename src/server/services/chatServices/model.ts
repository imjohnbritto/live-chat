import mongoose, { DefaultSchemaOptions } from "mongoose";
import { DBChat, ChatInfo } from "../../types/chat";
import * as yup from "yup";

const Schema = mongoose.Schema;

const chatSchema = new Schema<DBChat>(
  {
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const validationSchema = yup.object({
  username: yup.string().trim().required("Username is required"),
  message: yup.string().trim().nullable(),
  phone: yup.string().trim().required("Phone is required"),
  timestamp: yup.string().required("Timestamp is required").trim(),
  isGroup: yup.boolean().required("isGroup is required"),
  participants: yup
    .array()
    .of(yup.string().required("Participants is required").trim()),
});

export const validateChatInfoObject = (obj: any) => {
  let val, error;
  try {
    val = validationSchema.validateSync(obj, { stripUnknown: true });
  } catch (err: any) {
    error = err.errors;
  }
  return { val, error };
};

type ChatModelType = mongoose.Model<
  DBChat,
  {},
  {},
  {},
  mongoose.Schema<
    DBChat,
    mongoose.Model<DBChat, any, any, any, any>,
    {},
    {},
    {},
    {},
    DefaultSchemaOptions,
    DBChat
  >
>;

export const Chat: ChatModelType =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema, "chats");
