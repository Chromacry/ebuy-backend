import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ReviewDao } from "../dao/ReviewDao.mjs";
import { Review } from "../models/ReviewModel.mjs";
import { ReviewValidations } from "../utils/ReviewBodyValidationUtil.mjs";
import { getDateTimeNowLocalISOString } from "../utils/DateTimeUtil.mjs";
const reviewDao = new ReviewDao();
const reviewValidations = new ReviewValidations();
export const addReview = async (req, res) => {
  try {
    let result;
    const body = {
      user_id: req?.body?.user_id,
      product_id: req?.body?.product_id,
      rating: req?.body?.rating,
      content: req?.body?.content,
      review_image: req?.body?.review_image,
      created_time: getDateTimeNowLocalISOString(),
    };
    const validationResult = reviewValidations.addReviewValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review(
      null,
      body.content,
      body.rating,
      body.user_id,
      body.product_id,
      body.created_time,
      body.review_image
    );
    result = await reviewDao.addReview(model);
    res.json({
      message: "Review added successfully!",
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

export const getProductReviews = async (req, res) => {
  try {
    let result;
    const body = {
      product_id: parseInt(req?.query?.id),
    };
    const validationResult = reviewValidations.getProductReviewsValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review();
    model.setProductId(body.product_id);
    result = await reviewDao.getProductReviews(model);

    res.json({
      message: "Review retrieved successfully!",
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

export const updateReview = async (req, res) => {
  try {
    let result;
    const body = {
      id: req?.body?.id,
      content: req?.body?.content,
      rating: req?.body?.rating,
      review_image: req?.body?.review_image,
    };
    const validationResult = reviewValidations.updateReviewValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review(
      body.id,
      body.content,
      body.rating,
      null,
      null,
      null,
      body.review_image
    );
    result = await reviewDao.updateReview(model);
    res.json({
      message: "Review updated successfully!",
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

export const deleteReview = async (req, res) => {
  try {
    let result;
    const body = {
      id: parseInt(req?.query?.id),
    };
    const validationResult = reviewValidations.deleteReviewValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review();
    model.setId(body.id);
    result = await reviewDao.deleteReview(model);
    res.json({
      message: "Review successfully deleted!",
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