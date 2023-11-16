import { STATUS_CODES } from "../constants/GlobalConstants.mjs";
import { ReviewDao } from "../dao/ReviewDao.mjs";
import { Review } from "../models/ReviewModel.mjs";

const reviewDao = new ReviewDao();
export const addReview = (req, res) => {
  try {
    var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    console.log(localISOTime);
    const model = new Review(
      null,
      req.body.content,
      req.body.rating,
      req.body.user_id,
      req.body.product_id,
      localISOTime,
      req.body.review_image
    );
    console.log(model);
    reviewDao.addReview(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message: "Successfully added Review!",
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

export const getProductReviews = (req, res) => {
  try {
    const model = new Review();
    model.setProductId(req.params.id);
    console.log(model.getProductId());
    reviewDao.getProductReviews(model, (error, result) => {
      if (error) throw new Error(error);
      res.json({
        message: "Successfully retrieved reviews!",
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
