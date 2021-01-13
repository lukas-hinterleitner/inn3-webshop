import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {CartProduct} from '../objects/cart-product';
import {ReplaySubject} from 'rxjs';
import {Product} from '../objects/product';
import {ToastService} from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartProducts: Map<string, CartProduct>;
    private readonly productsSubject: ReplaySubject<CartProduct[]>;

    private readonly cartKey = 'PRODUCTS_IN_CART';

    constructor(private storage: Storage, private toastService: ToastService) {
        this.productsSubject = new ReplaySubject<CartProduct[]>(1);
        this.cartProducts = new Map<string, CartProduct>();

        this.storage.get(this.cartKey).then(async products => {
            if (products !== null && products !== undefined && products.length > 0) {
                this.cartProducts = await this.readProductsFromStorage();
            }

            this.notifySubscribers();
        });
    }

    // ===============================================================================================================================
    async addToCart(cartProduct: CartProduct) {
        if (this.cartProducts.has(cartProduct.getProduct().getId())) { // product already in cart
            await this.toastService.showToast(2000, '', 'Product already in cart.', 'primary');
        } else {
            this.cartProducts.set(cartProduct.getProduct().getId(), cartProduct); // add product to cart
            await this.toastService.showToast(2000, '',
                cartProduct.getProduct().getTitle() + ' added to cart. Amount: ' + cartProduct.getQuantity(),
                'success');
        }

        await this.updateProductsInCart();
    }

    // begin utility functions

    async removeAllProductsFromCart() {
        this.cartProducts.clear();
        await this.updateProductsInCart();
    }

    async removeFromCart(product: CartProduct) {
        this.cartProducts.delete(product.getProduct().getId());
        await this.updateProductsInCart();
    }

    // end utility functions
    // ===============================================================================================================================


    // begin storage operations

    getProductsInCart() {
        return this.productsSubject;
    }

    async updateProductsInCart() {
        await this.writeProductsToStorage();
        this.notifySubscribers();
    }

    // end storage operations
    // ===============================================================================================================================


    // begin basic cart operations

    private notifySubscribers() {
        this.productsSubject.next(this.productsToArray());
    }

    // ===============================================================================================================================
    private productsToArray() {
        return Array.from(this.cartProducts.values());
    }

    private productsFromArray(products: CartProduct[]) {
        const productMap = new Map<string, CartProduct>();

        if (products.length > 0) {
            products.forEach(product => {
                productMap.set(product.getProduct().getId(), product);
            });
        }

        return productMap;
    }

    // ===============================================================================================================================
    private async writeProductsToStorage() {
        await this.storage.set(this.cartKey, this.productsToArray());
    }

    private async readProductsFromStorage() { // parser
        const items = await this.storage.get(this.cartKey);
        const cartProducts: CartProduct[] = [];

        if (items.length > 0) {
            items.forEach((item, index) => {
                const p = item.product;
                cartProducts[index] = new CartProduct(new Product(p.id, p.title, p.description, p.price, p.image), item.quantity);
            });
        }

        return this.productsFromArray(cartProducts);
    }

    // end basic cart operations
    // ===============================================================================================================================
}
