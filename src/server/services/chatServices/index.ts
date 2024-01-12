import { ChatInfo } from "../../types/chat";
import { Chat, validateChatInfoObject } from "./model";

export const saveChat = async (payload: ChatInfo) => {
  const { val, error } = validateChatInfoObject(payload);
  if (error) {
    throw { validation: error };
  }
  try {
    return await new Chat(val).save();
  } catch (e) {
    throw e;
  }
};

export const getChat = async (payload: {
  selectedUser: string;
  loggedInUser: string;
  isGroup: boolean;
}) => {
  if (payload.isGroup) {
    return await Chat.find({
      isGroup: payload.isGroup === true,
    }).sort({ createdAt: 1 });
  } else {
    return await Chat.find({
      participants: { $all: [payload.loggedInUser, payload.selectedUser] },
    }).sort({ createdAt: 1 });
  }
};

export const deleteChat = async (payload: { id: string }) => {
  if (payload.id) {
    return await Chat.findByIdAndDelete({
      _id: payload.id,
    });
  }
};
