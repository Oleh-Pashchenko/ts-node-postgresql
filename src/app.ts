import express, { Request, Response, NextFunction } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";
import passport from "passport";
import expressValidator from "express-validator";
import validator from "./controllers/validatort";
import "express-async-errors";
dotenv.config({ path: ".env.stage" });
// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(validator);
fs.readdirSync(__dirname + "/routes")
  .forEach((file: string) => {
    if (file === "index.js") {
      return app.use("/", require(`${__dirname}/routes/${file}`));
    }

    if (!file.includes(".map") && !file.includes("index"))
      return app.use("/api/v1/" + file.replace(".js", ""), require(`${__dirname}/routes/${file}`).default);
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(501);
  res.json({
    message: err.message,
  });
});

process
  .on("unhandledRejection", (reason: NodeJS.UnhandledRejectionListener, p: any) => {
    logger.error(reason.toString(), "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err: Error) => {
    logger.error(err.message, "Uncaught Exception thrown");
    process.exit(1);
  });


export default app;