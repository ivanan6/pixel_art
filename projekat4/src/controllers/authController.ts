import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
// import { createAPIError } from "@/utils/createAPIError";
import { createAPIError } from "../utils/createAPIError";
const User = require('../models/User')

const users: any[] = [];
const jwt_secret = process.env.ACCESS_TOKEN_SECRET;
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const postojeci = await User.findOne({username})
    if(postojeci) throw createAPIError("DUPLICATE_USERNAME", null, 400);

    // if (users.find((u) => u.username === username)) {
    //   throw createAPIError("DUPLICATE_USERNAME", null, 400);
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const user = { id: uuidv4(), username, password: hashedPassword };
    // users.push(user);
    const noviUser = new User({id: uuidv4(), username:username, password: hashedPassword})
    await noviUser.save()
    res.status(201).json({ failed: false, user_id: noviUser.id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    // const user = users.find((u) => u.username === username);
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   throw createAPIError("INCORRECT_CREDENTIALS", null, 401);
    // }

    const user = await User.findOne({username})
    console.log(user)
    if(!user) throw createAPIError("INCORRECT_CREDENTIALS", null, 400);

    const istaSiftra = await bcrypt.compare(password, user.password)
    console.log(istaSiftra);
    if(!istaSiftra) throw createAPIError("INCORRECT_CREDENTIALS", null, 400);
    console.log(user.id)
    console.log(user.password)
    const token = jwt.sign({ userId: user.id, username:username }, jwt_secret, {
      expiresIn: "1h",
    });

    res.json({ failed: false, token:token, user_id: user.id, username });
  } catch (err) {
    next(err);
  }
};