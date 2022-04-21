import SignIn from "../components/auth/sign-in/SignIn";
import MainStack from "../components/layout/MainStack";

type TSignInPageProps = {};

const SignInPage: React.FC<TSignInPageProps> = () => {
  return (
    <MainStack>
      <SignIn />
    </MainStack>
  );
};

export default SignInPage;
