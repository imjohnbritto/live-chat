import React, { useState } from 'react';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps
} from '@mui/x-date-pickers/DatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';
import { IoMdCalendar } from 'react-icons/io';

type DPWProps = {
  focus?: boolean;
  error?: boolean;
  disabled?: boolean;
};

const DatePickerWrapper = styled(Box)<DPWProps>(
  ({ focus, error, disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    borderStyle: 'solid',
    marginTop: '4px',
    paddingRight: '12px',
    borderWidth: focus ? '2px' : error ? '2px' : '1px',
    borderColor: disabled
      ? COLORS.DISABLED
      : error
      ? COLORS.ERROR
      : focus
      ? COLORS.TEXT1
      : COLORS.GREY
  })
);

const InputText = styled('input')`
  flex: 1;
  padding: 10px 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.TEXT1};
  background-color: ${COLORS.WHITE};
  border: none;
  &:focus {
    outline: none;
  }
  &:disabled {
    color: ${COLORS.DISABLED};
  }
`;

type Props = Partial<DatePickerProps<Dayjs, Dayjs>>;

const DatePicker = ({
  inputFormat = 'DD/MM/YYYY',
  onChange = () => {},
  value = dayjs(),
  ...rest
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <MuiDatePicker
      inputFormat={inputFormat}
      value={value}
      onChange={onChange}
      components={{
        OpenPickerIcon: IoMdCalendar
      }}
      renderDay={(_day, _selectedDays, pickerDayProps) => (
        <PickersDay
          {...pickerDayProps}
          sx={{
            '&.Mui-selected': {
              backgroundColor: COLORS.PRIMARY
            },
            ':focus.Mui-selected': {
              backgroundColor: COLORS.PRIMARY
            }
          }}
        />
      )}
      {...rest}
      renderInput={({ inputRef, inputProps, InputProps, error, disabled }) => (
        <DatePickerWrapper focus={focus} error={error} disabled={disabled}>
          <InputText
            ref={inputRef}
            {...inputProps}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            readOnly
          />
          {InputProps?.endAdornment}
        </DatePickerWrapper>
      )}
    />
  );
};

export default DatePicker;
