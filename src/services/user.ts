import DatabaseService from "./db";
import jwt from "jsonwebtoken";
import { IUserModel } from "../interfaces/user";
import { SESSION_SECRET } from "../util/secrets";
import { IJWT } from "../interfaces/jwt";
import { ILogin } from "../interfaces/login";
import { IPasswordReset } from "../interfaces/passwordReset";
import { IPasswordForgot } from "../interfaces/passwordForgot";
import Sequelize from "sequelize";
import EmailService from "../services/email";
import BcryptService from "../services/bcrypt";

class UserService {
  public static async create(user: IUserModel): Promise<IJWT> {
    const userInstance: Sequelize.Instance<IUserModel> = await DatabaseService.models.user.create(user);
    const userData = userInstance;
    const userId = userData.getDataValue("id");
    const userEmail = userData.getDataValue("email");
    const emailVerification = UserService.generateToken(userId);

    await EmailService.verify(emailVerification, userEmail);

    return UserService.generateJWT((userData as any).dataValues);
  }

  public static async login(login: ILogin): Promise<any> {
    const userInstance: Sequelize.Instance<IUserModel> =
      await DatabaseService.models.user.findOne({ where: { username: login.username } });
    const userData = (userInstance as any).dataValues;
    const res = await BcryptService.validPassword(login.password, userData.password);
    if (res) {
      return UserService.generateJWT((userData as any).dataValues);
    }

    throw new Error("Wrong password");
  }

  public static async passwordReset(userInstance: Sequelize.Instance<IUserModel>, password: IPasswordReset): Promise<IUserModel> {
    const userId = userInstance.getDataValue("id");
    const userData = (userInstance as any).dataValues;
    const res = BcryptService.validPassword(password.oldPassword, userData.password);
    if (res) {
      userData.password = BcryptService.generateHash(password.newPassword);
      return UserService.update(userId, userData);
    }
    throw new Error("Wrong old password");
  }

  public static async passwordForgot(email: string): Promise<void> {
    const userInstance: Sequelize.Instance<IUserModel> =
      await DatabaseService.models.user.findOne({ where: { email: email } });
    if (userInstance) {
      const token = UserService.generateToken(email);
      return EmailService.resetPassword(token, email);
    }

    throw new Error(`User not found by email: ${email}`);
  }

  public static async passwordUpdate(token: string, password: IPasswordForgot): Promise<IUserModel> {
    const email = jwt.verify(token, SESSION_SECRET);
    const userInstance: Sequelize.Instance<IUserModel> =
      await DatabaseService.models.user.findOne({ where: { email: email } });

    if (userInstance) {
      const userId = userInstance.getDataValue("id");
      const userData = (userInstance as any).dataValues;
      userData.password = BcryptService.generateHash(password.newPassword);
      return UserService.update(userId, userData);
    }

    throw new Error(`User not found by email: ${email}`);
  }

  public static async read(id: number): Promise<IUserModel> {
    return await DatabaseService.models.user.findOne({ where: { id: id } });
  }

  public static async collectData(id: number): Promise<{ user: IUserModel }> {
    const user = await DatabaseService.models.user.findOne({ where: { id: id } });
    return {
      user
    };
  }

  public static async update(id: number, user: IUserModel): Promise<IUserModel> {
    return await DatabaseService.models.user.update(user, { where: { id: id }, returning: true, plain: true });
  }

  public static async delete(id: number): Promise<IUserModel> {
    return await DatabaseService.models.user.destroy({ where: { id: id } });
  }

  public static async emailVerification(token: string): Promise<IUserModel> {
    const verified: number = +jwt.verify(token, SESSION_SECRET);

    const user = await UserService.read(verified);

    user.isEmailVerified = true;
    return await UserService.update(verified, (user as any).dataValues);
  }

  public static generateToken(data: string): string {
    return jwt.sign(data, SESSION_SECRET, {
      // expiresIn: 60
    });
  }

  public static generateJWT(userData: Sequelize.Instance<IUserModel>): IJWT {
    const token = jwt.sign(userData, SESSION_SECRET, {
      expiresIn: "7d"
    });
    const refreshToken = jwt.sign(userData, SESSION_SECRET, {
      expiresIn: "1y"
    });

    const accessTokenExpiredAt = (jwt.decode(token) as any).exp;

    return { token, refreshToken, accessTokenExpiredAt };
  }

  public static async refreshToken(refreshToken: string): Promise<IJWT> {
    const verified = jwt.verify(refreshToken, SESSION_SECRET);
    const user: any = await UserService.read(+(verified as any).id);
    if (!user) throw new Error("401");

    return UserService.generateJWT(user.dataValues);
  }
}

export default UserService;
