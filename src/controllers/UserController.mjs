import express from "express";
import mysql from "mysql2";
import dbConfig from "../utils/DBConfig.mjs";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { UserDao } from "../dao/UserDao.mjs";
import { User } from "../models/UserModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
dotenv.config({ path: `.env.local`, override: true });

export const register = async (req, res) => {
  const userDao = new UserDao();
  const { username, email, password } = req.body;

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
  try {
    const model = new User(
      null,
      username,
      email,
      null,
      null,
      false,
      null,
      getDateTimeNowLocalISOString()
    );
    const emailExists = await userDao.checkEmailExists(model);
    if (emailExists) {
      return res.json({
        message: "Email has already been registered!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    model.setPassword(hashedPassword);
    await userDao.addUser(model);

    return res.json({
      message: "Registration successful!",
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json({
      message: "Internal server error!",
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const login = async (req, res) => {
  const userDao = new UserDao();
  const { email, password } = req.body;

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

  try {
    const model = new User(null, null, email);
    const user = await userDao.getUserByEmail(model);
    if (user == 0) {
      return res.json({
        message: "Incorrect Email or Password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }
    if (!(await bcrypt.compare(password, user[0].password))) {
      return res.json({
        message: "Incorrect Email or Password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const userToken = crypto.randomBytes(64).toString("hex");
    model.setToken(userToken);
    model.setId(user[0].id);
    await userDao.updateUserToken(model);

    const token = jwt.sign(
      { id: user[0].id, token: userToken },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.json({
      message: "Login successful!",
      status: STATUS_CODES.SUCCESS_CODE,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};

export const getUser = async (req, res) => {
  const userDao = new UserDao();
  const storedToken = req.headers.token;

  if (!storedToken) {
    return res.status(401).json({
      message: "Unauthorized: Token not found in request headers!",
      status: STATUS_CODES.UNAUTHORIZED_CODE,
    });
  }

  try {
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const model = new User(decoded.id, null, null, null, decoded.token);
    const user = await userDao.getUserByIdAndToken(model);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token or user not found!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }

    return res.json({
      username: user[0].username,
      profile_image: user[0].profile_image,
      email: user[0].email,
      id: user[0].id,
      created_time: user[0].created_time,
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
  }
};

export const passwordReset = async (req, res) => {
  const storedToken = req.headers.token;
  const userDao = new UserDao();

  try {
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    // Validation checks...
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

    if (currentPassword === newPassword) {
      return res.json({
        message: "New password must be different from the current password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const model = new User(decoded.id, null, null, null, decoded.token);
    const user = await userDao.getUserByIdAndToken(model);
    if (!user || !(await bcrypt.compare(currentPassword, user[0].password))) {
      return res.json({
        message: "Incorrect Entries!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    model.setEmail(user[0].id);
    model.setPassword(hashedPassword);
    await userDao.updateUserPassword(model);

    return res.json({
      message: "Password Reset Successfully!",
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    // Handling JWT Token Decoding Error
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }

    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};

export const updateUsername = async (req, res) => {
  const userDao = new UserDao();

  try {
    const storedToken = req.headers.token;
    const newUsername = req.body.username;
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const model = new User(decoded.id, null, null, null, decoded.token);

    // Validation check for empty username
    if (!newUsername) {
      return res.json({
        message: "Username cannot be empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const currentUser = await userDao.getUserByIdAndToken(model);

    if (currentUser.length > 0 && currentUser[0].username === newUsername) {
      return res.json({
        message: "New username cannot be the same as the current username!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    model.setId(decoded.id);
    model.setUsername(newUsername);
    await userDao.updateUsername(model);

    return res.json({
      message: "Username updated successfully!",
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};

export const updateProfileImage = async (req, res) => {
  const userDao = new UserDao();
  const storedToken = req.headers.token;

  try {
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const profileImage = req.body.profileImg;

    // Validation check
    if (!profileImage) {
      return res.json({
        message: "Profile image cannot be empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    const model = new User(
      decoded.id,
      null,
      null,
      null,
      decoded.token,
      null,
      profileImage,
      null
    );
    await userDao.updateProfileImage(model);

    return res.json({
      message: "Profile image updated successfully!",
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    // Handling JWT Token Decoding Error
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }

    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};


export const updateUserToSeller = async (req, res) => {
  const userDao = new UserDao();

  try {
    const storedToken = req.headers.token;
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const model = new User(decoded.id, null, null, null, decoded.token);

    const currentUser = await userDao.getUserByIdAndToken(model);

    if (currentUser.length > 0 && currentUser[0].is_seller === 1) {
      return res.json({
        message: "User account is already a seller!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }

    model.setId(decoded.id);
    model.setIsSeller(1);
    await userDao.updateUserToSeller(model);

    return res.json({
      message: "User updated as seller successfully!",
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};

export const deleteAccount = async (req, res) => {
  const userDao = new UserDao();
  const storedToken = req.headers.token;

  try {
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const model = new User(decoded.id, null, null, null, decoded.token);

    const result = await userDao.deleteUser(model);

    if (result.affectedRows > 0) {
      return res.json({
        message: "Account Deleted Successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token, user not found!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    console.error("Error in deleteAccount:", error);
    return res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Internal server error!",
    });
  }
};
