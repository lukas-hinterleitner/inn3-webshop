import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

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
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
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
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'user/general',
        loadChildren: () => import('./pages/user/general/general.module').then(m => m.GeneralPageModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
    },
    //{
    //    path: '**'
    //},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
