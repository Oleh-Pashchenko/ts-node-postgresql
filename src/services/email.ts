import nodemailer from "nodemailer";
import { IMail } from "../interfaces/mail";
import {
  NODEMAILER_PASSWORD,
  NODEMAILER_SERVICE,
  NODEMAILER_USER,
  NODEMAILER_HOST
} from "../util/secrets";

const transporter = nodemailer.createTransport({
  service: NODEMAILER_SERVICE,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD
  }
});

class EmailService {
  private static send(mail: IMail): Promise<void> {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          return reject(err);
        }
        else {
          return resolve(info);
        }
      });
    });
  }

  public static async verify(token: string, to: string): Promise<void> {
    const mail: IMail = {
      to: to,
      from: NODEMAILER_USER,
      subject: "Email verification",
      html: `<a href="${NODEMAILER_HOST}api/v1/user/email-verify?token=${token}">Verify</a>`

    };
    return await EmailService.send(mail);
  }

  public static async resetPassword(token: string, to: string): Promise<void> {
    const mail: IMail = {
      to: to,
      from: NODEMAILER_USER,
      subject: "Forgot email",
      html: `<a href="/reset-password?token=${token}">Reset password</a>`

    };
    return await EmailService.send(mail);
  }
}

export default EmailService;
