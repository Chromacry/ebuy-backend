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

describe("OrderController", function () {
  let deleteId;
  describe("Add Order Controller", async () => {
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

    describe("Add Order - Check RequestBody Fields", async () => {
      it("should return a response when productId field is empty!", () => {
        mockReq.body = {
          productId: "",
          userId: 14,
          orderQuantity: 2,
          orderStatus: "Delivered",
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid product_id! Product do not exist.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when userId field is empty!", () => {
        mockReq.body = {
          productId: 2,
          orderQuantity: 2,
          orderStatus: "Delivered",
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid user_id! User do not exist.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when orderQuantity field is empty!", () => {
        mockReq.body = {
          productId: 12,
          userId: 14,
          orderStatus: "Delivered",
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid order_quantity! It should not be empty",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when orderStatus field is empty!", () => {
        mockReq.body = {
          productId: 12,
          userId: 14,
          orderQuantity: 2,
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid order_status! It should be a non-empty string.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });
    });

    describe("Add Order - Adding of order", async () => {
      it("should return a response when product added successfully!", async () => {
        mockReq.body = {
          productId: 2,
          userId: 14,
          orderQuantity: 2,
          orderStatus: "Delivered",
        };
        await addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Added Order successfully!",
          data: response?.data,
          status: STATUS_CODES.SUCCESS_CODE,
        });
        deleteId = response?.data.insertId;
      }).timeout(10000);
    });
  });

  describe("Get Order Controller", async () => {
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

    describe("Get Order - Check RequestBody Fields", () => {
      it("should return a response when id field is empty!", async () => {
        mockReq.query = {};

        await getOrders(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "id field required!, field-type: Integer",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });
    });

    describe("Get All Order - Retrieve all orders", () => {
      it("should return a response when all orders retrieved successfully!", async () => {
        mockReq.body = {};
        await getAllOrders(mockReq, mockRes);

        //* Find for unit test added product by name and save it
        const unitTestData = response?.data.find(item => item.id === "Unit Testing Workbench");
        orderModel = new Order(unitTestData?.id, unitTestData?.productId)

        expect(response).to.deep.include({
          message: "Successfully retrieved all orders!",
          data: response?.data,
          status: STATUS_CODES.SUCCESS_CODE,
        });
      }).timeout(0);
    });

    describe("Get Order - Retrieve one order", () => {
      it("should return a response when order does not exist!", async () => {
        mockReq.query = {
          id: 1,
        };
        await getOrders(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Order does not exist!",
          data: response?.data,
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      }).timeout(0);

      it("should return a response when order is retrieved successfully!", async () => {
        mockReq.query = {
          id: 30,
        };
        await getOrders(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Successfully retrieved all order!",
          data: response?.data,
          status: STATUS_CODES.SUCCESS_CODE,
        });
      }).timeout(0);
    });

  });

  describe("Update Order Controller", async () => {
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

    describe("Update Order - Check RequestBody Fields", () => {
      it("should return a response when id field is empty!", async () => {
        mockReq.body = {
          productId:2,
          userId: 14,
          orderQuantity:2,
          orderStatus: "Delivered",
        };

        await updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "id field required!, field-type: Integer",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when productId field is empty!", async () => {
        mockReq.body = {
          id:30,
          productId:"",
          userId: 14,
          orderQuantity:2,
          orderStatus: "Delivered",
        };

        await updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid product_id! Product do not exist.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when userId field is empty!", () => {
        mockReq.body = {
          id:30,
          productId: 2,
          userId: "",
          orderQuantity: 2,
          orderStatus: "Delivered",
        };

        updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid user_id! User do not exist.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when orderQuantity field is empty!", () => {
        mockReq.body = {
          id:30,
          productId: 12,
          userId: 14,
          orderStatus: "Delivered",
        };

        updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message:"Invalid order_quantity! It should not be empty",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when orderStatus field is empty!", () => {
        mockReq.body = {
          id:30,
          productId: 12,
          userId: 14,
          orderQuantity: 2,
        };

        updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid order_status! It should be a non-empty string.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });
    });

    describe("Update Product - Updating of product", () => {
      it("should return a response when product updated successfully!", async () => {
        mockReq.body = {
          id:30,
          productId: 2,
          userId: 14,
          orderQuantity: 2,
          orderStatus: "Delivered",
        };
        await updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Updated Order successfully!",
          data: response?.data,
          status: STATUS_CODES.SUCCESS_CODE,
        });
      }).timeout(10000)
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
      it("should return a response when order is deleted successfully!", async () => {
        mockReq.query = {
          id: deleteId,
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
});
