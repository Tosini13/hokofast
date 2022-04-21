import { Response } from "express";
import User, { IUser, TUser } from "../models/user";
import { IVerifyTokenRequest } from "../middleware/auth";
import { LeanDocument } from "mongoose";
import { EGetUser } from "../models/messages/users";

type TUserData = Omit<TUser, "password" | "token">;

export const convertUser = (user: LeanDocument<IUser>): TUserData => {
  return {
    id: user._id,
    email: user.email,
    nickname: user.nickname,
  };
};

export const getUser = async (req: IVerifyTokenRequest, res: Response) => {
  const currentUser: any = req.currentUser;

  if (!currentUser) {
    return res.status(401).send({ message: EGetUser.UNAUTHORIZED });
  }

  const user = await User.findOne({ _id: currentUser.user_id });
  if (user) {
    res.send(convertUser(user));
  } else {
    res.status(404).send({
      message: EGetUser.USER_DOES_NOT_EXISTS,
    });
  }
};

export const updateUser = async (req: IVerifyTokenRequest, res: Response) => {
  const user: Omit<TUserData, "id"> = {
    email: req.body.email,
  };

  try {
    await User.updateOne({ _id: req.params.id }, user);
    res.send(user);
  } catch (e) {
    res.send(e);
  }
};
