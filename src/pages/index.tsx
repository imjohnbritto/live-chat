import { useRouter } from "next/router";
import { Box, IconButton } from "@mui/material";
import { COLORS } from "@utils/theme";
import { FC, useEffect } from "react";
import { AuthUser } from "@server/types/user";
import { styled } from "@mui/system";
import Header from "@components/Layout/Header";
import LiveChat from "@features/livechat";
import dynamic from "next/dynamic";
import useLoggedInUser from "@utils/useLoggedInUser";

const PageWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  backgroundColor: COLORS.WHITE,
  columnGap: "32px",
  padding: "16px 100px",
  [theme.breakpoints.down("lg")]: {
    padding: "24px 48px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "24px 16px",
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  rowGap: "24px",
  [theme.breakpoints.down("md")]: {
    rowGap: "16px",
  },
}));

const AuthUserProvider = dynamic(
  () =>
    import("providers/AuthUserProvider").then((mod) => mod.AuthUserProvider),
  {
    ssr: false,
  }
);

const Home: FC<{ authUser: AuthUser }> = ({ authUser }) => {
  const isLoggedIn = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <AuthUserProvider authUser={authUser}>
      <Header />
      <PageWrapper>
        <MainContent>
          <LiveChat />
        </MainContent>
      </PageWrapper>
    </AuthUserProvider>
  );
};

export default Home;
