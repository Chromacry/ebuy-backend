export class Order {
	constructor(
			id,
			product_id,
			user_id,
			order_quantity,
			order_status,
			created_time
	) {
			this.id = id;
			this.product_id = product_id;
			this.user_id = user_id;
			this.order_quantity = order_quantity;
			this.order_statue = order_status;
			this.created_time = created_time;
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
}