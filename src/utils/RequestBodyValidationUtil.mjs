import { STATUS_CODES } from "../constants/GlobalConstants.mjs";

export class OrderValidations {
  getOrderListValidator(body) {
    //* Validation Check
    if (typeof body.limit === 'undefined') {
      return {
        message: "limit is required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (typeof body.offset === 'undefined') {
      return {
        message: "offset is required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }
  addOrderValidator(body) {
    //* Validation Check for product_id
    if (!body.cart_item) {
      return {
        message: "Invalid cart_items! Cart is empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    const storedToken = req.headers?.token;
    //* Validation Check for token
    if (!storedToken) {
      return {
        message: "Unauthorized: Token not found in request headers!",
        status: 401,
      };
    }
  }

  updateOrderValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    //* Validation Check for user_id
    if (!body?.user_id || !Number.isInteger(body?.user_id)) {
      return {
        message: "Invalid user_id! User do not exist!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    //* Validation Check for order_status
    if (!body?.order_status) {
      return {
        message: "Invalid order_status! Order Status do not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    //* Validation Check for order_status (assuming it's a string)
    if (!body?.order_status || typeof body?.order_status !== "string") {
      return {
        message: "Invalid order_status! It should be a non-empty string.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }

  deleteOrderValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    // if (!body?.product_id || !Number.isInteger(body?.product_id)) {
    //   return {
    //     message: "ProductId field required!, field-type: Integer",
    //     status: STATUS_CODES.BAD_REQUEST_CODE,
    //   };
    // }
    if (!body?.id == null) {
      return {
        message: "Order does not exist!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }

  getOrderValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    return null;
  }

  getOrderBySellerIdValidator(body) {
    //* Validation Check
    if (!body?.seller_id) {
      return {
        message: "seller id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }

    if (!body?.product_id) {
      return {
        message: "product id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    return null;
  }
}
