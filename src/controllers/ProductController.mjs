import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
const productDao = new ProductDao();
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