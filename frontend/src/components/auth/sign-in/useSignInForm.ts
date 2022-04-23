import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TLogInParams } from "../../../models/api/login";
import { AuthStoreContext } from "../../../stores/authStore";

type TSignUpForm = {
  email: string;
  password: string;
};

export const useSignInForm = () => {
  const authStore = useContext(AuthStoreContext);
  const { handleSubmit, control } = useForm<TSignUpForm>();

  const onSubmit = async (data: TSignUpForm) => {
    const logInParams: TLogInParams = {
      email: data.email,
      password: data.password,
    };

    try {
      await authStore.logIn(logInParams);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
  };
};
