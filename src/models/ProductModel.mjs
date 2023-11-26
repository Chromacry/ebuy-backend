export class Product {
	constructor(
			id,
			seller_id,
			product_name,
			product_description,
			product_image,
			product_quantity,
			sold_quantity,
			created_time
	) {
			this.id = id;
			this.seller_id = seller_id;
			this.product_name = product_name;
			this.product_description = product_description;
			this.product_image = product_image;
			this.product_quantity = product_quantity;
			this.sold_quantity = sold_quantity;
			this.created_time = created_time;
	}

	getId() {
			return this.id;
	}
	setId(id) {
			this.id = id;
	}

	getSellerId() {
			return this.seller_id;
	}
	setSellerId(seller_id) {
			this.seller_id = seller_id;
	}

	getProductName() {
			return this.product_name;
	}
	setProductName(product_name) {
			this.product_name = product_name;
	}

	getProductDescription() {
			return this.product_description;
	}
	setProductDescription(product_description) {
			this.product_description = product_description;
	}

	getProductImage() {
			return this.product_image;
	}
	setProductImage(product_image) {
			this.product_image = product_image;
	}

	getProductQuantity() {
			return this.product_quantity;
	}
	setProductQuantity(product_quantity) {
			this.product_quantity = product_quantity;
	}

	// getSoldQuantity() {
	// 		return this.sold_quantity;
	// }
	// setSoldQuantity(sold_quantity) {
	// 		this.sold_quantity = sold_quantity;
	// }

	getCreatedTime() {
			return this.created_time;
	}
	setCreatedTime(created_time) {
			this.created_time = created_time;
	}
}