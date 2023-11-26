import { STATUS_CODES } from "../constants/GlobalConstants.mjs";

export class OrderValidations {
  addOrderValidator(body) {
    //* Validation Check for product_id
    if (!body?.product_id || !Number.isInteger(body?.product_id)) {
      return{
        message: "Invalid product_id! Product do not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }

    //* Validation Check for user_id
    if (!body?.user_id || !Number.isInteger(body?.user_id)) {
      return{
        message: "Invalid user_id! User do not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }

    //* Validation Check for order_quantity
    if (
      !body?.order_quantity ||
      !Number.isInteger(body?.order_quantity) ||
      body?.order_quantity <= 0
    ) {
      return{
        message: "Invalid order_quantity! It should not be empty",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }

    //* Validation Check for order_status (assuming it's a string)
    if (!body?.order_status || typeof body?.order_status !== "string") {
      return{
        message: "Invalid order_status! It should be a non-empty string.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      }
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
    if (
      (!body?.product_id || !Number.isInteger(body?.product_id)) ||
      body?.product_id === undefined
    ) {
      return {
        message: "ProductId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (
      (!body?.user_id || !Number.isInteger(body?.user_id)) ||
      body?.user_id === undefined
    ) {
      return {
        message: "UserId field required!, field-type: Integer",
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
    if (!body?.user_id || !Number.isInteger(body?.user_id)) {
      return {
        message: "UserId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.product_id || !Number.isInteger(body?.product_id)) {
      return {
        message: "ProductId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.id == null){
      return{
        message: "Order does not exist!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      }
    }
  }

  getOrderValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      };
    }
    return null;
  }
}
