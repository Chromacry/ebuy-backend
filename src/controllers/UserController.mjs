import express from "express";
import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "../constants/GlobalConstants.mjs";

import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
dotenv.config({ path: `.env.local`, override: true });

export const register = async (req, res) => {
  const dbConnection = mysql.createConnection(dbConfig);
  const { username, email, password } = req.body;

  try {
    // Validation checks
    if (!username || !email || !password) {
      return res.json({
        message: "Username, email, and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        message: "Invalid email format!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    dbConnection.connect();

    const emailCheck = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT email FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject({ message: "Database error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    if (emailCheck) {
      return res.json({
        message: "Email has already been registered!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
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
            created_time: getDateTimeNowLocalISOString(), // Add the created_time field with the formatted date
          },
          (error, results) => {
            if (error) {
              reject({ message: "Database error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
            } else {
              resolve(results);
            }
          }
        );
      });

      return res.json({
        message: "Registration successful!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json({
      message: "Internal server error!",
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
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
    // Validation checks
    if (!email || !password) {
      return res.json({
        message: "Email and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        message: "Invalid email format!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const userResult = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject({ message: "Database error!" ,status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE});
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
        message: "Incorrect Email or Password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    } else {
      let userToken = crypto.randomBytes(64).toString("hex");
      await new Promise((resolve, reject) => {
        dbConnection.query(
          "UPDATE users SET token = ? WHERE email = ?",
          [userToken, email],
          (err, result) => {
            if (err) {
              reject({ message: "Database error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
            } else {
              resolve(result);
            }
          }
        );
      });

      const token = jwt.sign(
        { id: userResult[0].id, token: userToken },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );

      return res.json({
        message: "Login successful!",
        status: STATUS_CODES.SUCCESS_CODE,
        token: token,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  } finally {
    dbConnection.end();
  }
};

export const getUser = async (req, res) => {
  const storedToken = req.headers.token;

  if (!storedToken) {
    return res.status(401).json({
      message: "Unauthorized: Token not found in request headers!",
      status: STATUS_CODES.UNAUTHORIZED_CODE,
    });
  }

  const dbConnection = mysql.createConnection(dbConfig);

  try {
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    dbConnection.connect();

    const result = await new Promise((resolve, reject) => {
      dbConnection.query(
        "SELECT username, email, profile_image, id, created_time FROM users WHERE id = ? AND token = ?",
        [decoded.id, decoded.token],
        (err, result) => {
          if (err) {
            reject({ message: "Database error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
          } else {
            resolve(result);
          }
        }
      );
    });

    return res.json({
      username: result[0].username,
      profile_image: result[0].profile_image,
      email: result[0].email,
      id: result[0].id,
      created_time: result[0].created_time,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token or user not found!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    console.error("Error in getUser:", error);
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  } finally {
    dbConnection.end();
  }
};




export const passwordReset = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  // Validation checks
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.json({
      message: "All fields are required!",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  }

  if (newPassword !== confirmPassword) {
    return res.json({
      message: "New password and confirm password do not match!",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  }

  const dbConnection = mysql.createConnection(dbConfig);
  dbConnection.connect();

  dbConnection.query(
    "SELECT * FROM users WHERE id = ? AND token = ?",
    [decoded.id, decoded.token],
    async (Err, result) => {
      if (Err) throw Err;

      if (
        !result.length ||
        !(await bcrypt.compare(currentPassword, result[0].password))
      ) {
        return res.json({ message: "Incorrect Entries!", status: STATUS_CODES.BAD_REQUEST_CODE });
      } else {
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        dbConnection.query(
          "UPDATE users SET password = ? WHERE id = ?",
          [hashedPassword, decoded.id],
          async (err, result) => {
            if (err) throw err;
          }
        );
        dbConnection.end();

        return res.json({
          message: "Password Reset Successfully!",
          status: STATUS_CODES.SUCCESS_CODE,
        });
      }
    }
  );
  dbConnection.end();
};
  
export const updateUsername = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
  const username = req.body.username;

  // Validation check
  if (!username) {
    return res.json({
      message: "Username cannot be empty!",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  }

  const dbConnection = mysql.createConnection(dbConfig);
  dbConnection.connect();
  dbConnection.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ username }, decoded.id],
    async (err, result) => {
      if (err) throw res.json({ message: "Username update error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
      if (result) return res.json({ message: "Username updated successfully!", status: STATUS_CODES.SUCCESS_CODE });
    }
  );
  dbConnection.end();
};

export const updateProfileImage = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
  const profile_image = req.body.profileImg;

  // Validation check
  if (!profile_image) {
    return res.json({
      message: "Profile image cannot be empty!",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  }
  const dbConnection = mysql.createConnection(dbConfig);
  dbConnection.connect();
  dbConnection.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ profile_image }, decoded.id],
    async (err, result) => {
      if (err) throw res.json({ message: "Profile image update error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
      if (result) return res.json({ message: "Profile image updated successfully! ", status: STATUS_CODES.SUCCESS_CODE });
    }
  );
  dbConnection.end();
};
  
export const deleteAccount = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
  const dbConnection = mysql.createConnection(dbConfig);
  dbConnection.connect();
  dbConnection.query(
    "DELETE FROM users WHERE id = ? AND token = ?",[decoded.id, decoded.token],
    async (err, result) => {
      if (err) throw res.json({ message: "Internal Server Error!", status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE });
      if (result) return res.json({ message: "Account Deleted Successfully!", status: STATUS_CODES.SUCCESS_CODE });
    }
  );
  dbConnection.end();
};

