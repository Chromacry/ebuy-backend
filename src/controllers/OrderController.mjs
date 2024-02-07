import jwt from "jsonwebtoken";
import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { OrderDao } from "../dao/OrderDao.mjs";
import { Order } from "../models/OrderModel.mjs";
import { ProductDao } from "../dao/ProductDao.mjs";
import { Product } from "../models/ProductModel.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
import { OrderValidations } from "../utils/RequestBodyValidationUtil.mjs";
import { generateRandomTrackingNumber } from "../utils/TrackingNumberUtil.mjs";
const orderDao = new OrderDao();
const productDao = new ProductDao();
const orderValidations = new OrderValidations();

export const addOrder = async (req, res) => {
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
    
    // Validate if cart_items exist in the request body
    if (!req.body.cart_items || req.body.cart_items.length === 0) {
      return res.status(401).json({
        message: "Invalid cart_items! Cart is empty!",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
    }
    const tracking_number = generateRandomTrackingNumber();
    const body = {
      cart_items: req.body.cart_items,
      user_id: decoded?.id,
      order_status: "Paid",
      created_time: getDateTimeNowLocalISOString(),
      tracking_number: tracking_number,
    };
    console.log(body.tracking_number, "above validation");

    //* Validate request body
    for (let i = 0; i < body.cart_items.length; i++) {
      // Check if the referenced product exists
      const productModel = new Product(body.cart_items[i].product_id);
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
        body.cart_items[i].product_id,
        body?.user_id,
        body.cart_items[i].order_quantity,
        body?.order_status,
        body?.created_time,
        body?.tracking_number,
        body.cart_items[i].product_price
      );
      result = await orderDao.addOrder(model);
    }
    res.json({
      message: "Added TestOrder successfully!",
      data: { result, tracking_number }, 
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
// export const getOrdersBySellerId = async (req, res) => {
//   try {
//     let result;

//     const body = {
//       seller_id: parseInt(req?.query?.seller_id),
//       product_id: parseInt(req?.query?.product_id),
//     };
//     //* Check api params
//     const validationResult = orderValidations.getOrderBySellerIdValidator(body);
//     if (validationResult) {
//       res.json(validationResult);
//       return;
//     }
//     const model = new Order(body?.id);
//     result = await orderDao.getOrdersBySellerId(model);
//     if (result.length < 1) {
//       res.json({
//         message: "Order does not exist!",
//         data: result,
//         status: STATUS_CODES.BAD_REQUEST_CODE,
//       });
//       return;
//     }

//     res.json({
//       message: "Successfully retrieved all order!",
//       data: result,
//       status: STATUS_CODES.SUCCESS_CODE,
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({
//       message: `An unexpected error occurred: ${error}`,
//       status: STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
//     });
//   }
// };
export const getAllOrderList = async (req, res) => {
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
    console.log(body);
    const validationResult = orderValidations.getOrderListValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Order();
    model.setUserId(body?.seller_id);
    model.setLimit(body?.limit);
    model.setOffset(body?.offset);
    result = await orderDao.getOrderList(model);
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

export const updateOrder = async (req, res) => {
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
      // id: parseInt(req?.body?.id),
      id: req?.body?.id,
      product_id: parseInt(req?.body?.productId),
      // user_id: parseInt(req?.body?.userId),
      user_id: decoded?.id,
      order_quantity: parseInt(req?.body?.orderQuantity),
      order_status: req?.body?.orderStatus,
      updated_time: getDateTimeNowLocalISOString(),
      tracking_number: req?.body?.orderStatus,
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
      body?.created_time,
      body?.tracking_number
    );

    //* Check if Order Id exist
    result = await orderDao.getOrders(model);
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
      user_id: decoded?.id,
      deleted_time: getDateTimeNowLocalISOString(),
    };

    // Check if id is an integer
    if (
      typeof body.id !== "number" ||
      Number.isNaN(body.id) ||
      !Number.isInteger(body.id)
    ) {
      res.json({
        message: "Invalid 'id' format. It must be an integer.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    // Check if user_id is an integer
    if (
      typeof body.user_id !== "number" ||
      Number.isNaN(body.user_id) ||
      !Number.isInteger(body.user_id)
    ) {
      res.json({
        message: "Invalid 'user_id' format. It must be an integer.",
        status: STATUS_CODES.BAD_REQUEST_CODE,
      });
      return;
    }

    const validationResult = orderValidations.deleteOrderValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    console.log(body.user_id);
    console.log(body.id);
    const model = new Order(body?.id, null, body?.user_id);

    //* Check if order already exists
    result = await orderDao.getOrderById(model);
    // if (result.length < 1) {
    //   res.json({
    //     message: "Order does not exist!",
    //     data: result,
    //     status: STATUS_CODES.BAD_REQUEST_CODE,
    //   });
    //   return;
    // }
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
