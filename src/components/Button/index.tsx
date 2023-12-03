import { CSSProperties, ReactNode } from 'react';
import {
  PrimaryButton,
  SecondaryButton,
  FontWeightType,
  TextButton,
  Loading
} from './styles';

type ButtonType = 'primary' | 'secondary' | 'text';

type ButtonTypes = {
  type?: ButtonType;
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
  fontSize?: number;
  lineHeight?: number;
  textColor?: string;
  weight?: FontWeightType;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  type = 'primary',
  children,
  onClick,
  style,
  loading,
  ...props
}: ButtonTypes) => {
  // Don't allow button click when loading
  const onButtonClick = () => {
    if (!loading) {
      onClick?.();
    }
  };

  if (type === 'primary') {
    return (
      <PrimaryButton onClick={onButtonClick} style={style} {...props}>
        {loading && <Loading />}
        {children}
      </PrimaryButton>
    );
  }
  if (type === 'secondary') {
    return (
      <SecondaryButton onClick={onButtonClick} style={style} {...props}>
        {loading && <Loading />}
        {children}
      </SecondaryButton>
    );
  }
  return (
    <TextButton onClick={onButtonClick} style={style} {...props}>
      {loading && <Loading />}
      {children}
    </TextButton>
  );
};

export default Button;
