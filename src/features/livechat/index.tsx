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
import { MdSend, MdGroup } from "react-icons/md";
import { ChatInfo } from "@server/types/chat";
import { getInitials } from "@utils/helper";
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
dayjs.extend(RelativeTime);

const ChatTypingArea = ({ sendChat }: { sendChat: (chat: string) => void }) => {
  const [currentChat, setCurrentChat] = useState<string>("");
  return (
    <Box>
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
            fontSize: "24px",
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

const ChatView = ({ chatList }: { chatList: ChatInfo[] }) => {
  const userData = useLoggedInUser();
  const userChatViewRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    (userChatViewRef.current as HTMLDivElement).scrollTo({
      behavior: "smooth", //test
      top: userChatViewRef.current?.scrollHeight,
    });
  }, [chatList]);
  return (
    <Box
      style={{
        height: isMobile ? "65vh" : "70vh",
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
              paddingRight={"18px"}
              paddingBottom={"18px"}
              flexDirection={"column"}
            >
              <Box display={"flex"} justifyContent={"end"}>
                <MeBubble color={COLORS.BLACK} style={{ padding: "10px" }}>
                  {chat.message}
                </MeBubble>
                <Avatar alt={userData?.username}>
                  {userData && getInitials(userData.username as string)}
                </Avatar>
              </Box>
              <Box display={"flex"} paddingRight={"58px"}>
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
              paddingLeft={"18px"}
              paddingBottom={"18px"}
              flexDirection={"column"}
            >
              <Box display={"flex"}>
                <Avatar alt={chat.username}>
                  {userData && getInitials(chat.username as string)}
                </Avatar>
                <OthersBubble color={COLORS.WHITE} style={{ padding: "10px" }}>
                  {chat.message}
                </OthersBubble>
              </Box>
              <Box display={"flex"} paddingLeft={"58px"}>
                <Typography color={COLORS.GREY} fontSize={12}>
                  {dayjs(chat.timestamp).fromNow(true)}
                </Typography>
              </Box>
            </Box>
          );
        }
      })}
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
    getChatsList({
      selectedUser,
      loggedInUser: userData?.phone as string,
      isGroup: selectedUser === "group_message",
    });
  }, [selectedUser]);

  const saveOtherInfo = () => {
    authApi.setOtherInfo({ note, target, _id: infoId });
    setShowTarget(false);
    setShowNote(false);
  };

  const getUsersList = async () => {
    const list = await authApi.getUsers();
    setUsers(list.data as unknown as AuthUser[]);
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const getOtherInfo = async () => {
    const info = await authApi.getOtherInfo();
    setInfoId(info.data._id as string);
    setNote(info.data.note);
    setTarget(info.data.target);
  };
  useEffect(() => {
    getOtherInfo();
  }, []);

  return (
    <ChatContainer display={"flex"} flexDirection={"column"}>
      <Header
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box paddingLeft={"30px"}>
          <Typography color={COLORS.WHITE}>Teams Chat</Typography>
        </Box>
        <Box paddingRight={"30px"}>
          <Button
            style={{ height: "30px" }}
            onClick={() => {
              setShowTarget(true);
              getOtherInfo();
            }}
          >
            <Typography>
              {userData?.isAdmin ? "Set Target" : "View Target"}
            </Typography>
          </Button>
        </Box>
      </Header>
      <Box display={"flex"} paddingTop={"5px"}>
        <LeftSidePanel
          display={"flex"}
          flexDirection={"column"}
          ismobile={isMobile}
        >
          <Box style={{ backgroundColor: "burlywood" }} paddingLeft={"10px"}>
            <Typography fontSize={"14pt"}>Direct Messages</Typography>
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
                return (
                  <UsersLi
                    active={user.phone === selectedUser}
                    onClick={() => setSelectedUser(user.phone)}
                    key={i}
                  >
                    <Box>
                      <Typography>{user.username}</Typography>
                    </Box>
                  </UsersLi>
                );
              }
            })}
            <UsersLi
              active={selectedUser === "group_message"}
              onClick={() => setSelectedUser("group_message")}
            >
              <Box display={"flex"} alignItems={"center"}>
                <MdGroup style={{ paddingRight: "5px" }} />
                <Typography fontSize={"13pt"} fontWeight={"bold"}>
                  Group Chat
                </Typography>
              </Box>
            </UsersLi>
          </ul>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              type="secondary"
              style={{ height: "30px" }}
              onClick={() => {
                setShowNote(true);
                getOtherInfo();
              }}
            >
              <Typography>
                {userData?.isAdmin ? "Set Note" : "View Note"}
              </Typography>
            </Button>
          </Box>
        </LeftSidePanel>
        <Box
          display={"flex"}
          justifyContent={"end"}
          width={"100%"}
          flexDirection={"column"}
        >
          <ChatView chatList={chatList} />
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
            Current Target Amount is: {!userData?.isAdmin && <b>{target}</b>}
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
    </ChatContainer>
  );
};

export default LiveChat;
