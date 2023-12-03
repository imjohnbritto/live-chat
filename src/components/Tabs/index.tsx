import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';

export const Tab = styled(MuiTab)(() => ({
  textTransform: 'none',
  minHeight: '36px',
  padding: '8px 12px',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: '400',
  '&.Mui-selected': {
    color: COLORS.TEXT1,
    fontWeight: '700'
  }
}));

export const Tabs = styled(MuiTabs)(() => ({
  minHeight: '36px',
  '& .MuiTabs-indicator': {
    backgroundColor: COLORS.TEXT1,
    height: '2px'
  }
}));

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}>
      {value === index && children}
    </Box>
  );
};
