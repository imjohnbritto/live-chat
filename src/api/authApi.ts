import { AuthUser, UserRequestBody } from "server/types/user";
import axios from "./axios";
import { ServerResponse } from "./types";
import { ChatInfo } from "@server/types/chat";
import { OtherInfo } from "@server/types/info";

export const loginUser = (phone: string, password: string) => {
  return axios<ServerResponse<AuthUser>>({
    url: "/api/login",
    method: "POST",
    data: {
      phone,
      password,
    },
  });
};

export const logoutUser = () => {
  return axios({ url: "/api/auth/logout", method: "POST" });
};

export const getUsers = () => {
  return axios<ServerResponse<AuthUser[]>>({
    url: "/api/users",
    method: "GET",
  });
};

export const getOtherInfo = () => {
  return axios<ServerResponse<OtherInfo>>({
    url: "/api/otherInfo",
    method: "GET",
  });
};

export const setOtherInfo = (otherInfo: OtherInfo) => {
  return axios<ServerResponse<OtherInfo>>({
    url: "/api/otherInfo",
    method: "POST",
    data: otherInfo,
  });
};

export const registerUser = (user: UserRequestBody) => {
  return axios<ServerResponse<AuthUser>>({
    url: "/api/register",
    method: "POST",
    data: user,
  });
};

export const getChats = (payload: {
  selectedUser: string;
  loggedInUser: string;
  isGroup: boolean;
}) => {
  return axios<ServerResponse<ChatInfo[]>>({
    url: "/api/chats",
    method: "POST",
    data: payload,
  });
};

export const resetPassword = (username: string, passwd: string) => {
  return axios<ServerResponse<{}>>({
    url: "/api/auth/resetPassword",
    method: "POST",
    data: {
      username: username,
      password: passwd,
    },
  });
};

export const changePassword = (oldPassword: string, password: string) => {
  return axios<ServerResponse<{}>>({
    url: "/api/auth/changePassword",
    method: "POST",
    data: {
      password,
      oldPassword,
    },
  });
};
