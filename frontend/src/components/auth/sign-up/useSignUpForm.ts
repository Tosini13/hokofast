import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  AuthStoreContext,
  TSignUpStoreParams,
} from "../../../stores/authStore";

type TSignUpForm = {
  email: string;
  nickname?: string;
  password: string;
  repeatPassword: string;
};

type TUseSignUpFormProps = {
  successCallback: () => void;
};

export const useSignUpForm = ({ successCallback }: TUseSignUpFormProps) => {
  const authStore = useContext(AuthStoreContext);
  const { handleSubmit, control, watch, setError } = useForm<TSignUpForm>();

  const password = watch("password");
  const repeatPassword = watch("repeatPassword");

  React.useEffect(() => {
    if (password !== repeatPassword) {
      setError("repeatPassword", { message: "Wrong pass" });
    }
  }, [password, repeatPassword, setError]);

  const onSubmit = async (data: TSignUpForm) => {
    const signUpParams: TSignUpStoreParams = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      successCallBack: successCallback,
    };

    try {
      await authStore.signUp(signUpParams);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
  };
};
