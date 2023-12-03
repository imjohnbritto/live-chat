import { styled, keyframes, css } from '@mui/system';
import { COLORS } from '@utils/theme';

export type FontWeightType =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold';

type BaseButtonType = {
  color?: string;
  size?: number;
  weight?: FontWeightType;
  lineHeight?: number;
  disabled?: boolean;
};

const BaseButton = styled('button')<BaseButtonType>`
  border: none;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-size: ${({ size }) => (size ? size + 'px' : '14px')};
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  color: ${({ color }) => (color ? color : COLORS.BLACK)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight + 'px' : '20px')};
`;

export const PrimaryButton = styled(BaseButton)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${COLORS.DISABLED};
        color: ${COLORS.TEXT3};
      `;
    } else {
      return css`
        background-color: ${COLORS.PRIMARY};
        &:hover {
          background-color: #e3ad15;
        }
        &:active {
          background-color: #c29a12;
        }
      `;
    }
  }}
`;

export const SecondaryButton = styled(BaseButton)`
  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: ${COLORS.DISABLED};
        color: ${COLORS.TEXT3};
      `;
    } else {
      return css`
        background-color: ${COLORS.WHITE};
        border: 1px solid ${COLORS.TEXT1};
        &:hover {
          border: 2px solid ${COLORS.TEXT1};
        }
        &:active {
          background-color: ${COLORS.TEXT1};
          color: ${COLORS.WHITE};
        }
      `;
    }
  }}
`;

export const TextButton = styled(BaseButton)`
  background-color: ${COLORS.WHITE};
  border-radius: 0px;
  ${({ disabled }) => {
    if (disabled) {
      return css`
        color: ${COLORS.DISABLED};
      `;
    } else {
      return css`
        color: ${COLORS.TEXT1};
        &:active {
          color: ${COLORS.BLACK};
        }
      `;
    }
  }}
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled('div')`
  border: 3px solid transparent;
  border-radius: 50%;
  border-top: 3px solid ${COLORS.TEXT1};
  border-right: 3px solid ${COLORS.TEXT1};
  width: 14px;
  height: 14px;
  margin-right: 8px;
  animation: ${spin} 0.85s linear infinite;
`;
