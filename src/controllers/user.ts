import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user";
import { SESSION_SECRET } from "../util/secrets";

export const postCreate = async (req: Request, res: Response) =>
  res.json(await UserService.create(req.body));

export const postLogin = async (req: Request, res: Response) =>
  res.json(await UserService.login(req.body));

export const getRead = async (req: Request, res: Response) =>
  res.json(await UserService.read(req.params.user.id));

export const getCollectedData = async (req: Request, res: Response) =>
  res.json(await UserService.collectData(req.params.user.id));

export const putUpdate = async (req: Request, res: Response) =>
  res.json(await UserService.update(req.params.user.id, req.body));
export const putPasswordReset = async (req: Request, res: Response) =>
  res.json(await UserService.passwordReset(req.params.user.id, req.body));

export const postPasswordForgot = async (req: Request, res: Response) =>
  res.json(await UserService.passwordForgot(req.body.email));

export const putPasswordForgot = async (req: Request, res: Response) =>
  res.json(await UserService.passwordUpdate(req.body.token, req.body));

export const deleteUser = async (req: Request, res: Response) =>
  res.json(await UserService.delete(+req.params.user.id));

export const getEmailVerify = async (req: Request, res: Response) =>
  res.json(await UserService.emailVerification(req.query.token));

export const postRefreshToken = async (req: Request, res: Response) =>
  res.json(await UserService.refreshToken(req.body.refreshToken));

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.status(401).send();

    const token = req.headers.authorization.replace("Bearer ", "");
    const verified = jwt.verify(token, SESSION_SECRET);

    const user: any = await UserService.read(+(verified as any).id);

    if (!user) return res.status(401).send("User not found");

    req.params.user = user.dataValues;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};