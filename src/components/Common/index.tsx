import Grid from '@components/Grid';
import { COLORS } from '@utils/theme';
import { styled } from '@mui/system';
import { MdError } from 'react-icons/md';
import Typography from '@components/Typography';
import { Box, LinearProgress } from '@mui/material';

type TextBoxProps = { error?: boolean };

export const TextBox = styled('input')<TextBoxProps>`
  border-radius: 4px;
  border: 1px solid ${COLORS.GREY};
  padding: 10px 12px;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.TEXT1};
  background-color: ${COLORS.WHITE};
  margin-top: 4px;
  &:focus {
    border: 2px solid ${({ error }) => (error ? COLORS.ERROR : COLORS.TEXT1)};
    outline: none;
  }
  &:disabled {
    border: 1px solid ${COLORS.DISABLED};
    color: ${COLORS.DISABLED};
  }
`;

type ErrorProps = {
  text: string;
};

export const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <Grid gutter={[4, 0, 0, 0]} alignItems="flex-start">
      <Grid>
        <MdError color={COLORS.ERROR} size={16} />
      </Grid>
      <Typography
        size={12}
        lineHeight={16}
        color={'ERROR'}
        style={{ marginLeft: 4 }}>
        {text}
      </Typography>
    </Grid>
  );
};

export const PageWrapper = styled(Grid)`
  background-color: ${COLORS.BACKGROUND};
  flex: 1;
`;

export const PageLoader = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="secondary" />
    </Box>
  );
};
