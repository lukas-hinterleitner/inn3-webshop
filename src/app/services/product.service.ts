import {Injectable} from '@angular/core';

import {Product} from '../objects/product';
import {HttpClient} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../utilities/unsubscribe-on-destroy-adapter';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends UnsubscribeOnDestroyAdapter {
    private readonly products: Map<string, Product>;

    constructor(private http: HttpClient) {
        super();

        this.products = new Map<string, Product>();

        const newProduct = new Product('99999', 'NFC Tags',
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
         aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
         eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.`,
            19.99, '../../../assets/images/sample-product.jpeg');

        // this.products.set(newProduct.getId(), newProduct);
    }

    async getAllProducts() {
        // TODO get products from server
        const products = await this.http.get('https://inn3-webshop.lukas-hinterleitner.at/api/products').toPromise() as [];

        products.forEach(item => {
            const tempProduct = this.createProductFromApiEntity(item);

            this.products.set(tempProduct.getId(), tempProduct);
        });

        return Array.from(this.products.values());
    }

    async getProductById(id: string) {
        const product = await this.http.get('https://inn3-webshop.lukas-hinterleitner.at/api/products/' + id).toPromise();

        // @ts-ignore
        return new Product(product.id, product.name, product.description, product.price,
            // @ts-ignore
            'https://inn3-webshop.lukas-hinterleitner.at/api' + product.imgPath);
    }

    private createProductFromApiEntity(product) {
        return new Product(product.id, product.name, product.description, product.price,
            'https://inn3-webshop.lukas-hinterleitner.at/api' + product.imgPath);
    }
}
