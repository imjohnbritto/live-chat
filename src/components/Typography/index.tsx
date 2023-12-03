import { H2Wrapper, Normal, H3Wrapper } from './styles';
import { COLORS } from '@utils/theme';
import { HTMLAttributes, ReactNode } from 'react';

export interface TypographyTypes extends HTMLAttributes<HTMLParagraphElement> {
  type?: 'subheading' | 'heading' | 'normal';
  color?: keyof typeof COLORS;
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
  children: ReactNode;
}

const Typography = ({
  type,
  color,
  size,
  weight,
  fontStyle,
  children,
  ...props
}: TypographyTypes) => {
  const colorValue = color ? COLORS[color] : COLORS.BLACK;

  switch (type) {
    case 'heading':
      return (
        <H2Wrapper color={colorValue} size={size} weight={weight} {...props}>
          {children}
        </H2Wrapper>
      );
    case 'subheading':
      return (
        <H3Wrapper color={colorValue} size={size} weight={weight} {...props}>
          {children}
        </H3Wrapper>
      );
    default:
      return (
        <Normal
          color={colorValue}
          size={size}
          weight={weight}
          fontStyle={fontStyle}
          {...props}>
          {children}
        </Normal>
      );
  }
};

export default Typography;
