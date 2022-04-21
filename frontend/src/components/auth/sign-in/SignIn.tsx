import { Divider, Stack, Typography } from "@mui/material";
import HokofastIcon from "../../../resources/svg/hokofast_icon.svg";
import HokofastName from "../../../resources/svg/hokofast.svg";
import { EPath } from "../../../routing/paths";
import ButtonGoogle from "../../../style/buttons/ButtonGoogle";
import ButtonFacebook from "../../../style/buttons/ButtonFacebook";
import ButtonPrimary from "../../../style/buttons/ButtonPrimary";
import LinkPrimary from "../../../style/links/LinkPrimary";
import LayoutAuth, { LogoAuth } from "../Layout";
import TextFieldAuth from "../../../style/forms/TextFieldAuth";
import { Link } from "react-router-dom";

type TSignInProps = {};

const SignIn: React.FC<TSignInProps> = () => {
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
        Log In
      </Typography>
      <Stack spacing={2}>
        <TextFieldAuth label="E-mail" />
        <TextFieldAuth label="Password" type="password" />
        <ButtonPrimary>Log In</ButtonPrimary>
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
  );
};

export default SignIn;
