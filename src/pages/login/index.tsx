import Grid from "../../components/Grid";
import Typography from "@components/Typography";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { TextBox, Error, PageWrapper } from "@components/Common";
import { styled } from "@mui/system";
import { COLORS } from "@utils/theme";
import { loginSchema } from "@utils/validationSchema";
import { GetServerSideProps } from "next";
import { authApi } from "api";
import { Snackbar, Button as MuiButton } from "@mui/material";
import CustomAlert from "@components/Alert";
import { setUserData } from "@utils/helper";
import useLoggedInUser from "@utils/useLoggedInUser";
import Header from "@components/Layout/Header";

type ErrorState = {
  phone?: string | null;
  password?: string | null;
  page?: string | null;
};

const ForgotPasswordButton = styled(Button)`
  color: ${COLORS.SECONDARY};
  padding: 0px;
  &:active {
    color: #1f3271;
  }
`;

const TextBoxWrapper = styled(Grid)`
  width: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Form = styled(Grid)`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.LIGHT_GREY};
  border-radius: 8px;
  width: 322px;
`;

const ShowBtn = styled("button")`
  position: absolute;
  align-self: flex-end;
  margin-top: 30px;
  margin-right: 4px;
  text-decoration: underline;
  color: ${COLORS.GREY};
  cursor: pointer;
  background-color: ${COLORS.WHITE};
  border: none;
`;

const Divider = styled(Grid)`
  height: 1px;
  background-color: ${COLORS.LIGHT_GREY};
  width: 320px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({});
  const isLoggedIn = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const onLogin = async () => {
    setError({});
    setLoading(true);
    try {
      const value = await loginSchema.validate(
        { phone: mobile, password },
        { stripUnknown: true }
      );
      const res = await authApi.loginUser(value.phone, value.password);
      setUserData(res.data);
      setTimeout(() => {
        Router.replace("/");
      }, 300);
    } catch (error: any) {
      console.log(error.message, error.path, error);
      let message = error.message;
      let type = error.path;
      if (error.status) {
        type = "page";
        if (error.status === 401) {
          message = "Mobile number or password is incorrect";
        } else {
          message = "We are facing some unexpected issue.";
        }
      }
      setError({ [type]: message });
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper alignItems="center" direction="column" gutter={[24, 0]}>
        <Form direction="column" padding={[36, 24]}>
          <Typography size={28} lineHeight={36} color={"TEXT1"}>
            Log in
          </Typography>
          <TextBoxWrapper direction="column" gutter={[20, 0, 0, 0]}>
            <Typography size={12} lineHeight={16} color={"TEXT1"}>
              Mobile number
            </Typography>
            <TextBox
              id="phone"
              aria-label="Mobile number, required"
              type="number"
              onChange={({ target: { value } }) => setMobile(String(value))}
              value={mobile}
            />
            {!!error.phone && <Error text={error.phone} />}
          </TextBoxWrapper>
          <TextBoxWrapper direction="column" gutter={[20, 0, 0, 0]}>
            <Typography size={12} lineHeight={16} color={"TEXT1"}>
              Password
            </Typography>
            <TextBox
              aria-label="Password, required"
              type={showPass ? "text" : "password"}
              onChange={({ target: { value } }) => setPassword(value)}
              value={password}
            />
            <ShowBtn
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? "Hide Password" : "Show Password"}
            >
              <Typography size={14} lineHeight={20} color={"TEXT1"}>
                {showPass ? "Hide" : "Show"}
              </Typography>
            </ShowBtn>
            {!!error.password && <Error text={error.password} />}
          </TextBoxWrapper>
          {/* <Grid gutter={[12, 0, 0, 0]} direction="column" alignItems="flex-start">
          <ForgotPasswordButton
            type="text"
            weight="700"
            onClick={() => Router.replace(ROUTES.FORGOT_PASSWORD)}
          >
            <u>Forgot Password?</u>
          </ForgotPasswordButton>
        </Grid> */}
          <Grid gutter={[20, 0, 0, 0]}>
            <Button
              style={{ width: "100%" }}
              onClick={onLogin}
              loading={loading}
            >
              Log In
            </Button>
          </Grid>
          <Divider gutter={[36, 0, 0, 0]} alignItems="center" />
          <Grid gutter={[36, 0, 0, 0]}>
            <Typography size={16} lineHeight={22} color={"TEXT1"}>
              If you do not have an TSPL Chat account
            </Typography>
          </Grid>
          <Grid gutter={[20, 0, 0, 0]} direction="column" alignItems="center">
            <Button
              type="secondary"
              style={{ width: "100%" }}
              onClick={() => Router.replace("/signup")}
            >
              Create new account
            </Button>
          </Grid>
        </Form>
        <Snackbar
          open={!!error.page}
          autoHideDuration={6000}
          onClose={() => setError((prev) => ({ ...prev, page: undefined }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          style={{ width: "80%" }}
        >
          <CustomAlert
            severity="error"
            action={
              <MuiButton
                color="error"
                size="small"
                onClick={() => Router.reload()}
              >
                <u>Reload page</u>
              </MuiButton>
            }
          >
            {error.page || "Something went wrong"}
          </CustomAlert>
        </Snackbar>
      </PageWrapper>
    </>
  );
};
export default Login;
