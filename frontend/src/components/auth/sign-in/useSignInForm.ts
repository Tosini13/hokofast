import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TLogInParams } from "../../../models/api/login";
import { AuthStoreContext } from "../../../stores/authStore";
import useAsync from "../../../utils/useAsync";

type TSignUpForm = {
  email: string;
  password: string;
};

type TUseSignInFormParams = {
  success?: () => void;
  failureCallBack?: (e?: string) => void;
};

export const useSignInForm = ({ failureCallBack }: TUseSignInFormParams) => {
  const { isProcessing, execute } = useAsync();
  const authStore = useContext(AuthStoreContext);
  const { handleSubmit, control } = useForm<TSignUpForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSignUpForm) => {
    const logInParams: TLogInParams = {
      email: data.email,
      password: data.password,
    };

    await execute(authStore.logIn({ ...logInParams, failureCallBack }));
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isProcessing,
  };
};
