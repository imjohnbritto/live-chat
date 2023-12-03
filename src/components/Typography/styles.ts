import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';

type TypographyTypes = {
  color?: string;
  size?: number;
  weight?:
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
  lineHeight?: number;
  fontStyle?: 'normal' | 'italic' | 'oblique';
};

export const H2Wrapper = styled('h2')<TypographyTypes>`
  font-family: Roboto;
  font-size: ${({ size }) => (size ? size + 'px' : '')};
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  color: ${({ color }) => (color ? color : COLORS.BLACK)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight + 'px' : '')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : 'normal')};
`;

export const H3Wrapper = styled('h3')<TypographyTypes>`
  font-family: Roboto;
  font-size: ${({ size }) => (size ? size + 'px' : '')};
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  color: ${({ color }) => (color ? color : COLORS.BLACK)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight + 'px' : '')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : 'normal')};
`;

export const Normal = styled('span')<TypographyTypes>`
  font-family: Roboto;
  font-size: ${({ size }) => (size ? size + 'px' : '')};
  font-weight: ${({ weight }) => (weight ? weight : '400')};
  color: ${({ color }) => (color ? color : COLORS.BLACK)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight + 'px' : '')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : 'normal')};
`;
// @media ${device.mobileL('max')} {
//   font-size: ${({ size }) =>
//size ? size - (size * 10) / 100 + 'px' : ''};
// }
// @media ${device.mobileM('max')} {
//   font-size: ${({ size }) =>
//size ? size - (size * 30) / 100 + 'px' : ''};
// }
// @media ${device.mobileS('max')} {
//   font-size: ${({ size }) =>
//size ? size - (size * 50) / 100 + 'px' : ''};
// }
