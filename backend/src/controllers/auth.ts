import { Request, Response } from "express";
import User, { TUser } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Token from "../models/token";
import { addDays, isBefore } from "date-fns";
import nodemailer from "nodemailer";
import {
  ECheckTokenMessage,
  EIsLoggedIn,
  ELogIn,
  EResetPasswordMessage,
  ESetNewPasswordMessage,
} from "../models/messages/auth";
import { convertUser } from "./users";
import { IVerifyTokenRequest } from "../middleware/auth";
import { setError } from "../models/errors";

type TRegisterRes = Omit<TUser, "password">;
type TLoginRes = Omit<TUser, "password">;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nickname } = req.body;

    if (!(email && password)) {
      return res.status(400).send({ message: "All inputs are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send({ message: "Email already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      nickname: nickname,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );

    const userData = convertUser(user);

    const response: TRegisterRes = {
      ...userData,
      token,
    };

    res.status(201).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server has an internal error", error: e });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send(setError("Email and password are required"));
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "10000h",
        }
      );

      const userData = convertUser(user);
      const response: TLoginRes = {
        ...userData,
        token,
      };
      res.status(200).json(response);
    } else {
      res.status(400).send(setError(ELogIn.INVALID_CREDENTIALS));
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(setError("Server has an internal error"));
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .send(setError(EResetPasswordMessage.EMAIL_IS_REQUIRED));
    }

    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "7 days",
        }
      );

      const tokenData = await Token.create({
        token,
        email,
        expireDate: addDays(new Date(), 7),
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Set New Password Link. NO REPLY",
        html: `<h1>Press this link to set new password</h1>
                <a href='${
                  "https://medlineapp.herokuapp.com/check-token?token=" +
                  tokenData.token
                }'>Reset Password</a><br>
                <p>Please do not respond no this email</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          res
            .status(500)
            .send(setError(EResetPasswordMessage.EMAIL_SENT_ERROR));
        } else {
          res.status(200).send({
            message: EResetPasswordMessage.EMAIL_SENT,
            info: info.response,
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(setError(EResetPasswordMessage.INTERNAL_ERROR));
  }
};

export const checkToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const tokenData = await Token.findOne({ token });
    if (
      tokenData?.expireDate &&
      isBefore(new Date(tokenData.expireDate), new Date())
    ) {
      return res
        .status(200)
        .send({ message: ECheckTokenMessage.TOKEN_EXPIRED });
    }

    if (!tokenData) {
      return res
        .status(200)
        .send({ message: ECheckTokenMessage.TOKEN_INVALID });
    }

    res.status(200).send({ message: ECheckTokenMessage.TOKEN_VALID });
  } catch (e) {
    console.error(e);
    res.status(500).send(setError("Server has an internal error"));
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res
        .status(400)
        .send(setError(ESetNewPasswordMessage.TOKEN_IS_REQUIRED));
    }
    if (!password) {
      return res
        .status(400)
        .send(setError(ESetNewPasswordMessage.PASSWORD_IS_REQUIRED));
    }

    const tokenData = await Token.findOne({ token });

    if (!tokenData) {
      return res
        .status(400)
        .send(setError(ESetNewPasswordMessage.TOKEN_INVALID));
    }

    if (
      tokenData.expireDate &&
      isBefore(new Date(tokenData.expireDate), new Date())
    ) {
      await Token.deleteOne({ token });
      return res
        .status(400)
        .send(setError(ESetNewPasswordMessage.TOKEN_EXPIRED));
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { email: tokenData.email },
      {
        password: encryptedPassword,
      }
    );
    if (!user) {
      return res
        .status(400)
        .send(setError(ESetNewPasswordMessage.USER_DOES_NOT_EXISTS));
    }
    await Token.deleteOne({ token });
    res.status(200).send({ message: ESetNewPasswordMessage.NEW_PASSWORD_SET });
  } catch (e) {
    console.error(e);
  }
};

export const isLoggedIn = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser: any = req.currentUser;

  if (currentUser) {
    res.send({
      message: EIsLoggedIn.LOGGED_IN,
    });
  } else {
    res.send({
      message: EIsLoggedIn.LOGGED_OUT,
    });
  }
};
