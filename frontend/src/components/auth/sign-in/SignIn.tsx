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

type TSignInProps = {};

const SignIn: React.FC<TSignInProps> = () => {
  const { handleSubmit, control } = useSignInForm();
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
          <ButtonPrimary type="submit">Log In</ButtonPrimary>
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
