import { ChangeEvent } from 'react';
import Typography from '@components/Typography';
import { RadioBtn, Label } from './styles';
import Grid from '../../components/Grid';

const RadioButton = ({
  value,
  handleChange,
  checked,
  disabled,
  label,
  ...props
}: {
  value: string;
  handleChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
}) => {
  return (
    <Grid alignItems="center">
      <RadioBtn
        id={value}
        type="radio"
        value={value}
        onChange={handleChange}
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <Label htmlFor={value}>
        <Typography color={'TEXT3'}>{label}</Typography>
      </Label>
    </Grid>
  );
};

export default RadioButton;
