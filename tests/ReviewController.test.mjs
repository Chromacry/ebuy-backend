import { describe, it } from "mocha";
import { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";

import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../src/controllers/ReviewController.mjs";

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

  describe("Add Review - Check RequestBody Fields", async () => {
    it("Return response when sellerId field is empty!", () => {
      mockReq.body = {
        content: "Unit Testing Content",
        review_image: "/image/workbench.jpg",
        product_id: 2,
        rating:1
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message:  "userId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when sellerId field is not integer!", () => {
      mockReq.body = {
        user_id: 13,
        content: "Unit Testing Content ",
        review_image: "/image/workbench.jpg",
        rating:'Unit Testing Rating'
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productName field is empty!", () => {
      mockReq.body = {
        user_id: 13,
        content: "Unit Testing Content ",
        product_id:2,
        rating:1
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productDescription field is empty!", () => {
      mockReq.body = {
        user_id: 13,
        content: "Unit Testing Content ",
        product_id:2,
        review_image: "/image/workbench.jpg",
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewRating field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productImage field is empty!", () => {
      mockReq.body = {
        user_id: 13,
        rating:1,
        product_id:2,
        review_image: "/image/workbench.jpg",
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewContent field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Add Review - Adding of product", async () => {
    it("Return response when product added successfully!", async () => {
      mockReq.body = {
        user_id: 13,
        rating:1,
        content:"Unit Testing Content",
        product_id:2,
        review_image: "/image/workbench.jpg",
      };
      await addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Review added successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
  });
});