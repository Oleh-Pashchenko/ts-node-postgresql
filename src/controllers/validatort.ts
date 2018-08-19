import { Request, Response, NextFunction } from "express";
import validator from "../util/validator";
export default (req: Request, res: Response, next: NextFunction) => {
  const validatorMethods = (validator as any)[req.path];
  if (validatorMethods) {
    const validatorMethod = validatorMethods[req.method.toLowerCase()];
    if (validatorMethod) {
      const errors = validatorMethod(req);
      if (errors) {
        return res.status(402).send(errors[0]);
      }
    }
  }

  return next();
};