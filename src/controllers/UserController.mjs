import express from "express";
import mysql from "mysql2";
import DBConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const DBConnection = mysql.createConnection(DBConfig);
  DBConnection.connect();
  DBConnection.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) throw err;
      if (result[0])
        return res.json({
          status: "error",
          message: "Email has already been registered",
        });
      else {
        const DBConnection = mysql.createConnection(DBConfig);
        DBConnection.connect();
        const EncryptedPassword = await bcrypt.hash(password, 10);
        DBConnection.query(
          "INSERT INTO users SET ?",
          {
            username: username,
            email: email,
            password: EncryptedPassword,
          },
          (error, results) => {
            if (error) throw error;
            return res.json({
              status: "success",
              message: "Registration successful",
            });
          }
        );
        DBConnection.end();
      }
    }
  );
  DBConnection.end();
};
