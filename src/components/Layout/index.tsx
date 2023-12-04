import { ReactNode, FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { styled } from "@mui/system";

const Wrapper = styled("div")`
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ContentWrapper = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TSPL</title>
        <link rel="icon" href={"/logo/favicon.ico"} sizes="any" />
      </Head>
      <Wrapper>
        {/* <Header /> */}
        <ContentWrapper id="main" role="main">
          {children}
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
