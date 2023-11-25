import { STATUS_CODES } from "../constants/GlobalConstants.mjs";

export class ProductValidations {
  addProductValidator(body, res) {
    //* Validation Check
    if (!body?.seller_id && Number.isInteger(body?.seller_id)) {
      res.json({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    if (!body?.product_name) {
      res.json({
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    if (!body?.product_description) {
      res.json({
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    if (!body?.product_image) {
      res.json({
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    if (!body?.product_quantity && Number.isInteger(body?.product_quantity)) {
      res.json({
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
  }

  deleteProductValidator(body) {
    //* Validation Check
    if (!body?.id && Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.seller_id && Number.isInteger(body?.seller_id)) {
      return {
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }

  updateProductValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (
      (!body?.seller_id && Number.isInteger(body?.seller_id)) ||
      body?.seller_id === undefined
    ) {
      return {
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.product_name) {
      return {
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.product_description) {
      return {
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.product_image) {
      return {
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }
  getProductValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }
}

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
        message: "Invalid order_quantity! It should be a positive integer.",
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
    if (!body?.product_id || !Number.isInteger(body?.product_id)) {
      return {
        message: "ProductId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.user_id || !Number.isInteger(body?.user_id)) {
      return {
        message: "UserId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
  }

  getOrderValidator(body) {
    //* Validation Check
    if (!body?.id && Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }
}
