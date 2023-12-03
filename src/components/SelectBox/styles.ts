import { styled } from '@mui/system';
import { COLORS } from '@utils/theme';

export const Select = styled('select')`
  width: 100%;
  cursor: pointer;
  height: 40px;
  border-radius: 4px;
  padding: 10px 12px;
  margin-top: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+);
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 6px;
  :focus-visible {
    outline: ${COLORS.TEXT1} auto 1px;
  }
`;

export const OptionWrapper = styled('option')`
  font-family: Roboto;
  padding: 10px 0;
  background-color: ${COLORS.LIGHT_GREY};
`;
