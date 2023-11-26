import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { OrderDao } from "../dao/OrderDao.mjs";
import { Order } from "../models/OrderModel.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { OrderValidations } from "../utils/RequestBodyValidationUtil.mjs";
const orderDao = new OrderDao();
const productDao = new ProductDao();
const orderValidations = new OrderValidations();

export const addOrder = async (req, res) => {
  try {
    let result;
    
    const body = {
      product_id: parseInt(req?.body?.productId),
      user_id: parseInt(req?.body?.userId),
      order_quantity: parseInt(req?.body?.orderQuantity),
      order_status: req?.body?.orderStatus,
      created_time: getDateTimeNowLocalISOString(),
    };
    //* Validate request body
    const validationResult = orderValidations.addOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }

    // Check if the referenced product exists
    const productModel = new Product(body.id);
    const productExists = await productDao.getProductById(productModel);
    if (!productExists) {
      res.json({
        message: "Referenced product does not exist.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    const model = new Order(
      null,
      body?.product_id,
      body?.user_id,
      body?.order_quantity,
      body?.order_status,
      body?.created_time
    );
    // // check whether order is existing
    // result = await orderDao.getOrderByProductIdAndUserId(model);
    // if (result.length >= 1) {
    //   res.json({
    //     message: "Product already exists!",
    //     data: result,
    //     status: STATUS_CODES.BAD_REQUEST_CODE,
    //   });
    //   return;
    // }

    result = await orderDao.addOrder(model);

    res.json({
      message: "Added Order successfully!",
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

export const getAllOrders = async (req, res) => {
  try {
    let result;

    const model = new Order();
    result = await orderDao.getAllOrders(model);
    res.json({
      message: "Successfully retrieved all orders!",
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

export const getOrders = async (req, res) => {
  try {
    let result;

    const body = {
      id: parseInt(req?.query?.id),
    };
    //* Check api params
    const validationResult = orderValidations.getOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Order(body?.id);
    result = await orderDao.getOrders(model);
    if (result.length < 1) {
      res.json({
        message: "Order does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    res.json({
      message: "Successfully retrieved all order!",
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

export const updateOrder = async (req, res) => {
  try {
    let result;

    const body = {
      id: parseInt(req?.body?.id),
      product_id: parseInt(req?.body?.productId),
      user_id: parseInt(req?.body?.userId),
      order_quantity: parseInt(req?.body?.orderQuantity),
      order_status: (req?.body?.orderStatus),
      updated_time: getDateTimeNowLocalISOString(),
    };

    const validationResult = orderValidations.updateOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }

    const model = new Order(
      body?.id,
      body?.product_id,
      body?.user_id,
      body?.order_quantity,
      body?.order_status,
      body?.created_time
    );

    //* Check if Order Id exist
    result = await orderDao.getOrderById(model);
    if (result.length < 1) {
      res.json({
        message: "Order does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    result = await orderDao.updateOrder(model);
    res.json({
      message: "Updated Order successfully!",
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

export const deleteOrder = async (req, res) => {
  try {
    let result;

    const body = {
      id: parseInt(req?.query?.id),
      product_id: parseInt(req?.query?.productId),
      user_id: parseInt(req?.query?.userId),
      deleted_time: getDateTimeNowLocalISOString(),
    };
    const validationResult = orderValidations.deleteOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Order(body?.id, body?.product_id, body?.user_id);

    //* Check if order already exists
    result = await orderDao.getOrderById(model);
    if (result.length < 1) {
      res.json({
        message: "Order does not exist!",
        data: result,
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }
    result = await orderDao.deleteOrder(model);
    res.json({
      message: "Deleted order successfully!",
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
