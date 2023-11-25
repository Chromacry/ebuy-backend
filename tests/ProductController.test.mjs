import { describe, it } from "mocha";
import { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";

import { addProduct } from "../src/controllers/ProductController.mjs";

describe("Add Product Controller", async () => {
  let mockReq, mockRes, response;

  beforeEach(() => {
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

  describe("Add Product - Check RequestBody Fields", async () => {
    it("Return response when sellerId field is empty!", () => {
      mockReq.body = {
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when sellerId field is not integer!", () => {
      mockReq.body = {
        sellerId: "12",
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productName field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productDescription field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productImage field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productQuantity field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productQuantity field is not integer!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: "1",
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Add Product - Adding of product", async () => {
    it("Return response when product added successfully!", async () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      await addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Added product successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });

    it("Return response when product name exist when adding new product with same name!", async () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      await addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product already exists!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });
});
