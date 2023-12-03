import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';

export const RadioBtn = styled('input')`
  width: 20px;
  cursor: pointer;
  height: 20px;
  accent-color: ${COLORS.BLACK};

  :disabled {
    color: ${COLORS.BLACK};
    accent-color: ${COLORS.BLACK};
    background-color: ${COLORS.BLACK};
    border: 1px solid ${COLORS.BLACK};
  }

  :checked ~ label {
    span {
      color: ${COLORS.BLACK};
    }
  }
`;

export const Label = styled('label')`
  padding-left: 12px;
  padding-top: 4px;
  cursor: pointer;
`;
