import { Request } from "express";
import { Dictionary, MappedError } from "express-validator/shared-typings";

export default {
  "/api/v1/user/": {
    "post": (req: Request): Dictionary<MappedError> | MappedError[] => {
      req.assert("username", "username cannot be blank").notEmpty();
      req.assert("email", "email is not valid").isEmail();
      req.assert("password", "password cannot be blank").notEmpty();
      req.assert("passwordConfirmation", "passwordConfirmation cannot be blank").notEmpty();
      req.assert("country", "country cannot be blank").notEmpty();
      req.assert("phoneNumber", "phoneNumber cannot be blank").notEmpty();
      req.assert("passwordConfirmation", "Passwords do not match").equals(req.body.password);

      return req.validationErrors();
    }
  },
  "/api/v1/user/login": {
    "post": (req: Request): Dictionary<MappedError> | MappedError[] => {
      req.assert("username", "username cannot be blank").notEmpty();
      req.assert("password", "password cannot be blank").notEmpty();

      return req.validationErrors();
    }
  }
};