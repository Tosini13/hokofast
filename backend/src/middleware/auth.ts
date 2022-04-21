import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EVerifyTokenMessage } from "../models/messages/auth";
const config = process.env;

export interface IVerifyTokenRequest extends Request {
  currentUser?: string | jwt.JwtPayload;
}

export const verifyToken = (
  req: IVerifyTokenRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] || req.body.token;

  if (!token) {
    return res
      .status(403)
      .send({ message: "Token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token as string, config.TOKEN_KEY as string);

    req.currentUser = decoded;
  } catch (e) {
    console.error(e);
    console.error("AUTH! INVALID TOKEN");
    return res.status(200).send({ message: EVerifyTokenMessage.TOKEN_INVALID });
  }
  return next();
};
