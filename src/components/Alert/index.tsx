import { Alert as MuiAlert } from '@mui/material';
import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';

const CustomAlert = styled(MuiAlert)`
  border-radius: 4px;
  border: 1px solid #ef8e92;
  padding: 0px 8px;
  border-left-width: 4px;
  border-left-color: ${COLORS.ERROR};
  background-color: #fce8e9;

  & .MuiAlert-icon {
    color: ${COLORS.DARK_RED};
    margin-right: 8px;
  }

  & .MuiAlert-message {
    color: ${COLORS.DARK_RED};
  }

  & .MuiAlert-action {
    padding-left: 12px;
    padding-right: 12px;
    button {
      color: ${COLORS.DARK_RED};
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
