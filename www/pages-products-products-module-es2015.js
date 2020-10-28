(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-products-products-module"],{

/***/ "+jWH":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/products/products.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar>\n        <ion-row>\n            <ion-menu-button></ion-menu-button>\n            <ion-title>Products</ion-title>\n        </ion-row>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"ion-padding ion-justify-content-center\">\n    <ion-row>\n        <ion-searchbar show-cancel-button=\"focus\" cancel-button-icon=\"close\"></ion-searchbar>\n    </ion-row>\n\n    <ion-row *ngIf=\"!productsLoaded\">\n        <ion-col size-md=\"3\" size-sm=\"6\" size-xs=\"12\" *ngFor=\"let item of arr;\">\n            <ion-card class=\"ion-margin\">\n                <ion-skeleton-text animated=\"true\" style=\"width: 100%; height: 130px; margin: 0;\"></ion-skeleton-text>\n                <ion-card-header>\n                    <ion-skeleton-text animated=\"true\" style=\"width: 70%; height: 20px;\"></ion-skeleton-text>\n                    <ion-skeleton-text animated=\"true\" style=\"width: 20%;\"></ion-skeleton-text>\n                </ion-card-header>\n                <ion-card-content>\n                    <ion-skeleton-text animated=\"true\" style=\"width: 90%;\"></ion-skeleton-text>\n                    <ion-skeleton-text animated=\"true\" style=\"width: 20%;\"></ion-skeleton-text>\n                </ion-card-content>\n            </ion-card>\n        </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf=\"productsLoaded\">\n        <ion-col size-md=\"3\" size-sm=\"6\" size-xs=\"12\" *ngFor=\"let product of products\">\n            <ion-card [routerLink]=\"['/product', product.getId()]\" class=\"ion-margin\">\n                <ion-img [src]=\"product.getImage()\"></ion-img>\n                <ion-card-header>\n                    <ion-card-title>{{product.getTitle()}}</ion-card-title>\n                    <ion-card-subtitle>{{product.getPrice() | currency:'EUR'}}</ion-card-subtitle>\n                </ion-card-header>\n                <ion-card-content>\n                    {{product.getDescription() | slice: 0:50}} ...\n                </ion-card-content>\n            </ion-card>\n        </ion-col>\n    </ion-row>\n</ion-content>\n");

/***/ }),

/***/ "Kzwn":
/*!***********************************************************!*\
  !*** ./src/app/pages/products/products-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ProductsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsPageRoutingModule", function() { return ProductsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _products_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./products.page */ "b/5A");




const routes = [
    {
        path: '',
        component: _products_page__WEBPACK_IMPORTED_MODULE_3__["ProductsPage"]
    }
];
let ProductsPageRoutingModule = class ProductsPageRoutingModule {
};
ProductsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProductsPageRoutingModule);



/***/ }),

/***/ "a1ig":
/*!***************************************************!*\
  !*** ./src/app/pages/products/products.module.ts ***!
  \***************************************************/
/*! exports provided: ProductsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsPageModule", function() { return ProductsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _products_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./products-routing.module */ "Kzwn");
/* harmony import */ var _products_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./products.page */ "b/5A");







let ProductsPageModule = class ProductsPageModule {
};
ProductsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _products_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProductsPageRoutingModule"]
        ],
        declarations: [_products_page__WEBPACK_IMPORTED_MODULE_6__["ProductsPage"]]
    })
], ProductsPageModule);



/***/ }),

/***/ "b/5A":
/*!*************************************************!*\
  !*** ./src/app/pages/products/products.page.ts ***!
  \*************************************************/
/*! exports provided: ProductsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsPage", function() { return ProductsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_products_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./products.page.html */ "+jWH");
/* harmony import */ var _products_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./products.page.scss */ "tIlS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/product.service */ "Gdn9");
/* harmony import */ var _services_loading_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/loading.service */ "7ch9");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");







let ProductsPage = class ProductsPage {
    constructor(productService, loadingService, router) {
        this.productService = productService;
        this.loadingService = loadingService;
        this.router = router;
        this.arr = Array(10);
        this.productsLoaded = false;
        this.products = new Set();
    }
    getBase64ImageFromUrl(imageUrl) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const res = yield fetch(imageUrl);
            const blob = yield res.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    resolve(reader.result);
                }, false);
                reader.onerror = () => {
                    return reject(this);
                };
                reader.readAsDataURL(blob);
            });
        });
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.loadingService.showLoading(false);
            yield this.productService.getAllProducts().forEach(product => {
                this.products.add(product);
            });
            this.productsLoaded = true;
            yield this.loadingService.closeLoading();
        });
    }
};
ProductsPage.ctorParameters = () => [
    { type: _services_product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"] },
    { type: _services_loading_service__WEBPACK_IMPORTED_MODULE_5__["LoadingService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
ProductsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-products',
        template: _raw_loader_products_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_products_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProductsPage);



/***/ }),

/***/ "tIlS":
/*!***************************************************!*\
  !*** ./src/app/pages/products/products.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2R1Y3RzL3Byb2R1Y3RzLnBhZ2Uuc2NzcyJ9 */");

/***/ })

}]);
//# sourceMappingURL=pages-products-products-module-es2015.js.map