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
import { login } from "../src/controllers/UserController.mjs";

let orderModel;
let status;

describe("OrderController", function () {
  let deleteId;
  let mockReq, mockRes, response, token;
  let email = "admin1@gmail.com";
  let password = "admin";
  describe("Add Order Controller", async () => {
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
      mockReq.headers = { token: token };
    });

    it("login to get token", async () => {
      //* Get token
      mockReq.body = {
        email: email,
        password: password,
      };
      await login(mockReq, mockRes);
      token = response.token;
      mockReq.headers = { token: token };
    }).timeout(5000);

    describe("Add Order - Check RequestBody Fields", async () => {
      it("should return a response when Cart field is empty!", async () => {
        mockReq.body = {
          email: email,
          password: password,
        };
        await login(mockReq, mockRes);
        token = response.token;
        mockReq.headers = { token: token };
        mockReq.body = {
          cart_items:"",
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid cart_items! Cart is empty!",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when token is empty!", async () => {
        mockReq.body = {
          email: email,
          password: password,
        };
        await login(mockReq, mockRes);
        token = response.token;
        mockReq.headers = { token: "" };
        mockReq.body = {
          cart_items: [
            {"product_id": "149", "order_quantity": 1, "product_price": 40},
            {"product_id": "149", "order_quantity": 1, "product_price": 40}
          ]
        };

        addOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Unauthorized: Token not found in request headers!",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });
    });

    describe("Add Order - Adding of order", async () => {
      it("should return a response when order added successfully!", async () => {
        mockReq.body = {
          cart_items: [
            {"product_id": "149", "order_quantity": 1, "product_price": 40},
            {"product_id": "149", "order_quantity": 1, "product_price": 40}
          ]
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

        //* Find for unit test added order by name and save it
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
          id: 216,
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
      mockReq.headers = { token: token };
    });

    describe("Update Order - Check RequestBody Fields", () => {
      it("should return a response when id field is empty!", async () => {
        mockReq.body = {
          userId: 14,
          orderStatus: "Delivered",
        };

        await updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "id field required!, field-type: Integer",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when userId field is empty!", () => {
        mockReq.body = {
          id: 218,
          userId: "",
          orderStatus: "Paid",
        };

        updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "id field required!, field-type: Integer",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      it("should return a response when orderStatus field is empty!", () => {
        mockReq.body = {
          id: 218,
          userId: 274,
          orderStatus: "",
        };

        updateOrder(mockReq, mockRes);
        expect(response).to.deep.include({
          message: "Invalid order_status! Order Status do not exist.",
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
      });

      describe("Update Order - Updating of order", () => {
        it("should return a response when order updated successfully!", async () => {
          mockReq.body = {
            id: 216,
            userId: 274,
            orderStatus: "Delivered",
          };
          await updateOrder(mockReq, mockRes);
          expect(response).to.deep.include({
            message: "Updated Order successfully!",
            data: response?.data,
            status: STATUS_CODES.SUCCESS_CODE,
          });
        }).timeout(10000);
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
            // status = code;
            return {
              json: (resObj) => {
                response = resObj;
              },
            };
          },
        };
        mockReq.headers = { token: token };
      });

      describe("Delete Order - Check RequestBody Fields", () => {

        it("should return a response when id field is empty!", async () => {
          mockReq.query = {
            id: 0,
          };

          await deleteOrder(mockReq, mockRes);
          expect(response).to.deep.include({
            message: "id field required!, field-type: Integer",
            status: STATUS_CODES.BAD_REQUEST_CODE,
          });
        });
      });

      describe("Delete Order - Deleting of Order", () => {

        it("should return a response when order does not exist!", async () => {
          mockReq.query = {
            id: 0,
          };
          await deleteOrder(mockReq, mockRes);
          expect(response).to.deep.include({
            message: "id field required!, field-type: Integer",
            // data: response?.data,
            status: STATUS_CODES.BAD_REQUEST_CODE,
          });
        }).timeout(0);
         
        it("should return a response when order is deleted successfully!", async () => {
          mockReq.query = {
            id: deleteId,
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
