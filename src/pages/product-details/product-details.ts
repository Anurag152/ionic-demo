import { Component } from '@angular/core';
// import { NavController, Slides, ToastController } from 'ionic-angular';
import { NavController, NavParams, ToastController, ModalController   } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';
import { Cart } from '../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  WooCommerce: any;
  reviews: any[];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public storage: Storage, public toastctrl: ToastController,
     public modalCtrl: ModalController ) {

    this.product = this.navParams.get("product");
    console.log(this.product);
    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_2a54c288858a3153c35269922f40e1123779e528",
      consumerSecret: "cs_1fb228025805af5e70dc8440d3801056f184ae56",
    }); 

    this.WooCommerce.getAsync('products/'+this.product.id+ '/reviews').then((data)=> {

      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    }, (err)=> {
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }
  addToCart(product){
    this.storage.get("cart").then((data) => {

      if(data == null || data.length == 0){

        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });
      } else{
        let added = 0;

        for(let i=0; i < data.length; i++){

          if(product.id == data[i].product.id){

            console.log("product is already in the cart");

            let qty = data[i].qty;

            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount + parseFloat(data[i].product.price));
            added = 1;
          }
        }
        if(added == 0){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });

        }


      }

      this.storage.set("cart", data).then( ()=>{

        console.log("cart Updated");
        console.log(data);

        this.toastctrl.create({
          message: "cart Updated",
          duration: 3000
        }).present();
      })
      

    })
  }
  openCart(){
    this.modalCtrl.create(Cart).present();

  }
}

