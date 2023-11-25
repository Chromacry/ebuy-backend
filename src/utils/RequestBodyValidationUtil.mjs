import { STATUS_CODES } from "../constants/GlobalConstants.mjs";

export class ProductValidations {
  addProductValidator(body) {
    //* Validation Check
    if (!body?.seller_id || !Number.isInteger(body?.seller_id)) {
      return {
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.product_name){
      return {
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.product_description){
      return {
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.product_image){
      return {
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.product_quantity || !Number.isInteger(body?.product_quantity)){
      return {
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }

  deleteProductValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      };
    }
    if (!body?.seller_id || !Number.isInteger(body?.seller_id)) {
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
    if (!body?.seller_id || !Number.isInteger(body?.seller_id)|| body?.seller_id === undefined) {
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
}

export class OrderValidations {
  addOrderValidator(body, res) {
    //* Validation Check for id
    if (!body?.id && Number.isInteger(body?.id)) {
      res.json({
        message: "Invalid id! There is no such Orders.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Validation Check for product_id
    if (!body?.product_id && Number.isInteger(body?.product_id)) {
      res.json({
        message: "Invalid product_id! Product do not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Validation Check for user_id
    if (!body?.user_id && Number.isInteger(body?.user_id)) {
      res.json({
        message: "Invalid user_id! User do not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Validation Check for order_quantity
    if (
      !body?.order_quantity ||
      !Number.isInteger(body?.order_quantity) ||
      body?.order_quantity <= 0
    ) {
      res.json({
        message: "Invalid order_quantity! It should be a positive integer.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Validation Check for order_status (assuming it's a string)
    if (!body?.order_status || typeof body?.order_status !== "string") {
      res.json({
        message: "Invalid order_status! It should be a non-empty string.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
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
