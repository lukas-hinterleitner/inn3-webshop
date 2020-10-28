import {Product} from './product';

export class CartProduct {
    private readonly product: Product;
    private quantity: number;

    constructor(product_: Product, quantity_: number) {
        this.product = product_;
        this.quantity = quantity_ > 0 ? quantity_ : 0;
    }

    getProduct() {
        return this.product;
    }

    getQuantitiy() {
        return this.quantity;
    }

    changeQuantity(quantity_: number) {
        if (quantity_ > 0) {
            this.quantity = quantity_;
        }
    }
}
