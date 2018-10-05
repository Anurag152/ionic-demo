import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { ProductsByCategory } from '../pages/products-by-category/products-by-category';
import { ProductDetails } from '../pages/product-details/product-details';
import { IonicStorageModule } from '@ionic/storage';
import { Cart } from '../pages/cart/cart';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Checkout } from '../pages/checkout/checkout';
 


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';
import { HttpModule } from '@angular/http';
// import { HTTP } from '@ionic-native/http';
// import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategory,
    ProductDetails,
    Cart,
    Signup,
    Login,
    Checkout
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // HTTP,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategory,
    ProductDetails,
    Cart,
    Signup,
    Login,
    Checkout
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider
  ]
})
export class AppModule {}
