import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {CheckoutGuard} from './guards/checkout.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'product',
        redirectTo: 'products'
    },
    {
        path: 'product/:id',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule)
    },
    {
        path: 'checkout',
        loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule),
        canActivate: [AuthGuard, CheckoutGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule)
    },
    {
        path: 'user/payment',
        loadChildren: () => import('./pages/user/payment/payment.module').then(m => m.PaymentPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/general',
        loadChildren: () => import('./pages/user/general/general.module').then(m => m.GeneralPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/address',
        loadChildren: () => import('./pages/user/address/address.module').then(m => m.AddressPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/password',
        loadChildren: () => import('./pages/user/password/password.module').then(m => m.PasswordPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'user/orders/:id',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderPageModule),
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
