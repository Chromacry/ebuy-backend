import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { ProductValidations } from "../utils/RequestBodyValidationUtil.mjs";
const productDao = new ProductDao();
const productValidations = new ProductValidations();

export const getAllProducts = async (req, res) => {
  const body = {};
  try {
    const model = new Product();
    const getALlProductsResult = await productDao.getAllProducts(model);
    res.json({
      message: "Successfully retrieved all products!",
      data: getALlProductsResult,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    let result;

    const body = {
      id: parseInt(req?.query?.id),
    };
    //* Check api params
    const validationResult = productValidations.getProductValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Product(body?.id);
    result = await productDao.getProductById(model);
    if (result.length < 1) {
      res.json({
        message: "Product does not exist!",
        data: result,
        status: STATUS_CODES.SUCCESS_CODE,
      });
      return  
    }

    res.json({
      message: "Successfully retrieved product!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });

  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    let result;

    const body = {
      seller_id: req?.body?.sellerId,
      product_name: req?.body?.productName,
      product_description: req?.body?.productDescription,
      product_image: req?.body?.productImage,
      product_quantity: req?.body?.productQuantity,
      created_time: getDateTimeNowLocalISOString(),
    };
    //* Validate request body
    const validationResult = productValidations.addProductValidator(body);
    if (validationResult) {
      res.json(validationResult)
      return
    }
    const model = new Product(
      null,
      body?.seller_id,
      body?.product_name,
      body?.product_description,
      body?.product_image,
      body?.product_quantity,
      null,
      body?.created_time
    );
    //* Check if product already exists
    result = await productDao.getProductByProductNameAndSellerId(model);
    if (result.length >= 1) {
      res.json({
        message: "Product already exists!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    result = await productDao.addProduct(model)
    res.json({
      message: "Added product successfully!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let result;

    const body = {
      id: parseInt(req?.query?.id),
      seller_id: parseInt(req?.query?.sellerId),
      deleted_time: getDateTimeNowLocalISOString(),
    };
    const validationResult = productValidations.deleteProductValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Product(body?.id, body?.seller_id);

    //* Check if product already exists
    result = await productDao.getProductById(model)
    if (result.length < 1) {
      res.json({
        message: "Product does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    result = await productDao.deleteProduct(model)
    res.json({
      message: "Deleted product successfully!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });

  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let result;
    
    const body = {
      id: req?.body?.id,
      seller_id: req?.body?.sellerId,
      product_name: req?.body?.productName,
      product_description: req?.body?.productDescription,
      product_image: req?.body?.productImage,
      updated_time: getDateTimeNowLocalISOString(),
    };

    const validationResult = productValidations.updateProductValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }

    const model = new Product(
      body?.id,
      body?.seller_id,
      body?.product_name,
      body?.product_description,
      body?.product_image,
      body?.product_quantity,
      null,
      body?.created_time
    );

    //* Check if product Id exist
    result = await productDao.getProductById(model)
    if (result.length < 1) {
      res.json({
        message: "Product does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

      //* Check if product name exists, to avoid duplicates
    result = await productDao.getProductByProductNameAndSellerId(model)
    if (result.length >= 1) {
      res.json({
        message: "Product already exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    result = await productDao.updateProduct(model)
    res.json({
      message: "Updated product successfully!",
      data: updateProductResult,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};
