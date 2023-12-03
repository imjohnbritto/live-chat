import { ChangeEvent, useEffect, useState } from 'react';
import { Select, OptionWrapper } from './styles';
import Grid from '../../components/Grid';

export type OptionType = {
  label: string;
  value: string;
};

const SelectBox = ({
  options,
  handleChange,
  disabled,
  placeHolder,
  defaultValue,
  ...props
}: {
  options: OptionType[];
  handleChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  placeHolder?: string;
  defaultValue?: string;
}) => {
  return (
    <Grid alignItems="center">
      <Select
        onChange={handleChange}
        disabled={disabled}
        {...props}
        defaultValue={defaultValue}>
        {placeHolder && (
          <OptionWrapper value="" disabled>
            {placeHolder}
          </OptionWrapper>
        )}
        {options.map((option: OptionType) => {
          return (
            <OptionWrapper key={option.value} value={option.value}>
              {option.label}
            </OptionWrapper>
          );
        })}
      </Select>
    </Grid>
  );
};

export default SelectBox;
