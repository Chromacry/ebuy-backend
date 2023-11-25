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



