import { STATUS_CODES } from "../constants/GlobalConstants.mjs"

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
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.seller_id || !umber.isInteger(body?.seller_id)) {
      return {
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }

  updateProductValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.seller_id || !Number.isInteger(body?.seller_id)|| body?.seller_id === undefined) {
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
      return{
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
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