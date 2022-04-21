import { Divider, Stack, Typography } from "@mui/material";
import { EPath } from "../../../routing/paths";
import ButtonGoogle from "../../../style/buttons/ButtonGoogle";
import ButtonFacebook from "../../../style/buttons/ButtonFacebook";
import ButtonPrimary from "../../../style/buttons/ButtonPrimary";
import LinkPrimary from "../../../style/links/LinkPrimary";
import LayoutAuth, { LogoAuth } from "../Layout";
import TextFieldAuth from "../../../style/forms/TextFieldAuth";
import { Link } from "react-router-dom";

type TSignUpProps = {};

const SignUp: React.FC<TSignUpProps> = () => {
  return (
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
        <TextFieldAuth label="E-mail" />
        <TextFieldAuth label="Password" type="password" />
        <TextFieldAuth label="Repeat Password" type="repeatPassword" />
        <ButtonPrimary>Sign Up</ButtonPrimary>
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
          I have an account already
        </Typography>
        <LinkPrimary to={EPath.signIn} color="primary">
          Sign In
        </LinkPrimary>
      </Stack>
    </LayoutAuth>
  );
};

export default SignUp;
