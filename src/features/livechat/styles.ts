import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { COLORS } from "@utils/theme";
import Grid from "../../components/Grid";

export const ChatContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  border-radius: 15px;
  background-color: ${COLORS.LIGHT_GREEN};
`;

export const Header = styled(Box)`
  width: 100%;
  height: 50px;
  border-radius: 15px 15px 0 0;
  background-color: ${COLORS.SUCCESS};
`;

export const LeftSidePanel = styled(Box)<{ ismobile: boolean }>`
  width: ${({ ismobile }) => (ismobile ? "40%" : "20%")};
  height: 100%;
  border-radius: 0 0 0 15px;
  background-color: ${COLORS.LIGHT_YELLOW};
`;

export const TextBoxWrapper = styled(Grid)`
  padding: 8px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const MeBubble = styled(Typography)`
  background-color: #d6d374;
  border-radius: 8px;
  margin-right: 14px;
  max-width: 600px;
`;

export const OthersBubble = styled(Typography)`
  background-color: #192118;
  border-radius: 8px;
  margin-left: 14px;
  max-width: 600px;
`;

export const modalStyle = (isMobile: boolean) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? 300 : 400,
  height: 100,
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "8px",
  p: 4,
});

export const UsersLi = styled("li")<{ active: boolean }>`
  padding-left: 10px;
  background-color: ${({ active }) => (active ? COLORS.SUCCESS : "gainsboro")};
  border-radius: 6px;
  margin-bottom: 3px;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "black")};
  :hover {
    background-color: ${COLORS.SUCCESS};
    color: white;
  }
`;
