import express from "express";
import mysql from "mysql2";
import DBConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const DBConnection = mysql.createConnection(DBConfig);

  try {
    DBConnection.connect();

    // Check if the email is already registered
    const emailCheck = await new Promise((resolve, reject) => {
      DBConnection.query(
        "SELECT email FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject({ status: "error", message: "Database error" });
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    if (emailCheck) {
      return res.json({
        status: "error",
        message: "Email has already been registered",
      });
    } else {
      // Insert new user
      const EncryptedPassword = await bcrypt.hash(password, 10);
      await new Promise((resolve, reject) => {
        DBConnection.query(
          "INSERT INTO users SET ?",
          {
            username: username,
            email: email,
            password: EncryptedPassword,
          },
          (error, results) => {
            if (error) {
              reject({ status: "error", message: "Database error" });
            } else {
              resolve(results);
            }
          }
        );
      });

      return res.json({
        status: "success",
        message: "Registration successful",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  } finally {
    DBConnection.end();
  }
};
