import "./globals.css";
import Layout from "@components/Layout";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import createEmotionCache from "@utils/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type {} from "@mui/x-date-pickers/themeAugmentation";

const clientSideEmotionCache = createEmotionCache();

type CustomAppProps = AppProps & {
  emotionCache?: ReturnType<typeof createEmotionCache>;
};

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
