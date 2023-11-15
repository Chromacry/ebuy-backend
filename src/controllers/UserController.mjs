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

      const token = jwt.sign(
        { id: userResult[0].id, token: userToken },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );

      return res.json({
        message: "Login successful!",
        status: 200,
        token: token, // Include the token in the response
      });
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

export const getUser = async (req, res) => {
  const storedToken = req.headers.token; // Retrieve token from request headers

  if (!storedToken) {
    return res.json({
      status: 401,
      message: "Unauthorized: Token not found in request headers",
    });
  }

  const dbConnection = mysql.createConnection(dbConfig);

  try {
    const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
    console.log("Decoded id: ", decoded.id);
    console.log("Decoded token: ", decoded.token);

    dbConnection.connect();

    dbConnection.query(
      "SELECT username, email, profile_image, id FROM users WHERE id = ? AND token = ?",
      [decoded.id, decoded.token], // Use the stored token in the query
      async (Err, result) => {
        if (Err) {
          console.error("Error querying database:", Err);
          return res.status(500).json({
            status: 500,
            message: "Internal server error",
          });
        }

        if (!result.length) {
          return res.json({
            status: 401,
            message: "Unauthorized: Invalid token or user not found",
          });
        }

        return res.json({
          username: result[0].username,
          profile_image: result[0].profile_image,
          email: result[0].email,
          id: result[0].id,
        });
      }
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: Invalid token",
    });
  } finally {
    dbConnection.end();
  }
};

export const passwordReset = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
  let currentPassword = req.body.currentPassword;
  let newPassword = req.body.newPassword;
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
      )
        return res.json({ message: "Incorrect Entries", status: 400 });
      else {
          const dbConnection = mysql.createConnection(dbConfig);
          dbConnection.connect();
          const hashed_password = await bcrypt.hash(newPassword, 10);
          dbConnection.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashed_password, decoded.id],
            async (err, result) => {
              if (err) throw err;
            }
          );
          dbConnection.end();

          return res.json({
            status: 200,
            Message: "Password Reset Successful",
          });
        
      }
    }
  );
  dbConnection.end();
};

export const updateUsername = async (req, res) => {
  const storedToken = req.headers.token;
  const decoded = await jwt.verify(storedToken, process.env.JWT_SECRET);
    let username = req.body.username;
    const dbConnection = mysql.createConnection(dbConfig);
    dbConnection.connect();
    dbConnection.query(
      "UPDATE users SET? WHERE id = ?",[{username},decoded.id],
      async (err, result) => {
        if (err) throw res.json({ message: "updateUsername Error", status: 400 });
        if (result) return res.json({ message: "updateUsername Success", status: 200 });
      }
    );
    dbConnection.end();
  };
