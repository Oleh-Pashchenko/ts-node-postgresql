import { POSTGRESQL_URI } from "../util/secrets";
import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

class DatabaseService {
  private sequelize: Sequelize.Sequelize;
  public models: any = {};
  constructor(connectionString: string) {
    this.sequelize = new Sequelize(connectionString, {
      logging: false
    });

    fs
      .readdirSync(__dirname + "/../models")
      .filter(file => {
        return (file.indexOf(".") !== 0) && (file.slice(-3) === ".js" || file.slice(-3) === ".ts");
      })
      .forEach(file => {
        const model = this.sequelize["import"](path.join(__dirname, "/../models", file));
        this.models[model.name] = model;
      });

    Object.keys(this.models).forEach(modelName => {
      if (this.models[modelName].associate) {
        this.models[modelName].associate(this.models);
      }
    });
    this.sequelize.sync({
      // force: true
    });
  }

  public async syncDB(): Promise<void> {
    await this.sequelize.sync({
      force: true
    });
  }
}

export default new DatabaseService(POSTGRESQL_URI);
