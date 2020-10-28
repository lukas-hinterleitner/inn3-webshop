(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-user-payment-payment-module"], {
    /***/
    "L+ts":
    /*!******************************************************!*\
      !*** ./src/app/pages/user/payment/payment.page.scss ***!
      \******************************************************/

    /*! exports provided: default */

    /***/
    function LTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzZXIvcGF5bWVudC9wYXltZW50LnBhZ2Uuc2NzcyJ9 */";
      /***/
    },

    /***/
    "Pn1t":
    /*!**************************************************************!*\
      !*** ./src/app/pages/user/payment/payment-routing.module.ts ***!
      \**************************************************************/

    /*! exports provided: PaymentPageRoutingModule */

    /***/
    function Pn1t(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PaymentPageRoutingModule", function () {
        return PaymentPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _payment_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./payment.page */
      "mzMm");

      var routes = [{
        path: '',
        component: _payment_page__WEBPACK_IMPORTED_MODULE_3__["PaymentPage"]
      }];

      var PaymentPageRoutingModule = function PaymentPageRoutingModule() {
        _classCallCheck(this, PaymentPageRoutingModule);
      };

      PaymentPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], PaymentPageRoutingModule);
      /***/
    },

    /***/
    "eM/L":
    /*!******************************************************!*\
      !*** ./src/app/pages/user/payment/payment.module.ts ***!
      \******************************************************/

    /*! exports provided: PaymentPageModule */

    /***/
    function eML(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PaymentPageModule", function () {
        return PaymentPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _payment_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./payment-routing.module */
      "Pn1t");
      /* harmony import */


      var _payment_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./payment.page */
      "mzMm");

      var PaymentPageModule = function PaymentPageModule() {
        _classCallCheck(this, PaymentPageModule);
      };

      PaymentPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _payment_routing_module__WEBPACK_IMPORTED_MODULE_5__["PaymentPageRoutingModule"]],
        declarations: [_payment_page__WEBPACK_IMPORTED_MODULE_6__["PaymentPage"]]
      })], PaymentPageModule);
      /***/
    },

    /***/
    "i4kq":
    /*!********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/user/payment/payment.page.html ***!
      \********************************************************************************************/

    /*! exports provided: default */

    /***/
    function i4kq(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-row>\n      <ion-menu-button></ion-menu-button>\n      <ion-title>Payment</ion-title>\n    </ion-row>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n";
      /***/
    },

    /***/
    "mzMm":
    /*!****************************************************!*\
      !*** ./src/app/pages/user/payment/payment.page.ts ***!
      \****************************************************/

    /*! exports provided: PaymentPage */

    /***/
    function mzMm(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PaymentPage", function () {
        return PaymentPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_payment_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./payment.page.html */
      "i4kq");
      /* harmony import */


      var _payment_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./payment.page.scss */
      "L+ts");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var PaymentPage = /*#__PURE__*/function () {
        function PaymentPage() {
          _classCallCheck(this, PaymentPage);
        }

        _createClass(PaymentPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return PaymentPage;
      }();

      PaymentPage.ctorParameters = function () {
        return [];
      };

      PaymentPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-payment',
        template: _raw_loader_payment_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_payment_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], PaymentPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-user-payment-payment-module-es5.js.map