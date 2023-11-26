import { describe, it } from "mocha";
import { expect } from "chai";
import { STATUS_CODES } from "../src/constants/GlobalConstants.mjs";

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../src/controllers/ProductController.mjs";

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

  describe("Add Product - Check RequestBody Fields", async () => {
    it("Return response when sellerId field is empty!", () => {
      mockReq.body = {
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when sellerId field is not integer!", () => {
      mockReq.body = {
        sellerId: "12",
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productName field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productDescription field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productImage field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productQuantity: 1,
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productQuantity field is empty!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productQuantity field is not integer!", () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: "1",
      };

      addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productQuantity field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Add Product - Adding of product", async () => {
    it("Return response when product added successfully!", async () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };
      await addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Added product successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });

    it("Return response when product name exist when adding new product with same name!", async () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
        productQuantity: 1,
      };
      await addProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product already exists!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });
});

describe("Update Product Controller", async () => {
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

  describe("Update Product - Check RequestBody Fields", () => {
    it("Return response when id field is empty!", async () => {
      mockReq.body = {
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when sellerId field is empty!", async () => {
      mockReq.body = {
        id: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when sellerId field is not integer!", async () => {
      mockReq.body = {
        id: 12,
        sellerId: "12",
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productName field is empty!", async () => {
      mockReq.body = {
        id: 12,
        sellerId: 12,
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productName field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productDescription field is empty!", async () => {
      mockReq.body = {
        id: 12,
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productImage: "/image/workbench.jpg",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productDescription field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("Return response when productImage field is empty!", async () => {
      mockReq.body = {
        id: 12,
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
      };

      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "productImage field required!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });

  describe("Update Product - Updating of product", () => {
    it("should return a response when product does not exist!", async () => {
      mockReq.body = {
        id: 1,
        sellerId: 12,
        productName: "Unit Testing",
        productDescription: "pc parts",
        productImage: "/image/workbench.jpg",
      };
      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(0);

    it("should return a response when sellerId don't match product!", async () => {
      mockReq.body = {
        id: 27,
        sellerId: 1,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };
      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(0);

    it("should return a response when product name exist with same name!", async () => {
      mockReq.body = {
        id: 27,
        sellerId: 12,
        productName: "Unit Testing Workbench1",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };
      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product already exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(0);

    it("should return a response when product updated successfully!", async () => {
      mockReq.body = {
        id: 27,
        sellerId: 12,
        productName: "Unit Testing Workbench",
        productDescription: "Testing workbench for pc parts",
        productImage: "/image/workbench.jpg",
      };
      await updateProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Updated product successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});

describe("Get Product Controller", async () => {
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

  describe("Get Product - Check RequestBody Fields", () => {
    it("should return a response when id field is empty!", async () => {
      mockReq.query = {};

      await getProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when id field is not an integer but letters!", async () => {
      mockReq.query = {
        id: "a",
      };

      await getProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when id field an integer but string!", async () => {
      mockReq.query = {
        id: "1",
      };

      await getProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
  });
  describe("Get Product - Retrieve one product", () => {
    it("should return a response when product does not exist!", async () => {
      mockReq.query = {
        id: 1,
      };
      await getProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);

    it("should return a response when product is retrieved successfully!", async () => {
      mockReq.query = {
        id: 31,
      };
      await getProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Successfully retrieved product!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });

  describe("Get All Product - Retrieve all products", () => {
    it("should return a response when all products retrieved successfully!", async () => {
      mockReq.body = {};
      await getAllProducts(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Successfully retrieved all products!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});

describe("Delete Product Controller", async () => {
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

  describe("Delete Product - Check RequestBody Fields", () => {
    it("should return a response when id field is empty!", async () => {
      mockReq.query = {
        sellerId: 0,
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when id field is not an integer but letters!", async () => {
      mockReq.query = {
        id: "a",
        sellerId: 0,
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "id field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when id field an integer but string!", async () => {
      mockReq.query = {
        id: "1",
        sellerId: 1,
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when sellerId field is empty!", async () => {
      mockReq.query = {
        id: 1,
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when sellerId field is not an integer but letters!", async () => {
      mockReq.query = {
        id: 1,
        sellerId: "a",
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "sellerId field required!, field-type: Integer",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });

    it("should return a response when sellerId field an integer but string!", async () => {
      mockReq.query = {
        id: 1,
        sellerId: "1",
      };

      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    });
  });



  describe("Delete Product - Deleting of product", () => {
    it("should return a response when product does not exist!", async () => {
      mockReq.query = {
        id: 1,
        sellerId: 1,
      };
      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Product does not exist!",
        data: response?.data,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }).timeout(0);

    it("should return a response when product is retrieved successfully!", async () => {
      mockReq.query = {
        id: 30,
        sellerId: 12,
      };
      await deleteProduct(mockReq, mockRes);
      expect(response).to.deep.include({
        message: "Deleted product successfully!",
        data: response?.data,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    }).timeout(0);
  });
});
