import Grid from "@components/Grid";
import Typography from "@components/Typography";
import Button from "@components/Button";
import { styled } from "@mui/system";
import { COLORS } from "@utils/theme";
import { TextBox, Error, PageWrapper } from "@components/Common";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { createAccountSchema } from "@utils/validationSchema";
import { Snackbar, Button as MuiButton, Divider } from "@mui/material";
import CustomAlert from "@components/Alert";
import { authApi } from "api";
import { UserRequestBody } from "server/types/user";
import Header from "@components/Layout/Header";
import useLoggedInUser from "@utils/useLoggedInUser";

const Form = styled(Grid)`
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.LIGHT_GREY};
  border-radius: 8px;
  width: 375px;
`;

const TextBoxWrapper = styled(Grid)`
  width: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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

type ErrorState = {
  page?: null | string;
  username?: null | string;
  phone?: null | string;
  password?: null | string;
};

const CreateAccount = () => {
  const [error, setError] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<UserRequestBody>({
    username: "",
    phone: "",
    password: "",
    isAdmin: false,
    isActive: true,
  });
  const [showPass, setShowPass] = useState(false);

  const isLoggedIn = useLoggedInUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn]);

  const handleFormValues = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleCreateAccount = async () => {
    setError({});
    setLoading(true);
    try {
      const errorSchema = createAccountSchema;
      const value = await errorSchema.validate(values);

      const res = await authApi.registerUser(value as UserRequestBody);

      if (res.status === 200) {
        //on account creation success
        setLoading(false);
        Router.push("/login");
      }
    } catch (error: any) {
      if (error.status === 400) {
        // setError({ [error.data]: error.message });
        setError({ phone: error.message });
      } else {
        setError({ page: error.message });
      }
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper alignItems="center" direction="column" gutter={[24, 0]}>
        <Form direction="column" padding={[36, 24]}>
          <Typography
            size={28}
            lineHeight={36}
            color={"TEXT1"}
            aria-label="Create a new account"
          >
            Create New Account
          </Typography>
          <TextBoxWrapper direction="column" gutter={[22, 0, 0, 0]}>
            <Typography size={12} lineHeight={16} color={"TEXT1"}>
              Full name
            </Typography>
            <TextBox
              id="username"
              aria-label="Full name, required, edit text"
              type="text"
              onChange={({ target: { value } }) =>
                handleFormValues("username", value)
              }
              value={values?.username as string}
            />
            {!!error.username && <Error text={error.username} />}
          </TextBoxWrapper>
          <TextBoxWrapper direction="column" gutter={[20, 0, 0, 0]}>
            <Typography size={12} lineHeight={16} color={"TEXT1"}>
              Mobile number
            </Typography>
            <TextBox
              aria-label="Mobile number, required, edit text"
              type="number"
              onChange={({ target: { value } }) =>
                handleFormValues("phone", String(value))
              }
              value={values?.phone as string}
            />
            {!!error.phone && <Error text={error.phone} />}
          </TextBoxWrapper>
          <TextBoxWrapper direction="column" gutter={[20, 0, 0, 0]}>
            <Typography size={12} lineHeight={16} color={"TEXT1"}>
              Set password (Minimum 6 characters)
            </Typography>
            <TextBox
              aria-label="Set password minimum 6 characters, required, secure edit text"
              type={showPass ? "text" : "password"}
              onChange={({ target: { value } }) =>
                handleFormValues("password", value)
              }
              value={values?.password as string}
            />
            <ShowBtn
              onClick={() => setShowPass(!showPass)}
              aria-label="Show Password, Button"
            >
              <Typography size={14} lineHeight={20} color={"TEXT1"}>
                {showPass ? "Hide" : "Show"}
              </Typography>
            </ShowBtn>
            {!!error.password && <Error text={error.password} />}
          </TextBoxWrapper>
          <Grid
            gutter={[12, 0, 0, 0]}
            direction="column"
            alignItems="flex-start"
          ></Grid>
          <Grid gutter={[20, 0, 0, 0]}>
            <Button
              style={{ width: "100%" }}
              aria-label="Create Account, button"
              onClick={handleCreateAccount}
              loading={loading}
            >
              Create account
            </Button>
          </Grid>
          <Divider sx={{ mt: "24px" }} />

          <Grid gutter={[24, 0, 0, 0]} direction="column">
            <Grid padding={[0, 0, 20, 0]}>
              <Typography>Already have an account?</Typography>
            </Grid>
            <Button
              type="secondary"
              style={{ width: "100%" }}
              aria-label="Log in, button"
              onClick={() => Router.replace("/login")}
            >
              Log in
            </Button>
          </Grid>
        </Form>
        <Snackbar
          open={!!error.page}
          autoHideDuration={6000}
          onClose={() => setError((prev) => ({ ...prev, page: undefined }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default CreateAccount;
