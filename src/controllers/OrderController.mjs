import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { OrderDao } from "../dao/OrderDao.mjs";
import { Order } from "../models/OrderModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { OrderValidations } from "../utils/RequestBodyValidationUtil.mjs";
const orderDao = new OrderDao();
const orderValidations = new OrderValidations();

export const addOrder = async (req, res) => {
  try {
    let result;

    const body = {
      product_id: parseInt(req?.body?.product_id),
      user_id: parseInt(req?.body?.user_id),
      order_quantity: parseInt(req?.body?.order_quantity),
      order_status: req?.body?.order_status,
      created_time: getDateTimeNowLocalISOString(),
    };
    //* Validate request body
    const validationResult = orderValidations.addOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
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
        status: STATUS_CODES.SUCCESS_CODE,
      });
      return;
    }

    res.json({
      message: "Successfully retrieved order!",
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
      product_id: parseInt(req?.body?.product_id),
      user_id: parseInt(req?.body?.user_id),
      order_quantity: parseInt(req?.body?.order_quantity),
      order_status: req?.body?.order_status,
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
