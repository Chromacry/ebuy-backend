import express from "express";
import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const dbConnection = mysql.createConnection(dbConfig);

  try {
    dbConnection.connect();

    // Check if the email is already registered
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
      // Insert new user
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
