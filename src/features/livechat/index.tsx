import {
  Box,
  Avatar,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
  Snackbar,
  TextareaAutosize,
} from "@mui/material";
import {
  ChatContainer,
  Header,
  LeftSidePanel,
  TextBoxWrapper,
  OthersBubble,
  MeBubble,
  modalStyle,
  UsersLi,
} from "./styles";
import { COLORS } from "@utils/theme";
import { useEffect, useRef, useState } from "react";
import { TextBox } from "@components/Common";
import { MdSend, MdGroup, MdCancel, MdAdd } from "react-icons/md";
import { ChatInfo, DBChat } from "@server/types/chat";
import { clearUserData, getInitials } from "@utils/helper";
import useLoggedInUser from "@utils/useLoggedInUser";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import Grid from "@components/Grid";
import Button from "@components/Button";
import { authApi } from "api";
import { AuthUser } from "@server/types/user";
import io, { Socket } from "socket.io-client";
import CustomAlert from "./CustomAlert";
import { Button as MuiButton, Divider } from "@mui/material";
import Router from "next/router";
import useLongPress from "@utils/useLongPress";
dayjs.extend(RelativeTime);

const ChatTypingArea = ({ sendChat }: { sendChat: (chat: string) => void }) => {
  const [currentChat, setCurrentChat] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      style={{
        position: isMobile ? "absolute" : "initial",
        bottom: "0px",
        left: "13px",
        width: "92%",
      }}
    >
      <TextBoxWrapper alignItems="center">
        <TextBox
          id="chat-area"
          aria-label="chat area"
          type="text"
          onChange={({ target: { value } }) => setCurrentChat(value)}
          value={currentChat}
          style={{
            borderColor: "grey",
            width: "100%",
            fontSize: isMobile ? "18px" : "24px",
            marginRight: "5px",
          }}
          onKeyDown={({ code }) => {
            code === "Enter" && sendChat(currentChat);
            code === "Enter" && setCurrentChat("");
          }}
          placeholder="Message..."
        />
        <Grid
          style={{
            padding: "8px",
            borderRadius: "50%",
            backgroundColor: COLORS.LIGHT_GREY,
            cursor: "pointer",
          }}
          alignItems="center"
          justifyContents="center"
          onClick={() => {
            sendChat(currentChat);
            setCurrentChat("");
          }}
        >
          <MdSend
            size={24}
            style={{
              color: COLORS.SUCCESS,
            }}
          />
        </Grid>
      </TextBoxWrapper>
    </Box>
  );
};

const ChatView = ({
  chatList,
  getChatsList,
  payload,
}: {
  chatList: ChatInfo[];
  getChatsList: (payload: {
    selectedUser: string;
    loggedInUser: string;
    isGroup: boolean;
  }) => void;
  payload: {
    selectedUser: string;
    loggedInUser: string;
    isGroup: boolean;
  };
}) => {
  const userData = useLoggedInUser();
  const userChatViewRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteId, setDeleteId] = useState("");

  const onLongPress = (e: MouseEvent) => {
    const chatId = (e.target as HTMLDivElement)?.id;
    setDeleteId(chatId);
  };

  const onClick = () => {
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  useEffect(() => {
    (userChatViewRef.current as HTMLDivElement).scrollTo({
      behavior: "smooth", //test
      top: userChatViewRef.current?.scrollHeight,
    });
  }, [chatList]);

  const chatDelete = async () => {
    setDeleteId("");
    await authApi.deleteChat(deleteId);
    getChatsList(payload);
  };
  return (
    <Box
      style={{
        height: isMobile ? "initial" : "70vh",
        overflowY: "auto",
      }}
      ref={userChatViewRef}
    >
      {chatList.map((chat, index) => {
        if (
          chat.message !== "" &&
          chat.message !== null &&
          chat.phone === userData?.phone
        ) {
          return (
            <Box
              display={"flex"}
              alignItems={"end"}
              key={index}
              paddingRight={isMobile ? "4px" : "18px"}
              paddingBottom={"18px"}
              flexDirection={"column"}
            >
              <Box display={"flex"} justifyContent={"end"}>
                <MeBubble
                  ismobile={isMobile}
                  color={COLORS.BLACK}
                  style={{ padding: isMobile ? "0px 8px" : "10px" }}
                  id={(chat as DBChat)._id}
                  {...(longPressEvent as any)}
                >
                  {chat.message}
                </MeBubble>
                <Avatar
                  alt={userData?.username}
                  style={{
                    width: isMobile ? "24px" : "40px",
                    height: isMobile ? "24px" : "40px",
                  }}
                >
                  <Typography fontSize={isMobile ? "10px" : "16px"}>
                    {userData && getInitials(userData.username as string)}
                  </Typography>
                </Avatar>
              </Box>
              <Box display={"flex"} paddingRight={isMobile ? "26px" : "58px"}>
                <Typography fontSize={12} color={COLORS.GREY}>
                  {dayjs(chat.timestamp).fromNow(true)}
                </Typography>
              </Box>
            </Box>
          );
        } else if (chat.message !== "" && chat.message !== null) {
          return (
            <Box
              display={"flex"}
              key={index}
              paddingLeft={isMobile ? "4px" : "18px"}
              paddingBottom={"18px"}
              flexDirection={"column"}
            >
              <Box display={"flex"}>
                <Avatar
                  alt={chat.username}
                  style={{
                    width: isMobile ? "24px" : "40px",
                    height: isMobile ? "24px" : "40px",
                  }}
                >
                  <Typography fontSize={isMobile ? "10px" : "16px"}>
                    {userData && getInitials(chat.username as string)}
                  </Typography>
                </Avatar>
                <OthersBubble
                  ismobile={isMobile}
                  color={COLORS.WHITE}
                  style={{ padding: isMobile ? "0px 8px" : "10px" }}
                  id={(chat as DBChat)._id}
                  {...(longPressEvent as any)}
                >
                  {chat.message}
                </OthersBubble>
              </Box>
              <Box display={"flex"} paddingLeft={isMobile ? "26px" : "58px"}>
                <Typography color={COLORS.GREY} fontSize={12}>
                  {dayjs(chat.timestamp).fromNow(true)}
                </Typography>
              </Box>
            </Box>
          );
        }
      })}

      <Modal
        open={deleteId !== ""}
        onClose={() => setDeleteId("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <Typography>Are you sure want to delete?</Typography>
          <Box paddingTop={"10px"} display={"flex"} justifyContent={"end"}>
            <Box paddingRight={"5px"}>
              <Button
                type="secondary"
                style={{ height: "30px" }}
                onClick={() => setDeleteId("")}
              >
                <Typography>No</Typography>
              </Button>
            </Box>
            <Button style={{ height: "30px" }} onClick={() => chatDelete()}>
              <Typography>Yes</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export const LiveChat = () => {
  const [chatList, setChatList] = useState<ChatInfo[] | []>([]);
  const [showTarget, setShowTarget] = useState(false);
  const userData = useLoggedInUser();
  const [target, setTarget] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [users, setUsers] = useState<AuthUser[] | []>([]);
  const [selectedUser, setSelectedUser] = useState("group_message");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [socket, setSocket] = useState<Socket | null>(null);
  const [unreadMsgs, setUnreadMsgs] = useState({});
  const [alert, setAlert] = useState("");
  const [infoId, setInfoId] = useState("");
  const [deactivePhone, setDeactivatePhone] = useState("");

  useEffect(() => {
    const serverUrl = location.host || "http://localhost:3000";
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendChat = (chat: string) => {
    if (!chat) return;
    const currrentChat: ChatInfo = {
      message: chat,
      timestamp: dayjs(new Date()).toString(),
      phone: userData?.phone as string,
      username: userData?.username as string,
      participants:
        selectedUser === "group_message"
          ? []
          : [userData?.phone as string, selectedUser],
      isGroup: selectedUser === "group_message",
    };

    if (socket) {
      socket.emit("message", currrentChat);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: ChatInfo) => {
        const updatedChats = [...chatList, message];
        const currentChatList = updatedChats.filter((chat) => {
          if (selectedUser === "group_message") {
            return chat.isGroup === true;
          } else {
            return chat.participants.includes(userData?.phone as string);
          }
        });
        setChatList(currentChatList);

        if (userData?.phone !== message.phone) {
          if (
            message.isGroup ||
            message.participants.includes(userData?.phone as string)
          ) {
            setAlert(
              `New message from ${message.username}${
                message.isGroup ? " in group chat" : ""
              }`
            );
          }
        }
      });
    }
  }, [socket, chatList]);

  const getChatsList = async (payload: {
    selectedUser: string;
    loggedInUser: string;
    isGroup: boolean;
  }) => {
    const chats = await authApi.getChats(payload);
    setChatList(chats.data as ChatInfo[]);
  };
  useEffect(() => {
    if (selectedUser !== "group_message") {
      getChatsList({
        selectedUser,
        loggedInUser: userData?.phone as string,
        isGroup: selectedUser === "group_message",
      });
      getOtherInfo(
        userData?.isAdmin ? selectedUser : (userData?.phone as string)
      );
    }
  }, [selectedUser]);

  const saveOtherInfo = () => {
    authApi.setOtherInfo({
      note,
      target,
      _id: infoId,
      phone: selectedUser as string,
    });
    setShowTarget(false);
    setShowNote(false);
    getOtherInfo(
      userData?.isAdmin ? selectedUser : (userData?.phone as string)
    );
  };

  const getUsersList = async () => {
    const list = await authApi.getUsers();

    const updatedLoggedInUser: AuthUser = list.data.find(
      (user) => user.phone === userData?.phone
    ) as AuthUser;
    if (!updatedLoggedInUser.isActive) {
      clearUserData();
      setTimeout(() => {
        Router.replace("/login");
      }, 300);
    }

    setUsers(list.data as unknown as AuthUser[]);
    const filteredList = userData?.isAdmin
      ? list.data.filter((user) => !user.isAdmin)
      : list.data.filter((user) => user.isAdmin);

    const selectedUserPhone = filteredList[0].phone;
    setSelectedUser(selectedUserPhone);
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const getOtherInfo = async (selectedUserPhone: string) => {
    const info = await authApi.getOtherInfo(selectedUserPhone as string);
    setInfoId(info.data._id as string);
    setNote(info.data.note);
    setTarget(info.data.target);
  };

  const setDeactivateModal = (phone: string) => {
    setDeactivatePhone(phone);
  };

  let userAction: AuthUser | {} = {};
  if (deactivePhone !== "") {
    userAction = users.find((user) => user.phone === deactivePhone) || {};
  }

  const userStateChange = async (state: boolean, phone: string) => {
    setDeactivatePhone("");
    await authApi.userAction({ phone, isActive: state });
    getUsersList();
  };

  return (
    <ChatContainer display={"flex"} flexDirection={"column"}>
      <Header
        ismobile={isMobile}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box paddingLeft={"30px"}>
          <Typography
            color={COLORS.WHITE}
            fontSize={isMobile ? "12px" : "16px"}
          >
            TSPL - {users.find((user) => user.phone === selectedUser)?.username}
          </Typography>
        </Box>
        <Box paddingRight={"30px"}>
          <Button
            style={{ height: isMobile ? "20px" : "30px" }}
            onClick={() => {
              setShowTarget(true);
              getOtherInfo(
                userData?.isAdmin ? selectedUser : (userData?.phone as string)
              );
            }}
          >
            <Typography fontSize={isMobile ? "12px" : "16px"}>
              {userData?.isAdmin ? "Set Amount" : "View Amount"}
            </Typography>
          </Button>
        </Box>
      </Header>
      <Box display={"flex"} paddingTop={"2px"} height={"77%"}>
        <LeftSidePanel
          display={"flex"}
          flexDirection={"column"}
          ismobile={isMobile}
        >
          <Box style={{ backgroundColor: "burlywood" }} paddingLeft={"10px"}>
            <Typography fontSize={isMobile ? "11px" : "14pt"}>
              Request Message
            </Typography>
          </Box>
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "0",
              marginTop: "2px",
            }}
          >
            {users.map((user, i) => {
              if (user.phone !== userData?.phone) {
                if (userData?.isAdmin) {
                  return (
                    <UsersLi
                      active={user.phone === selectedUser}
                      key={i}
                      ismobile={isMobile}
                      userActive={user.isActive}
                    >
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Box
                          onClick={() => setSelectedUser(user.phone)}
                          width={"100%"}
                        >
                          <Typography fontSize={isMobile ? "14px" : "16px"}>
                            {user.username}
                          </Typography>
                        </Box>
                        {userData.isAdmin && (
                          <Box
                            alignItems={"center"}
                            style={{ zIndex: 999 }}
                            onClick={() => setDeactivateModal(user.phone)}
                          >
                            {user.isActive ? (
                              <MdCancel
                                style={{
                                  paddingRight: "2px",
                                  paddingTop: "2px",
                                }}
                              />
                            ) : (
                              <MdAdd
                                style={{
                                  paddingRight: "2px",
                                  paddingTop: "2px",
                                }}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                    </UsersLi>
                  );
                } else {
                  if (user.isAdmin) {
                    return (
                      <UsersLi
                        active={user.phone === selectedUser}
                        key={i}
                        ismobile={isMobile}
                        userActive={user.isActive}
                      >
                        <Box display={"flex"} justifyContent={"space-between"}>
                          <Box
                            onClick={() => setSelectedUser(user.phone)}
                            width={"100%"}
                          >
                            <Typography fontSize={isMobile ? "14px" : "16px"}>
                              {user.username}
                            </Typography>
                          </Box>
                          {userData?.isAdmin && (
                            <Box
                              alignItems={"center"}
                              style={{ zIndex: 999 }}
                              onClick={() => setDeactivateModal(user.phone)}
                            >
                              {user.isActive ? (
                                <MdCancel
                                  style={{
                                    paddingRight: "2px",
                                    paddingTop: "2px",
                                  }}
                                />
                              ) : (
                                <MdAdd
                                  style={{
                                    paddingRight: "2px",
                                    paddingTop: "2px",
                                  }}
                                />
                              )}
                            </Box>
                          )}
                        </Box>
                      </UsersLi>
                    );
                  }
                }
              }
            })}
            {/* <UsersLi
              active={selectedUser === "group_message"}
              onClick={() => setSelectedUser("group_message")}
            >
              <Box display={"flex"} alignItems={"center"}>
                <MdGroup style={{ paddingRight: "5px" }} />
                <Typography fontSize={"13pt"} fontWeight={"bold"}>
                  Group Chat
                </Typography>
              </Box>
            </UsersLi> */}
          </ul>
          <Box display={"flex"} justifyContent={"center"}>
            {userData?.isAdmin ? (
              <Button
                type="secondary"
                style={{ height: "30px" }}
                onClick={() => {
                  setShowNote(true);
                  getOtherInfo(
                    userData?.isAdmin
                      ? selectedUser
                      : (userData?.phone as string)
                  );
                }}
              >
                <Typography fontSize={isMobile ? "14px" : "16px"}>
                  {userData?.isAdmin ? "Set Note" : "View Note"}
                </Typography>
              </Button>
            ) : (
              <Box>
                <Typography>{note}</Typography>
              </Box>
            )}
          </Box>
        </LeftSidePanel>
        <Box
          display={"flex"}
          justifyContent={"end"}
          width={"100%"}
          flexDirection={"column"}
        >
          <ChatView
            chatList={chatList}
            getChatsList={getChatsList}
            payload={{
              selectedUser,
              loggedInUser: userData?.phone as string,
              isGroup: selectedUser === "group_message",
            }}
          />
          <ChatTypingArea sendChat={sendChat} />
        </Box>
      </Box>

      <Modal
        open={showTarget}
        onClose={() => setShowTarget(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <Typography>
            You current target amount is:{" "}
            {!userData?.isAdmin && <b>{target}</b>}
          </Typography>
          {userData?.isAdmin && (
            <TextBox
              id="chat-area"
              aria-label="chat area"
              type="text"
              onChange={({ target: { value } }) => setTarget(value)}
              value={target}
              style={{
                borderColor: "grey",
                fontSize: "18px",
                marginRight: "5px",
              }}
            />
          )}
          <Box paddingTop={"10px"} display={"flex"} justifyContent={"end"}>
            <Box paddingRight={"5px"}>
              <Button
                type="secondary"
                style={{ height: "30px" }}
                onClick={() => setShowTarget(false)}
              >
                <Typography>Close</Typography>
              </Button>
            </Box>
            {userData?.isAdmin && (
              <Button
                style={{ height: "30px" }}
                onClick={() => saveOtherInfo()}
              >
                <Typography>Save</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={!!alert}
        autoHideDuration={6000}
        onClose={() => setAlert("")}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <CustomAlert
          severity="info"
          action={
            <MuiButton color="info" size="small" onClick={() => setAlert("")}>
              <u>Ok</u>
            </MuiButton>
          }
        >
          {alert || "A new message"}
        </CustomAlert>
      </Snackbar>

      <Modal
        open={showNote}
        onClose={() => setShowNote(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <Typography>
            <b>Note:</b> {!userData?.isAdmin && <p>{note}</p>}
          </Typography>
          {userData?.isAdmin && (
            <TextareaAutosize
              id="chat-area"
              aria-label="chat area"
              onChange={({ target: { value } }) => setNote(value)}
              value={note}
              style={{
                borderColor: "grey",
                fontSize: "12px",
                marginRight: "5px",
                height: "50px",
                width: isMobile ? "300px" : "350px",
              }}
            />
          )}
          <Box paddingTop={"10px"} display={"flex"} justifyContent={"end"}>
            <Box paddingRight={"5px"}>
              <Button
                type="secondary"
                style={{ height: "30px" }}
                onClick={() => setShowNote(false)}
              >
                <Typography>Close</Typography>
              </Button>
            </Box>
            {userData?.isAdmin && (
              <Button
                style={{ height: "30px" }}
                onClick={() => saveOtherInfo()}
              >
                <Typography>Save</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      <Modal
        open={deactivePhone !== ""}
        onClose={() => setDeactivatePhone("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(isMobile)}>
          <Typography>
            Are you sure want to
            {(userAction as AuthUser)?.isActive
              ? ` deactivate - ${(userAction as AuthUser).username}?`
              : ` activate - ${(userAction as AuthUser).username}?`}
          </Typography>
          <Box paddingTop={"10px"} display={"flex"} justifyContent={"end"}>
            <Box paddingRight={"5px"}>
              <Button
                type="secondary"
                style={{ height: "30px" }}
                onClick={() => setDeactivatePhone("")}
              >
                <Typography>No</Typography>
              </Button>
            </Box>
            {userData?.isAdmin && (
              <Button
                style={{ height: "30px" }}
                onClick={() =>
                  userStateChange(
                    !(userAction as AuthUser)?.isActive,
                    deactivePhone
                  )
                }
              >
                <Typography>Yes</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </ChatContainer>
  );
};

export default LiveChat;
