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
        userId: 1,
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
