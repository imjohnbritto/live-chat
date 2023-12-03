import { Alert as MuiAlert } from "@mui/material";
import { styled } from "@mui/system";
import { COLORS } from "@utils/theme";

const CustomAlert = styled(MuiAlert)`
  border-radius: 4px;
  border: 1px solid ${COLORS.SUCCESS};
  padding: 0px 8px;
  border-left-width: 4px;
  border-left-color: ${COLORS.SUCCESS};
  background-color: ${COLORS.LIGHT_GREEN};

  & .MuiAlert-icon {
    color: ${COLORS.INFO};
    margin-right: 8px;
  }

  & .MuiAlert-message {
    color: ${COLORS.SUCCESS};
  }

  & .MuiAlert-action {
    padding-left: 12px;
    padding-right: 12px;
    button {
      color: ${COLORS.INFO};
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      :hover {
        background-color: #fce8e9;
      }
    }
  }
`;

export default CustomAlert;
