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
    private cartProducts: Map<string, CartProduct>;
    private readonly productsSubject: BehaviorSubject<CartProduct[]>;

    private readonly cartKey = 'PRODUCTS_IN_CART';

    constructor(private storage: Storage, private toastService: ToastService) {
        this.productsSubject = new BehaviorSubject<CartProduct[]>([]);
        this.cartProducts = new Map<string, CartProduct>();

        this.storage.get(this.cartKey).then(async products => {
            if (products !== null && products !== undefined && products.length > 0) {
                this.cartProducts = await this.readProductsFromStorage();
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

    async removeAllProductsFromCart() {
        this.cartProducts.clear();
        await this.updateProductsInCart();
    }

    async removeFromCart(product: CartProduct) {
        this.cartProducts.delete(product.getProduct().getId());
        await this.updateProductsInCart();
    }

    getProductsInCart() {
        return this.productsSubject;
    }

    async updateProductsInCart() {
        await this.writeProductsToStorage();
        this.notifySubscribers();
    }
    // end basic cart operations
    // ===============================================================================================================================
}
