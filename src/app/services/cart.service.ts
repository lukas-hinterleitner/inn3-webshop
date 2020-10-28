import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {CartProduct} from '../objects/cart-product';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../objects/product';
import {ToastService} from './toast.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private products: Map<string, CartProduct>;
    private readonly productsSubject: BehaviorSubject<CartProduct[]>;

    private readonly cartKey = 'PRODUCTS_IN_CART';

    constructor(private storage: Storage, private toastService: ToastService) {
        this.productsSubject = new BehaviorSubject<CartProduct[]>([]);
        this.products = new Map<string, CartProduct>();

        this.storage.get(this.cartKey).then(async products => {
            if (products !== null && products !== undefined && products.length > 0) {

                this.products = await this.readProductsFromStorage();

            } else {
                console.log("cart service: no products stored");
            }

            this.notifySubscribers();

        });
    }

    private notifySubscribers() {
        this.productsSubject.next(this.productsToArray());
    }

    // begin utility functions
    // ===============================================================================================================================
    private productsToArray() {
        return Array.from(this.products.values());
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
    // end utility functions
    // ===============================================================================================================================


    // begin storage operations
    // ===============================================================================================================================
    private async writeProductsToStorage() {
        await this.storage.set(this.cartKey, this.productsToArray());
    }

    private async readProductsFromStorage() { // parser
        const items = await this.storage.get(this.cartKey);
        const cartProducts: CartProduct[] = [];

        if (items.length > 0){
            items.forEach((item, index) => {
                const p = item.product;
                cartProducts[index] = new CartProduct(new Product(p.id, p.title, p.description, p.price, p.image), item.quantity);
            });
        }

        return this.productsFromArray(cartProducts);
    }
    // end storage operations
    // ===============================================================================================================================


    // begin basic cart operations
    // ===============================================================================================================================
    async addToCart(cartProduct: CartProduct) {
        if (this.products.has(cartProduct.getProduct().getId())) { // product already in cart
            // TODO
        } else {
            this.products.set(cartProduct.getProduct().getId(), cartProduct); // add product to cart
            await this.toastService.showToast(2000, '',
                cartProduct.getProduct().getTitle() + ' added to cart. Amount: ' + cartProduct.getQuantitiy(),
                'success');
        }

        await this.writeProductsToStorage();
        this.notifySubscribers();
    }

    async removeFromCart(product: CartProduct) {
        this.products.delete(product.getProduct().getId());
        await this.writeProductsToStorage();
        this.notifySubscribers();
    }

    getProductsInCart() {
        return this.productsSubject;
    }
    // end basic cart operations
    // ===============================================================================================================================
}
