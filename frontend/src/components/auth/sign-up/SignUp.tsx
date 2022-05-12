import { Divider, Stack, Typography } from "@mui/material";
import { EPath } from "../../../routing/paths";
import ButtonGoogle from "../../../style/buttons/ButtonGoogle";
import ButtonFacebook from "../../../style/buttons/ButtonFacebook";
import ButtonPrimary from "../../../style/buttons/ButtonPrimary";
import LinkPrimary from "../../../style/links/LinkPrimary";
import LayoutAuth, { LogoAuth } from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../controlled/TextField";
import { useSignUpForm } from "./useSignUpForm";
import { useState } from "react";

type TSignUpProps = {};

const SignUp: React.FC<TSignUpProps> = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleSubmit, control } = useSignUpForm({
    failureCallBack: (_e?: string) => setError(`There was a problem`),
    successCallback: () => navigate(EPath.home),
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
          Sign Up
        </Typography>
        <Stack spacing={2}>
          <TextField name={"email"} label="E-mail" control={control} />
          <TextField name={"nickname"} label="Nickname" control={control} />
          <TextField
            name={"password"}
            label="Password"
            type="password"
            control={control}
          />
          <TextField
            name={"repeatPassword"}
            label="Repeat Password"
            type="password"
            control={control}
          />
          <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
        </Stack>
        <Typography style={{ height: "24px" }} color="red" textAlign={"center"}>
          {error}
        </Typography>
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
            I have an account already
          </Typography>
          <LinkPrimary to={EPath.signIn} color="primary">
            Sign In
          </LinkPrimary>
        </Stack>
      </LayoutAuth>
    </form>
  );
};

export default SignUp;
