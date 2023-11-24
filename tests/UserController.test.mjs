import chai, { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";
import { register, login, getUser } from "../src/controllers/UserController.mjs";

describe("UserController", () => {
  let mockReq, mockRes, response, status;
  let token;

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
    it("should return an error for missing required fields", async () => {
      mockReq.body = {
        username: "",
        email: "mochatest@example.com",
        password: "mochaTestPassword",
      };
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Username, email, and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for invalid email format", async () => {
      mockReq.body = {
        username: "testuser",
        email: "invalidemailformat",
        password: "Password123",
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
        username: "mochaTest",
        email: "mochaTest@gmail.com",
        password: "mochaTest1234",
      };
      // Assuming the function would return a successful registration message
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Registration successful!",
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });

    it("should return an error for duplicate email registration", async () => {
      mockReq.body = {
        username: "mochaTest",
        email: "mochaTest@gmail.com",
        password: "mochaTest1234",
      };

      // Here you simulate the behavior as if the email already exists in the database
      await register(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Email has already been registered!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("login", () => {
    it("should return an error for missing email or password", async () => {
      mockReq.body = {
        email: "",
        password: "testPassword",
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Email and password are required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for invalid email format", async () => {
      mockReq.body = {
        email: "invalidemail",
        password: "testPassword",
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Invalid email format!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return an error for incorrect email or password", async () => {
      mockReq.body = {
        email: "test@example.com",
        password: "wrongPassword",
      };
      await login(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Incorrect Email or Password!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    // Assuming you have a way to mock successful login
    it("should successfully log in a user", async () => {
      mockReq.body = {
        email: "mochaTest@gmail.com",
        password: "mochaTest1234",
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


//   describe("getUser", () => {
//     it("should return an error if token is not provided", async () => {
//       mockReq.headers = {};
//       await getUser(mockReq, mockRes);
//       expect(response).to.deep.include({
//         message: "Unauthorized: Token not found in request headers!",
//         status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
//       });
//     });

//     it("should return user details for a valid token", async () => {
//       mockReq.headers = { token: token };
//       console.log("Token logging from test: ",token)
//       // Mock the database response and JWT verification as needed
//       await getUser(mockReq, mockRes);
//       console.log(mockReq)
//       expect(response).to.have.property("username");
//       expect(response).to.have.property("email");
//       expect(response).to.have.property("profile_image");
//       expect(response).to.have.property("id");
//       expect(response).to.have.property("created_time");
//     });

//     it("should return an error for invalid or expired token", async () => {
//       mockReq.headers = { token: "invalidToken" };
//       // Mock JWT verification to throw an error or return invalid
//       await getUser(mockReq, mockRes);
//       expect(response).to.deep.include({
//         message: "Unauthorized: Invalid token!",
//         status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
//       });
//     });
//   });
});
