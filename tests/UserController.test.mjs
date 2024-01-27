import chai, { expect, use } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";
import {
  register,
  login,
  getUser,
  deleteAccount,
  passwordReset,
  updateUsername,
  updateProfileImage
} from "../src/controllers/UserController.mjs";

describe("UserController", function () {
  this.timeout(4000);
  let mockReq, mockRes, response, status, token;

  let username = "testuser";
  let email = "mochaTest@gmail.com";
  let password = "Password123";
  let invalidEmailFormat = "invalidemailformat";
  let wrongEmail =  "test@example.com";
  let wrongPassword ="wrongPassword";
  let invalidToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvZSBCbG9nZ3MiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  beforeEach(() => {
    response = {};
    status = null;
    mockReq = {};
    mockRes = {
      json: (resObj) => {
        response = resObj;
      },
      status: (code) => {
        status = code;
        return {
          json: (resObj) => {
            response = resObj;
          },
        };
      },
    };
  });

  describe("register", () => {
    it("should return an error for missing required fields! (username)", async () => {
      mockReq.body = {
        username: "",
        email: email,
        password: password,
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username, email, and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should return an error for missing required fields! (email)", async () => {
      mockReq.body = {
        username: username,
        email: "",
        password: password,
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username, email, and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should return an error for missing required fields! (passw  ord)", async () => {
      mockReq.body = {
        username: username,
        email: email,
        password: "",
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username, email, and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for invalid email format", async () => {
      mockReq.body = {
        username: username,
        email: invalidEmailFormat,
        password: password,
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Invalid email format!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    // Test for successful registration
    it("should successfully register a user", async () => {
      mockReq.body = {
        username: username,
        email: email,
        password: password,
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Registration successful!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    })
    it("should return an error for duplicate email registration", async () => {
      mockReq.body = {
        username: username,
        email: email,
        password: password,
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Email has already been registered!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });
  describe("login", () => {
    it("should return an error for missing email or password! (email)", async () => {
      mockReq.body = {
        email: "",
        password: password,
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Email and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for missing email or password! (password)", async () => {
      mockReq.body = {
        email: email,
        password: "",
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Email and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for invalid email format", async () => {
      mockReq.body = {
        email: invalidEmailFormat,
        password: password,
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Invalid email format!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for incorrect email or password", async () => {
      mockReq.body = {
        email: wrongEmail,
        password: wrongPassword,
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Incorrect Email or Password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should successfully log in a user", async () => {
      mockReq.body = {
        email: email,
        password: password,
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Login successful!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
      expect(response).to.have.property("token");
      token = response.token;
    });
  });
  describe("getUser", () => {
    it("should return an error if token is not provided", async () => {
      mockReq.headers = {};
      await getUser(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Unauthorized: Token not found in request headers!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });

    it("should return user details for a valid token", async () => {
      mockReq.headers = { token: token };
      await getUser(mockReq, mockRes);
      expect(response).to.have.property("username");
      expect(response).to.have.property("email");
      expect(response).to.have.property("profile_image");
      expect(response).to.have.property("id");
      expect(response).to.have.property("created_time");
    });

    it("should return an error for invalid or expired token", async () => {
      mockReq.headers = {
        token:
          invalidToken,
      };
      await getUser(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Unauthorized: Invalid token or user not found!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });
  });
  describe("resetPassword", () => {
    it("should require all fields (confirmPassword)", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: password,
        newPassword: "newPassword2",
        confirmPassword: "",
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "All fields are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should require all fields (newPassword)", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: password,
        newPassword: "",
        confirmPassword: "differentNewPassword",
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "All fields are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should require all fields (password)", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: "",
        newPassword: "newPassword2",
        confirmPassword: "differentNewPassword",
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "All fields are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should require new password and confirm password to match", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: password,
        newPassword: "newPassword2",
        confirmPassword: "differentNewPassword",
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "New password and confirm password do not match!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should not allow new password to be the same as current password", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: password,
        newPassword: password,
        confirmPassword: password,
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "New password must be different from the current password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it("should reset the password successfully", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: password,
        newPassword: "newPassword",
        confirmPassword: "newPassword",
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Password Reset Successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });

    it("reverting back to old password for testing purposes (IGNORE)", async () => {
      mockReq.headers = { token: token };
      mockReq.body = {
        currentPassword: "newPassword",
        newPassword: password,
        confirmPassword: password,
      };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Password Reset Successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
    // Test case for invalid/expired token
    it("should return an error for invalid or expired token", async () => {
      mockReq.headers = { token: invalidToken };
      await passwordReset(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });
  });
  describe("updateUsername", () => {
    it("should require a username", async () => {
      mockReq.headers = { token: token };
      mockReq.body = { username: "" };
      await updateUsername(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username cannot be empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should not allow the same new and current username", async () => {
      mockReq.headers = { token: token };
      mockReq.body = { username: username };
      await updateUsername(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "New username cannot be the same as the current username!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should update the username successfully", async () => {
      mockReq.headers = { token: token };
      mockReq.body = { username: "mochaTest2" };
      await updateUsername(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username updated successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });

    it("should return an error for invalid or expired token", async () => {
      mockReq.headers = { token: invalidToken };
      mockReq.body = { username: "mochaTest2" };
      await updateUsername(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });
  });
  describe("updateProfileImage", () => {
    it('should require a profile image', async () => {
      mockReq.headers = { token: token };
      mockReq.body = {};
      await updateProfileImage(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Profile image cannot be empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    it('should update the profile image successfully', async () => {
      mockReq.headers = { token: token };
      mockReq.body = { profileImg: "newImage.jpg" };
      await updateProfileImage(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Profile image updated successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
    it('should return an error for invalid or expired token', async () => {
      mockReq.headers = { token: invalidToken };
      await updateProfileImage(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Unauthorized: Invalid or Expired Token!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });
  });
  describe("deleteAccount", () => {
    it("should delete a user account successfully", async () => {
      mockReq.headers = { token: token };
      await deleteAccount(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Account Deleted Successfully!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
    it("should return an error for invalid or expired token with user not found error ", async () => {
      mockReq.headers = { token: invalidToken };
      await deleteAccount(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Invalid token, user not found!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    });
  });
});
