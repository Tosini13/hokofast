import React from "react";
import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { logIn, TLogInParams } from "../models/api/login";
import { signUp, TSignUpParams } from "../models/api/signup";
import { isLoggedIn } from "../models/api/isLoggedIn";
import { EIsLoggedIn } from "../models/backend";

type TAuthFunc = {
  successCallBack?: () => void;
  failureCallBack?: () => void;
};

export type TLogInStoreParams = TLogInParams & TAuthFunc;
export type TSignUpStoreParams = TSignUpParams & TAuthFunc;

class Auth {
  isLoggedIn: boolean | undefined;

  setAxiosHeaders(AUTH_TOKEN: string) {
    axios.defaults.headers.common["x-access-token"] = AUTH_TOKEN;
  }

  async check() {
    const token = localStorage.getItem("token") ?? "";

    if (!token) {
      this.isLoggedIn = false;
      return;
    }

    try {
      const res = await isLoggedIn({ token });
      this.setAxiosHeaders(token);
      if (res.data.message === EIsLoggedIn.LOGGED_IN) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } catch (e) {
      this.isLoggedIn = false;
    }
  }

  async logIn({ email, password, failureCallBack }: TLogInStoreParams) {
    const res = await logIn({ email, password });
    if (res.data.token) {
      this.setAxiosHeaders(res.data.token);
      localStorage.setItem("token", res.data.token);
      this.isLoggedIn = true;
    } else {
      if (failureCallBack) failureCallBack();
      this.isLoggedIn = false;
    }
  }

  async signUp({
    failureCallBack,
    successCallBack,
    ...data
  }: TSignUpStoreParams) {
    const res = await signUp(data);
    if (res.data.token) {
      this.setAxiosHeaders(res.data.token);
      localStorage.setItem("token", res.data.token);
      this.isLoggedIn = true;
      if (successCallBack) successCallBack();
    } else {
      if (failureCallBack) failureCallBack();
      this.isLoggedIn = false;
    }
  }

  async logOut({ successCallBack }: TAuthFunc) {
    this.setAxiosHeaders("");
    localStorage.removeItem("token");
    this.isLoggedIn = false;
    if (successCallBack) {
      successCallBack();
    }
  }

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      check: action,
      logIn: action,
      logOut: action,
    });
    this.check();
  }
}

const authStore = new Auth();
export const AuthStoreContext = React.createContext(authStore);
export const AuthStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <AuthStoreContext.Provider value={authStore}>
      {children}
    </AuthStoreContext.Provider>
  );
};
