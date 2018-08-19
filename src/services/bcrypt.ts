import bcrypt from "bcrypt";

class BcryptService {
  public static async generateHash(password: string) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(8));
  }

  public static async validPassword(password: string, encrypted: string) {
    return await bcrypt.compare(password, encrypted);
  }
}

export default BcryptService;
