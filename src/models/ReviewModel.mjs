export class Review {
  constructor(
    id,
    content,
    rating,
    user_id,
    product_id,
    created_time,
    review_image
  ) {
    this.id = id;
    this.content = content;
    this.rating = rating;
    this.user_id = user_id;
    this.product_id = product_id;
    this.created_time = created_time;
    this.review_image = review_image;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getContent() {
    return this.content;
  }
  setContent(content) {
    this.content = content;
  }

  getRating() {
    return this.rating;
  }
  setRating(rating) {
    this.rating = rating;
  }

  getUserId() {
    return this.user_id;
  }
  setUserId(user_id) {
    this.user_id = user_id;
  }

  getProductId() {
    return this.product_id;
  }
  setProductId(product_id) {
    this.product_id = product_id;
  }

  getReviewImage() {
    return this.review_image;
  }
  setReviewImage(review_image) {
    this.review_image = review_image;
  }

  getCreatedTime() {
    return this.created_time;
  }
  setCreatedTime(created_time) {
    this.created_time = created_time;
  }
}
