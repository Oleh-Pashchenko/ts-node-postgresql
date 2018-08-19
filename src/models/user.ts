import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import { IUserModel } from "../interfaces/user";


export default (sequelize: Sequelize.Sequelize): Sequelize.Model<any, IUserModel> => {
    return sequelize.define<any, IUserModel>("user", {
        username: { type: Sequelize.STRING, unique: true },
        email: { type: Sequelize.STRING, unique: true },
        password: Sequelize.TEXT,
        country: Sequelize.STRING,
        phoneNumber: { type: Sequelize.STRING, unique: true },
        isEmailVerified: Sequelize.BOOLEAN
    }, {
            instanceMethods: {
                generateHash: async (password: string) => {
                    return await bcrypt.hash(password, bcrypt.genSaltSync(8));
                }
            },
            hooks: {
                beforeCreate: (user) => {
                    return user._modelOptions.instanceMethods.generateHash(user.password)
                        .then((hash: string) => {
                            user.password = hash;
                        });
                },
            }
        });
};

