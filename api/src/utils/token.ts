import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../types/Request.types";
const jwt = require("jsonwebtoken");

export const createToken = (
  body: any,
  secret: string,
  expiresIn: string | number
) => {
  return jwt.sign({ body }, secret, {
    expiresIn,
  });
};

export const createAccessToken = (body: any) => {
  return jwt.sign({ body }, `${process.env.ACCESS_SECRET}`, {
    expiresIn: "30m",
  });
};

export const createRefreshToken = (body: any) => {
  return jwt.sign({ body }, `${process.env.REFRESH_SECRET}`, {
    expiresIn: "7d",
  });
};

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["access-token"] as string;
  if (!authHeader) return res.status(403).send({ error: "Unauthenticated" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).send({ error: "Invalid Token" });
    console.log(user);
    req.user = user.body;
    next();
  });
};
