import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
  WooCommerce: any;
  newOrder: any = {};
  WooCommerce1: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      // { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

      this.WooCommerce = WC({
        url: "http://localhost/wordpress",
        consumerKey: "ck_2a54c288858a3153c35269922f40e1123779e528",
        consumerSecret: "cs_1fb228025805af5e70dc8440d3801056f184ae56",
        
        
      }); 

      this.WooCommerce1 = WC({
        url: "http://localhost/wordpress",
        consumerKey: "ck_2a54c288858a3153c35269922f40e1123779e528",
        consumerSecret: "cs_1fb228025805af5e70dc8440d3801056f184ae56",
        
        wpAPI: true,
        
        version: 'wc/v2'
        
        
          
      }); 

      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        this.userInfo = userLoginInfo.data;

         let email = userLoginInfo.data.user_email;
        // let id = userLoginInfo.data.ID;

      this.WooCommerce.getAsync("customers/email/"+email).then((data) => {

        this.newOrder = JSON.parse(data.body).customer;
        console.log(this.newOrder);

      })
      })
  
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }

  }

  placeOrder(){

     let orderItems: any[] = [];
     let data: any = {};

     let paymentData: any = {};

     this.paymentMethods.forEach( (element, index) => {
       if(element.method_id == this.paymentMethod){
         paymentData = element;
       }
     });

     data = {
       payment_details: {
         method_id: paymentData.method_id,
         method_title: paymentData.method_title,
         set_paid: true

       },

       billing: this.newOrder.billing_address,
       shipping: this.newOrder.shipping_address,
       customer_id: this.userInfo.ID || '',
       line_items: orderItems
     };

     if(paymentData.method_id == "paypal"){
       //TODO
     } else {
       this.storage.get("cart").then( (cart) => {
         cart.forEach( (element, index) => {
           orderItems.push({
             product_id: element.product_id,
             quantity: element.qty


           });

         });

         data.line_items = orderItems;

         let orderData: any = {};

         orderData.order = data;

         this.WooCommerce1.postAsync('orders', orderData).then( (data) => {
           console.log(JSON.parse(data.body).order)


       })
     })

    }

  }


  

}
