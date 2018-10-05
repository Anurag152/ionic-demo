import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
// import {Http } from '@angular/http';

import * as WC from 'woocommerce-api';
// import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;
  WooCommerce1: any;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;

      

    // this.WooCommerce = WP.init(); 

  this.WooCommerce = WC({
    url: "http://localhost/wordpress",
    consumerKey: "ck_99db33e98dbb60ccc0102145c3054454fb204197",
    consumerSecret: "cs_592dd2382f3e72249cff15007e220285adcedf8e",
    // oauth_signature_method:'HMAC-SHA1',
    // wpAPI: true,
    // version: 'WC/v2'
    
  }); 

  this.WooCommerce1 = WC({
    url: "http://localhost/wordpress",
    consumerKey: "ck_99db33e98dbb60ccc0102145c3054454fb204197",
    consumerSecret: "cs_592dd2382f3e72249cff15007e220285adcedf8e",
    
    wpAPI: true,
    
    version: 'wc/v2',
    queryStringAuth: true ,
    port: 80,
    verifySsl: false,
    
      
  }); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  checkEmail(){

    let validEmail = false;

    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(this.newUser.email)){
      //email looks valid
      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then( (data) => {
        let res = (JSON.parse(data.body));

        if(res.errors){
          validEmail = true;

          this.toastCtrl.create({
            message: "Congratulations. Email is good to go.",
            duration: 3000
          }).present();

        }   
        else {
          validEmail = false;

          this.toastCtrl.create({
            message: "Email already registered. Please check.",
            showCloseButton: true
          }).present();
        }

        console.log(validEmail);

      })



    } 
    else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Invalid Email. Please check.",
        showCloseButton: true
      }).present();
      console.log(validEmail);
    }

  }


  signup(){

  
     
  
    let customer = {
    "email": this.newUser.email,
    "first_name": this.newUser.first_name,
    "last_name": this.newUser.last_name,
    "username": this.newUser.username,
    "password": this.newUser.password,
    "billing": {
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "company": "",
      "address_1": this.newUser.billing_address.address_1,
      "address_2": this.newUser.billing_address.address_2,
      "city": "Hazipur",
      "state": "Bihar",
      "postcode": this.newUser.billing_address.postcode,
      "country": "India",
      "email": this.newUser.email,
      "phone": this.newUser.billing_address.phone
    },
    "shipping": {
      "first_name": this.newUser.first_name,
      "last_name": this.newUser.last_name,
      "company": "",
      "address_1": this.newUser.shipping_address.address_1,
      "address_2": this.newUser.shipping_address.address_2,
      "city": "Hazipur",
      "state": "Bihar",
      "postcode": this.newUser.shipping_address.postcode,
      "country": "India"
    }
  }

  if(this.billing_shipping_same){
    this.newUser.shipping_address = this.newUser.billing_address;
  }   
  
  this.WooCommerce1.postAsync('customers?_method=POST', customer).then( (data) => {
    let response = (JSON.parse(data.body));
    console.log(response);

    if(response.id){
      this.alertCtrl.create({
        title: "Account Created",
        message: "Your account has been created successfully! Please login to proceed.",
        buttons: [{
          text: "Login",
          handler: ()=> {
            //TODO
          } 
        }]
      }).present();
    } else if(response.errors){
      this.toastCtrl.create({
        message: response.errors[0].message,
        showCloseButton: true
      }).present();
    }
  });

  

}
}
