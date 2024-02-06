import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
import { UserDao } from "../dao/UserDao.mjs";
import { User } from "../models/UserModel.mjs"
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { ProductValidations } from "../utils/ProductBodyValidationUtil.mjs";
import { logger } from "../utils/LoggingUtil.mjs";
const userDao = new UserDao();
const productDao = new ProductDao();
const productValidations = new ProductValidations();

export const getAllProducts = async (req, res) => {
  try {
    let result;
    const body = {};
    const model = new Product();
    result = await productDao.getAllProducts(model);
    logger.silly(`Products has been successfully retrieved!`)
    res.json({
      message: "Successfully retrieved all products!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    // console.error(error);
    logger.error(`An error has occurred - Failed to retrieve all products. ${error.message}`)
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const getAllProductList = async (req, res) => {
  try {
    let result;
    
    const storedToken = req.headers?.token;
    if (!storedToken) {
      return res.status(401).json({
        message: "Unauthorized: Token not found in request headers!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const body = {
      seller_id: decoded.id,
      limit: parseInt(req?.query?.limit),
      offset: parseInt(req?.query?.offset),
    };
    const validationResult = productValidations.getProductListValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Product();
    model.setSellerId(body?.seller_id)
    model.setLimit(body?.limit)
    model.setOffset(body?.offset)
    result = await productDao.getProductList(model);
    logger.silly(`Product List has been successfully retrieved!`)
    res.json({
      message: "Successfully retrieved all products!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    // console.error(error);
    logger.error(`An error has occurred - Failed to add user review onto product. ${error.message}`)
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
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return  
    }
    logger.silly(`Product data has been successfully retrieved!`)

    res.json({
      message: "Successfully retrieved product!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });

  } catch (error) {
    // console.error(error);
    logger.error(`An error has occurred - Failed to retrieve product. ${error.message}`)
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    let result;
    const storedToken = req.headers?.token;
    if (!storedToken) {
      return res.status(401).json({
        message: "Unauthorized: Token not found in request headers!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const body = {
      seller_id: decoded?.id,
      product_name: req?.body?.productName,
      product_description: req?.body?.productDescription,
      product_image: req?.body?.productImage,
      product_quantity: req?.body?.productQuantity,
      created_time: getDateTimeNowLocalISOString(),
    };
    // console.log(body)
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

    const userModel = new User(body?.seller_id);
    
    //* Check if seller_id exists
    let userresult = await userDao.getUserBySellerId(userModel)
    if (userresult.length < 1) {
      res.json({
        message: "Seller does not exist!",
        data: userresult,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Add new product
    result = await productDao.addProduct(model)
    logger.info(`Seller user [${userresult[0].email}] has successfully added [${body?.product_name}] as a new product.`)
    res.json({
      message: "Added product successfully!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });
  } catch (error) {
    console.error(error);
    logger.error(`An error has occurred - Failed to add product. ${error.message}`)
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let result;
    const storedToken = req.headers?.token;
    if (!storedToken) {
      return res.status(401).json({
        message: "Unauthorized: Token not found in request headers!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const body = {
      id: parseInt(req?.query?.id),
      seller_id: decoded?.id,
      deleted_time: getDateTimeNowLocalISOString(),
    };
    const validationResult = productValidations.deleteProductValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Product(body?.id, body?.seller_id);

    //* Check if product already exists
    result = await productDao.getProduct(model)
    if (result.length < 1) {
      res.json({
        message: "Product does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    result = await productDao.deleteProduct(model)
    logger.info(`Seller user [${body?.seller_id}] has successfully deleted product [${result[0]?.product_name}].`)
    res.json({
      message: "Deleted product successfully!",
      data: result,
      status: STATUS_CODES.SUCCESS_CODE,
    });

  } catch (error) {
    // console.error(error);
    logger.error(`An error has occurred - Failed to delete a product. ${error.message}`)
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let result;
    const storedToken = req.headers?.token;
    if (!storedToken) {
      return res.status(401).json({
        message: "Unauthorized: Token not found in request headers!",
        status: STATUS_CODES.UNAUTHORIZED_CODE,
      });
    }
    const decoded = jwt.verify(storedToken, process.env.JWT_SECRET);
    const body = {
      id: req?.body?.id,
      seller_id: decoded?.id,
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

    //* Check if product Id matches sellerId exist
    result = await productDao.getProductByIdAndSellerId(model)
    if (result.length < 1) {
      res.json({
        message: "Seller id does not match product id!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    //* Check if product name exists, to avoid duplicates
    // result = await productDao.getProductByProductNameAndSellerId(model)
    // if (result.length >= 1) {
    //   res.json({
    //     message: "Product already exist!",
    //     data: result,
    //     status: STATUS_CODES.BAD_REQUEST_CODE,
    //   });
    //   return;
    // }

    let updateresult = await productDao.updateProduct(model)
    if (updateresult)
      logger.info(`Seller user [${body?.seller_id}] has successfully updated product from [${result[0].product_name}] to [${body?.product_name}]`)
      res.json({
        message: "Updated product successfully!",
        data: updateresult,
        status: STATUS_CODES.SUCCESS_CODE,
      });
  } catch (error) {
    // console.error(error);
    logger.error(`An error has occurred - Failed to update product. ${error.message}`)
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};
