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
      user_id: req?.body?.userId,
      product_id: req?.body?.productId,
      review_rating: req?.body?.reviewRating,
      review_content: req?.body?.reviewContent,
      review_image: req?.body?.reviewImage,
      created_time: getDateTimeNowLocalISOString(),
    };
    const validationResult = reviewValidations.addReviewValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review(
      null,
      body.review_content,
      body.review_rating,
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
      product_id: parseInt(req?.query?.productId),
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
      review_content: req?.body?.reviewContent,
      review_rating: req?.body?.reviewRating,
      review_image: req?.body?.reviewImage,
    };
    const validationResult = reviewValidations.updateReviewValidator(body);
    if (validationResult) {
      res.json(validationResult);
      return;
    }
    const model = new Review(
      body.id,
      body.review_content,
      body.review_rating,
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

export const getReviewByReviewId = async (req, res) => {
  try {
    let result;
    const body = {
      id: parseInt(req?.query?.id),
    };
    const model = new Review();
    model.setId(body.id);
    result = await reviewDao.getReviewByReviewId(model);
    res.json({
      message: "Review successfully Retrieved!",
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