(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-user-general-general-module"],{

/***/ "IFh5":
/*!**************************************************************!*\
  !*** ./src/app/pages/user/general/general-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: GeneralPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralPageRoutingModule", function() { return GeneralPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./general.page */ "ixX8");




const routes = [
    {
        path: '',
        component: _general_page__WEBPACK_IMPORTED_MODULE_3__["GeneralPage"]
    }
];
let GeneralPageRoutingModule = class GeneralPageRoutingModule {
};
GeneralPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GeneralPageRoutingModule);



/***/ }),

/***/ "Qkg1":
/*!******************************************************!*\
  !*** ./src/app/pages/user/general/general.module.ts ***!
  \******************************************************/
/*! exports provided: GeneralPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralPageModule", function() { return GeneralPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _general_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./general-routing.module */ "IFh5");
/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./general.page */ "ixX8");







let GeneralPageModule = class GeneralPageModule {
};
GeneralPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _general_routing_module__WEBPACK_IMPORTED_MODULE_5__["GeneralPageRoutingModule"]
        ],
        declarations: [_general_page__WEBPACK_IMPORTED_MODULE_6__["GeneralPage"]]
    })
], GeneralPageModule);



/***/ }),

/***/ "ixX8":
/*!****************************************************!*\
  !*** ./src/app/pages/user/general/general.page.ts ***!
  \****************************************************/
/*! exports provided: GeneralPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralPage", function() { return GeneralPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_general_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./general.page.html */ "yocn");
/* harmony import */ var _general_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general.page.scss */ "rFv5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let GeneralPage = class GeneralPage {
    constructor() { }
    ngOnInit() {
    }
};
GeneralPage.ctorParameters = () => [];
GeneralPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-general',
        template: _raw_loader_general_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_general_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], GeneralPage);



/***/ }),

/***/ "rFv5":
/*!******************************************************!*\
  !*** ./src/app/pages/user/general/general.page.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvZ2VuZXJhbC9nZW5lcmFsLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "yocn":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/general/general.page.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-row>\n      <ion-menu-button></ion-menu-button>\n      <ion-title>General</ion-title>\n    </ion-row>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=pages-user-general-general-module-es2015.js.map