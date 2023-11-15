import express from "express";
import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local`, override: true });


export const register = async (req, res) => {
  const dbConnection = mysql.createConnection(dbConfig);
  const { username, email, password } = req.body;
  try {
    dbConnection.connect();
    const emailCheck = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT email FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject({ message: "Database error", status: 500 });
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    if (emailCheck) {
      return res.json({
        message: "Email has already been registered",
        status: 400,
      });
    } else {
      const EncryptedPassword = await bcrypt.hash(password, 10);
      await new Promise((resolve, reject) => {
        dbConnection.query(
          "INSERT INTO users SET ?",
          {
            username: username,
            email: email,
            password: EncryptedPassword,
          },
          (error, results) => {
            if (error) {
              reject({ message: "Database error", status: 500 });
            } else {
              resolve(results);
            }
          }
        );
      });
      return res.json({
        message: "Registration successful",
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json({
      message: "Internal server error",
      status: 500,
    });
  } finally {
    dbConnection.end();
  }
};


export const login = async (req, res) => {
  const dbConnection = mysql.createConnection(dbConfig);
  const { email, password } = req.body;
  dbConnection.connect();
  try {
    const userResult = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject({ status: 500, message: "Database error" });
          } else {
            resolve(result);
          }
        }
      );
    });
    if (
      !userResult.length ||
      !(await bcrypt.compare(password, userResult[0].password))
    ) {
      return res.json({
        status: 400,
        message: "Incorrect Email or Password",
      });
    } else {
      // Generate a new token for the user
      let userToken = crypto.randomBytes(64).toString("hex");
      await new Promise((resolve, reject) => {
        dbConnection.query(
          "UPDATE users SET token = ? WHERE email = ?",
          [userToken, email],
          (err, result) => {
            if (err) {
              reject({ status: 500, message: "Database error" });
            } else {
              resolve(result);
            }
          }
        );
      });

      // Create a JWT token and set it as a cookie
      const token = jwt.sign(
        { id: userResult[0].id, token: userToken },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );
      console.log("jwt secret: ", process.env.JWT_EXPIRES);
      const cookieOptions = {
        expiresIn: new Date(process.env.JWT_EXPIRES),
        httpOnly: false,
      };
      console.log("token: ", token);
      console.log("cookieOptions: ", cookieOptions);
      return res
        .cookie("userData", token, cookieOptions)
        .json({ message: "Login successful!", status: 200 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error",
    });
  } finally {
    dbConnection.end();
  }
};



