import SignUp from "../components/auth/sign-up/SignUp";
import MainStack from "../components/layout/MainStack";

type TSignUpPageProps = {};

const SignUpPage: React.FC<TSignUpPageProps> = () => {
  return (
    <MainStack>
      <SignUp />
    </MainStack>
  );
};

export default SignUpPage;
