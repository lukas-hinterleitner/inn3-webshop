import {Component, OnInit, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../objects/product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
    public product: Product;
    public quantity: number;

    constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
        this.quantity = 1;
    }

    async ngOnInit() {
        if (this.activatedRoute.snapshot.paramMap.has('id')) {
            const productId = this.activatedRoute.snapshot.paramMap.get('id');

            if (this.productService.getProductById(productId) !== undefined) {
                this.product = this.productService.getProductById(productId);
            }
        } else {
            await this.router.navigate(['/products']);
            console.log("navigated");
        }
    }
}
