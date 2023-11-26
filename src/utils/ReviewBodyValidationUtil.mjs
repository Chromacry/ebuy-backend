import { STATUS_CODES } from "../constants/GlobalConstants.mjs"

export class ReviewValidations {
  addReviewValidator(body) {
    //* Validation Check
    if (!body?.user_id || !Number.isInteger(body?.user_id)) {
      return {
        message: "user_id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.product_id || !Number.isInteger(body?.product_id)){
      return {
        message: "product_id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.review_image || !body?.review_image.trim()){
      return {
        message: "review_image field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.rating || !Number.isInteger(body?.rating)){
      return {
        message: "rating field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.content || !body?.content.trim()){
      return {
        message: "content field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }


  deleteReviewValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }

  updateReviewValidator(body) {
    //* Validation Check
    if (!body?.id || !Number.isInteger(body?.id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.rating || !Number.isInteger(body?.rating) || body?.rating === undefined) {
      return {
        message: "reviewRating field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.content || !body?.content.trim()){
      return {
        message: "reviewContent field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
    if (!body?.review_image || !body?.review_image.trim()){
      return {
        message: "reviewImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
      
    }
  }

  getProductReviewsValidator(body) {
    //* Validation Check
    if (!body?.product_id || !Number.isInteger(body?.product_id)) {
      return {
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE
      }
    }
  }
}