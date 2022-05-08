import { Divider, Stack, Typography } from "@mui/material";
import { EPath } from "../../../routing/paths";
import ButtonGoogle from "../../../style/buttons/ButtonGoogle";
import ButtonFacebook from "../../../style/buttons/ButtonFacebook";
import ButtonPrimary from "../../../style/buttons/ButtonPrimary";
import LinkPrimary from "../../../style/links/LinkPrimary";
import LayoutAuth, { LogoAuth } from "../Layout";
import { Link } from "react-router-dom";
import { useSignInForm } from "./useSignInForm";
import TextField from "../../controlled/TextField";
import { Login } from "@mui/icons-material";
import { LoadingIcon } from "../../utils/Loading";
import { useState } from "react";

type TSignInProps = {};

const SignIn: React.FC<TSignInProps> = () => {
  const [error, setError] = useState("");
  const { handleSubmit, control, isProcessing } = useSignInForm({
    failureCallBack: (e?: string) => setError(`There was a problem ${e}`),
    success: () => setError(""),
  });

  return (
    <form onSubmit={handleSubmit}>
      <LayoutAuth>
        <Link to={EPath.home}>
          <LogoAuth />
        </Link>
        <Typography
          textAlign={"center"}
          variant="h6"
          color={"primary"}
          fontWeight={700}
        >
          Log In
        </Typography>
        <Stack spacing={2}>
          <TextField name="email" label="E-mail" control={control} />
          <TextField
            name="password"
            type="password"
            label="Password"
            control={control}
          />
          <ButtonPrimary
            type="submit"
            disabled={isProcessing}
            startIcon={isProcessing ? <LoadingIcon /> : <Login />}
          >
            Log In
          </ButtonPrimary>
          <Typography
            style={{ height: "24px" }}
            color="red"
            textAlign={"center"}
          >
            {error}
          </Typography>
        </Stack>
        <Typography color="primary" textAlign="center">
          or
        </Typography>
        <Stack spacing={2}>
          <ButtonFacebook />
          <ButtonGoogle />
        </Stack>
        <Divider />
        <Stack spacing={2}>
          <Typography color="primary" textAlign="center">
            Don't have an account yet?
          </Typography>
          <LinkPrimary to={EPath.signUp} color="primary">
            Sign Up
          </LinkPrimary>
        </Stack>
      </LayoutAuth>
    </form>
  );
};

export default SignIn;
