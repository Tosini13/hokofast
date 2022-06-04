import React from "react";
import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { logIn as signIn, TLogInParams } from "../models/api/login";
import { signUp, TSignUpParams } from "../models/api/signup";
import { isLoggedIn } from "../models/api/isLoggedIn";
import { EIsLoggedIn } from "../models/backend";
import { LOGIN_API_URL } from "../models/endpoints";
import { Id } from "../types/utils";

type TAuthFunc = {
  successCallBack?: () => void;
  failureCallBack?: (e?: string) => void;
};

export type TLogInStoreParams = TLogInParams & TAuthFunc;
export type TSignUpStoreParams = TSignUpParams & TAuthFunc;

class Auth {
  isLoggedIn: boolean | undefined;
  userId: Id | null;

  setAxiosHeaders(AUTH_TOKEN: string) {
    axios.defaults.headers.common["x-access-token"] = AUTH_TOKEN;
  }

  async check() {
    const token = localStorage.getItem("token") ?? "";

    if (!token) {
      this.isLoggedIn = false;
      this.userId = null;
      return;
    }

    try {
      const res = await isLoggedIn({ token });
      this.setAxiosHeaders(token);
      if (res.data.message === EIsLoggedIn.LOGGED_IN) {
        this.isLoggedIn = true;
        this.userId = res.data.userId;
      } else {
        this.isLoggedIn = false;
        this.userId = null;
      }
    } catch (e) {
      this.isLoggedIn = false;
      this.userId = null;
    }
  }

  async logIn({ email, password, failureCallBack }: TLogInStoreParams) {
    try {
      const res = await signIn({ email, password });
      if (res.data.token) {
        this.setAxiosHeaders(res.data.token);
        localStorage.setItem("token", res.data.token);
        this.isLoggedIn = true;
        this.userId = res.data.id;
      }
    } catch (e) {
      console.error("e", e);
      if (failureCallBack)
        failureCallBack(`URL: ${LOGIN_API_URL} ZLE: ${JSON.stringify(e)}`);
      this.isLoggedIn = false;
      this.userId = null;
    }
  }

  async signUp({
    failureCallBack,
    successCallBack,
    ...data
  }: TSignUpStoreParams) {
    try {
      const res = await signUp(data);
      if (res.data.token) {
        this.setAxiosHeaders(res.data.token);
        localStorage.setItem("token", res.data.token);
        this.isLoggedIn = true;
        if (successCallBack) successCallBack();
      }
    } catch (e) {
      console.error("e", e);
      if (failureCallBack) failureCallBack();
      this.isLoggedIn = false;
      this.userId = null;
    }
  }

  async logOut({ successCallBack }: TAuthFunc) {
    this.setAxiosHeaders("");
    localStorage.removeItem("token");
    this.isLoggedIn = false;
    this.userId = null;
    if (successCallBack) {
      successCallBack();
    }
  }

  constructor() {
    makeObservable(this, {
      isLoggedIn: observable,
      userId: observable,
      check: action,
      logIn: action,
      logOut: action,
    });
    this.check();
    this.userId = null;
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
