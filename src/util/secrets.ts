import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
if (prod) {
    logger.debug("Using .env.prod file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.stage file to supply config environment variables");
    dotenv.config({ path: ".env.stage" });  // you can delete this after you create your own .env file!
}

export const SESSION_SECRET = process.env["SESSION_SECRET"];


export const NODEMAILER_SERVICE = process.env["NODEMAILER_SERVICE"];

export const NODEMAILER_USER = process.env["NODEMAILER_USER"];

export const NODEMAILER_PASSWORD = process.env["NODEMAILER_PASSWORD"];
export const POSTGRESQL_URI = prod ? process.env["POSTGRESQL_URI"] : process.env["POSTGRESQL_URI"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

