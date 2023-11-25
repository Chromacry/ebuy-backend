import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { ProductValidations } from "../utils/Validations.mjs";
const productDao = new ProductDao();
const productValidations = new ProductValidations()

export const getAllProducts = (req, res) => {
  const body = {
  }
  try {
    const model = new Product();
    productDao.getAllProducts(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message : 'Successfully retrieved all products!',
        data: result,
        status: STATUS_CODES.SUCCESS_CODE
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message : `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
    });
  }
}

export const addProduct = (req, res) => {
  try {
    const body = {
      seller_id: req?.body?.sellerId,
      product_name: req?.body?.productName,
      product_description: req?.body?.productDescription,
      product_image: req?.body?.productImage,
      product_quantity: req?.body?.productQuantity,
      created_time: getDateTimeNowLocalISOString()
    }

    productValidations.addProductValidator(body, res)

    const model = new Product(null, body?.seller_id, body?.product_name, body?.product_description, body?.product_image, body?.product_quantity, null, body?.created_time);
    
    //* Check if product already exists
    productDao.getProductByProductNameAndSellerId(model, (error, result) => {
      if (error) throw new Error(error);
      if (result.length >= 1) {
        res.json({
          message : 'Product already exists!',
          data: result,
          status: STATUS_CODES.BAD_REQUEST_CODE
        });
        return
      }
      
      productDao.addProduct(model, (error, result) => {
        if (error) throw new Error(error);
        res.json({
          message : 'Added product successfully!',
          data: result,
          status: STATUS_CODES.SUCCESS_CODE
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message : `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
    });
  }
}