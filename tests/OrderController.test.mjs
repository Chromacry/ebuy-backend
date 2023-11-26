import { describe, it } from "mocha";
import { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";

import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrders,
  updateOrder,
} from "../src/controllers/OrderController.mjs";
import { Order } from "../src/models/OrderModel.mjs";

let orderModel;

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
    it("should return a response when sellerId field is empty!", () => {
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

    it("should return a response when sellerId field is not integer!", () => {
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

    it("should return a response when productName field is empty!", () => {
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

    it("should return a response when productDescription field is empty!", () => {
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

    it("should return a response when productImage field is empty!", () => {
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

    it("should return a response when productQuantity field is empty!", () => {
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

    it("should return a response when productQuantity field is not integer!", () => {
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
    it("should return a response when sellerId don't exist!", async () => {
      mockReq.body = {
        sellerId: 1,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };
      await addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Seller does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(5000)

    it("should return a response when product added successfully!", async () => {
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
    }).timeout(10000)
    
    it("should return a response when product name exist when adding new product with same name!", async () => {
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

describe("Delete Order Controller", async () => {
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

  describe("Delete Order - Check RequestBody Fields", () => {
    // done
    it("should return a response when id field is empty!", async () => {
      mockReq.query = {
        UserId: 0,
      };

      await deleteOrder(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    // done
    it("should return a response when UserId field is empty!", async () => {
      mockReq.query = {
        id: 1,
      };

      await deleteOrder(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "UserId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
    // done
    it("should return a response when ProductId field is empty!", async () => {
      mockReq.query = {
        id: 1,
        userId:1,
      };

      await deleteOrder(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "ProductId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });


  });


  describe("Delete Order - Deleting of Order", () => {
    // done
    it("should return a response when order does not exist!", async () => {
      mockReq.query = {
        id: 1,
        productId: 1,
        userId: 1,
      };
      await deleteOrder(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Order does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(0);
    // done
    it("should return a response when order is deleted successfully!", async () => {
      mockReq.query = {
        id: 21,
        userId: 14,
        productId: 2,
      };
      await deleteOrder(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Deleted order successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});