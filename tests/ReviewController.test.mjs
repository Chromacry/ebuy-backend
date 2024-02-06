




import { describe, it } from "mocha";
import { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";

import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../src/controllers/ReviewController.mjs";

let testInsertId;
//let status;
describe("Add Review Controller", async () => {
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
  });

  describe("Add Review - Check RequestBody Fields", async () => {
    it("Return response when userId field is empty!", () => {
      mockReq.body = {
        reviewContent: "Unit Testing Content",
        reviewImage: "/image/workbench.jpg",
        productId: 2,
        reviewRating: 1,
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "userId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productId field is not integer!", () => {
      mockReq.body = {
        userId: 13,
        reviewContent: "Unit Testing Content ",
        reviewImage: "/image/workbench.jpg",
        reviewRating: "Unit Testing Rating",
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when reviewImage field is empty!", () => {
      mockReq.body = {
        userId: 13,
        reviewContent: "Unit Testing Content ",
        productId: 2,
        reviewRating: 1,
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when reviewRating field is empty!", () => {
      mockReq.body = {
        userId: 13,
        reviewContent: "Unit Testing Content ",
        productId: 2,
        reviewImage: "/image/workbench.jpg",
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewRating field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when reviewContent field is empty!", () => {
      mockReq.body = {
        userId: 13,
        reviewRating: 1,
        productId: 2,
        reviewImage: "/image/workbench.jpg",
      };

      addReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewContent field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Add Review - Adding of Review", async () => {
    it("Return response when review added successfully!", async () => {
      mockReq.body = {
        userId: 13,
        reviewRating: 1,
        reviewContent: "Unit Testing Content",
        productId: 149,
        reviewImage: "/image/workbench.jpg",
      };
      await addReview(mockReq, mockRes);
      testInsertId = response?.data.insertId;
      expect(response).to.deep.include({
        message: "Review added successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(10000);
  });
});

describe("Get Reviews Controller", async () => {
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

  describe("Get Review - Check RequestBody Fields", () => {
    it("should return a response when productId field is empty!", async () => {
      mockReq.query = {};

      await getProductReviews(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when productId field is not an integer but letters!", async () => {
      mockReq.query = {
        productId: "a",
      };

      await getProductReviews(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Get Review - Getting of Reviews", () => {
    it("Return response when review is retrieved successfully!", async () => {
      mockReq.query = {
        productId: 2,
      };

      await getProductReviews(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Review retrieved successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});




describe("Update Review Controller", async () => {
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

  describe("Update Review - Check RequestBody Fields", () => {
    it("should return a response when id field is empty!", async () => {
      mockReq.body = {
        reviewRating: 1,
        reviewContent: "Unit Testing Content",
        reviewImage: "/image/workbench.jpg",
      };

      await updateReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Should return a response when reviewRating field is empty!", async () => {
      mockReq.body = {
        id: 13,
        reviewContent: "Unit Testing Content",
        reviewImage: "/image/workbench.jpg",
      };

      await updateReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewRating field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Should return a response when reviewContent field is empty!", async () => {
      mockReq.body = {
        id: 13,
        reviewRating: 1,
        reviewImage: "/image/workbench.jpg",
      };

      await updateReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewContent field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Should return a response when reviewImage field is empty!", async () => {
      mockReq.body = {
        id: 13,
        reviewRating: 1,
        reviewContent: "Unit Testing Content",
      };

      await updateReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "reviewImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Update Review - Updating of Review", () => {
    it("Should return a response when review updated successfully!", async () => {
      mockReq.body = {
        id: testInsertId,
        reviewRating: 3,
        reviewContent: "Unit Testing Content Updated",
        reviewImage: "/image/workbench-updated.jpg",
      };
      await updateReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Review updated successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});

describe("Delete Review - Check RequestBody Fields", () => {
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
  it("should return a response when id field is empty!", async () => {
    mockReq.query = {};

    await deleteReview(mockReq, mockRes);
    expect(response).to.deep.include({
      message: "id field required!, field-type: Integer",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  });

  it("should return a response when id field is not an integer but letters!", async () => {
    mockReq.query = {
      id: "a",
    };

    await deleteReview(mockReq, mockRes);
    expect(response).to.deep.include({
      message: "id field required!, field-type: Integer",
      status: STATUS_CODES.BAD_REQUEST_CODE,
    });
  });
  describe("Delete Review - Deleting of Review", () => {
    it("Return response when review is deleted successfully!", async () => {
      mockReq.query = {
        id: testInsertId,
      };

      await deleteReview(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Review successfully deleted!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});