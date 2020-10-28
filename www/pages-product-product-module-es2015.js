(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-product-product-module"],{

/***/ "0bjF":
/*!*********************************************************!*\
  !*** ./src/app/pages/product/product-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProductPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageRoutingModule", function() { return ProductPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _product_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product.page */ "DT91");




const routes = [
    {
        path: '',
        component: _product_page__WEBPACK_IMPORTED_MODULE_3__["ProductPage"]
    }
];
let ProductPageRoutingModule = class ProductPageRoutingModule {
};
ProductPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProductPageRoutingModule);



/***/ }),

/***/ "AdMK":
/*!*************************************************!*\
  !*** ./src/app/pages/product/product.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdC5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "DT91":
/*!***********************************************!*\
  !*** ./src/app/pages/product/product.page.ts ***!
  \***********************************************/
/*! exports provided: ProductPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPage", function() { return ProductPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_product_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./product.page.html */ "jgig");
/* harmony import */ var _product_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product.page.scss */ "AdMK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _objects_product__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../objects/product */ "avki");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/product.service */ "Gdn9");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/loading.service */ "7ch9");









let ProductPage = class ProductPage {
    constructor(activatedRoute, productService, router, loadingService) {
        this.activatedRoute = activatedRoute;
        this.productService = productService;
        this.router = router;
        this.loadingService = loadingService;
        this.product = new _objects_product__WEBPACK_IMPORTED_MODULE_5__["Product"]('-1', '', '', 0, '');
        this.quantity = 1;
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.loadingService.showLoading(false);
            if (this.activatedRoute.snapshot.paramMap.has('id')) {
                const productId = this.activatedRoute.snapshot.paramMap.get('id');
                if (this.productService.getProductById(productId) !== undefined) {
                    this.product = this.productService.getProductById(productId);
                    this.productLoaded = true;
                }
            }
            else {
                yield this.router.navigate(['/products']);
            }
            yield this.loadingService.closeLoading();
        });
    }
};
ProductPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _services_product_service__WEBPACK_IMPORTED_MODULE_6__["ProductService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_7__["LoadingService"] }
];
ProductPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-product',
        template: _raw_loader_product_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_product_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProductPage);



/***/ }),

/***/ "dFHt":
/*!*************************************************!*\
  !*** ./src/app/pages/product/product.module.ts ***!
  \*************************************************/
/*! exports provided: ProductPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageModule", function() { return ProductPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _product_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product-routing.module */ "0bjF");
/* harmony import */ var _product_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product.page */ "DT91");







let ProductPageModule = class ProductPageModule {
};
ProductPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _product_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProductPageRoutingModule"]
        ],
        declarations: [_product_page__WEBPACK_IMPORTED_MODULE_6__["ProductPage"]]
    })
], ProductPageModule);



/***/ }),

/***/ "jgig":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/product/product.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-row>\n      <ion-back-button defaultHref=\"products\"></ion-back-button>\n      <ion-menu-button></ion-menu-button>\n      <ion-title>{{product.getTitle()}}</ion-title>\n    </ion-row>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding\">\n  <ion-card class=\"ion-margin\">\n    <ion-img *ngIf=\"productLoaded\" [src]=\"product.getImage()\"></ion-img>\n    <ion-skeleton-text *ngIf=\"!productLoaded\" animated=\"true\" style=\"height: 500px; width: 100%; margin: 0;\"></ion-skeleton-text>\n    <ion-card-header>\n      <ion-card-title *ngIf=\"productLoaded\">{{product.getTitle()}}</ion-card-title>\n      <ion-card-title *ngIf=\"!productLoaded\"><ion-skeleton-text animated=\"true\" style=\"width: 100px; height: 20px;\"></ion-skeleton-text></ion-card-title>\n      <ion-card-subtitle *ngIf=\"productLoaded\">{{product.getPrice() | currency:'EUR'}}</ion-card-subtitle>\n      <ion-card-subtitle *ngIf=\"!productLoaded\"><ion-skeleton-text animated=\"true\" style=\"width: 50px;\"></ion-skeleton-text></ion-card-subtitle>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-row>\n        <p *ngIf=\"productLoaded\">{{product.getDescription()}}</p>\n        <ion-skeleton-text *ngIf=\"!productLoaded\" style=\"width: 70%;\" animated=\"true\"></ion-skeleton-text>\n        <ion-skeleton-text *ngIf=\"!productLoaded\" style=\"width: 65%;\" animated=\"true\"></ion-skeleton-text>\n        <ion-skeleton-text *ngIf=\"!productLoaded\" style=\"width: 70%;\" animated=\"true\"></ion-skeleton-text>\n        <ion-skeleton-text *ngIf=\"!productLoaded\" style=\"width: 65%;\" animated=\"true\"></ion-skeleton-text>\n        <ion-skeleton-text *ngIf=\"!productLoaded\" style=\"width: 60%;\" animated=\"true\"></ion-skeleton-text>\n      </ion-row>\n      <ion-row>\n        <ion-col class=\"ion-no-padding\" size=\"5\">\n          <ion-item class=\"ion-no-padding\">\n            <ion-label position=\"fixed\">Amount</ion-label>\n            <ion-input inputmode=\"numberic\" min=\"1\" max=\"20\" type=\"number\" [(ngModel)]=\"quantity\"></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"7\">\n          <ion-button class=\"ion-float-end ion-no-margin\" fill=\"outline\">\n            <ion-icon slot=\"start\" name=\"cart\"></ion-icon>\n            Add to cart\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=pages-product-product-module-es2015.js.map