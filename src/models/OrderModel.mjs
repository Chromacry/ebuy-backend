export class Order {
  constructor(
    id,
    product_id,
    user_id,
    order_quantity,
    order_status,
    created_time,
    tracking_number,
    product_price,
    limit,
    offset,
  ) {
    this.id = id;
    this.product_id = product_id;
    this.user_id = user_id;
    this.order_quantity = order_quantity;
    this.order_status = order_status;
    this.created_time = created_time;
    this.tracking_number = tracking_number;
    this.product_price = product_price;
    this.limit = limit;
    this.offset = offset;
  }

  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }

  getProductId() {
    return this.product_id;
  }
  setProductId(product_id) {
    this.product_id = product_id;
  }

  getUserId() {
    return this.user_id;
  }
  setUserId(user_id) {
    this.user_id = user_id;
  }

  getOrderQuantity() {
    return this.order_quantity;
  }
  setOrderQuantity(order_quantity) {
    this.order_quantity = order_quantity;
  }

  getOrderStatus() {
    return this.order_status;
  }
  setOrderStatus(order_status) {
    this.order_status = order_status;
  }

  getCreatedTime() {
    return this.created_time;
  }
  setCreatedTime(created_time) {
    this.created_time = created_time;
  }
  getTrackingNumber() {
    return this.tracking_number;
  }
  setTrackingNumber(tracking_number) {
    this.tracking_number = tracking_number;
  }
  getProductPrice() {
    return this.product_price;
  }
  setProductPrice(product_price) {
    this.product_price = product_price;
  }
  getLimit() {
		return this.limit;
	}
	setLimit(limit) {
			this.limit = limit;
	}
	getOffset() {
		return this.offset;
	}
	setOffset(offset) {
			this.offset = offset;
	}
  // getInvoiceNumber() {
  //   return this.tracking_number;
  // }
  // setInvoiceNumber(invoice_number) {
  //   this.tracking_number = invoice_number;
  // }
}
