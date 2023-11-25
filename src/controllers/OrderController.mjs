import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { OrderDao } from "../dao/OrderDao.mjs";
import { Order } from "../models/OrderModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { OrderValidations } from "../utils/RequestBodyValidationUtil.mjs";
const orderDao = new OrderDao();
const orderValidations = new OrderValidations();

export const addOrder = (req, res) => {
  try {
    const body = {
        product_id: req?.body?.product_id,
        user_id: req?.body?.user_id,
        order_quantity: req?.body?.order_quantity,
        order_status: req?.body?.order_status,
        created_time: getDateTimeNowLocalISOString(),
    };

    orderValidations.addOrderValidator(body, res);

    const model = new Order(
      null,
      body?.product_id,
      body?.user_id,
      body?.order_quantity,
      body?.order_status,
      body?.created_time
    );

    orderDao.addOrder(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message: "Added Order successfully!",
        data: result,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};


export const getAllOrders = (req, res) => {
  const body = {};
  try {
    const model = new Order();
    orderDao.getAllOrders(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message: "Successfully retrieved all orders!",
        data: result,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};

export const updateOrder = (req, res) => {
  try {
    const body = {
      id: req?.body?.id,
      product_id: req?.body?.product_id,
      user_id: req?.body?.user_id,
      order_quantity: req?.body?.order_quantity,
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
    orderDao.getOrderById(model, (error, result) => {
      if (error) throw new Error(error);
      if (result.length < 1) {
        res.json({
          message: "Order does not exist!",
          data: result,
          status: STATUS_CODES.BAD_REQUEST_CODE,
        });
        return;
      }
    
    orderDao.updateOrder(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message: "Updated Order successfully!",
        data: result,
        status: STATUS_CODES.SUCCESS_CODE,
      });
    });
  });
  } catch (error) {
    console.error(error);
    res.json({
      message: `An unexpected error occurred: ${error}`,
      status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
    });
  }
};