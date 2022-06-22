import { Request, Response } from "express";

import User from "../models/Admin.model";
import {
  createAccessToken,
  createRefreshToken,
  createToken,
} from "../utils/token";
const bcrypt = require("bcryptjs");

export default {
  signup: async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
      const user = new User(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user._id);

      user._doc.password = undefined;
      res.status(200).send({
        user: user._doc,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      let err = error.message;
      if (error.code === 11000) {
        err = "Email must be unique";
      }
      res.status(500).send({ err });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .send({ success: false, msg: "Account not found" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(401).send({ msg: "Incorrect password" });

      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user._id);
      user._doc.password = undefined;
      res
        .status(200)
        .send({ success: true, user: user._doc, accessToken, refreshToken });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
