import winston from "winston";
import { getDateTimeNowLocaleString } from "./DateTimeUtil.mjs";

const customFormat = winston.format.printf(({ level, message }) => {
  return `${getDateTimeNowLocaleString()} | [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  // format: winston.format.combine(
  //   winston.format.timestamp(),
  //   winston.format.simple()
  // ),
  format: winston.format.combine(
    // winston.format.timestamp({
    //   format: 'YYYY-MM-DD HH:mm:ss' // Customize the timestamp format
    // }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});