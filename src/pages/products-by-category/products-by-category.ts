import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { List } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategory {

  WooCommerce: any; 
  products: any[]; 
  page: number;
  category: any;

  @ViewChild(List) list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastctrl: ToastController) {

    this.page = 1;
    this.category = this.navParams.get("category");
    console.log(this.category);

    // this.page = 2;
    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_2a54c288858a3153c35269922f40e1123779e528",
      consumerSecret: "cs_1fb228025805af5e70dc8440d3801056f184ae56",
      // wpAPI: true,
      // version: 'wc/v2'
      
    }); 

    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
      console.log(this.products);
      // console.log(this.Products[0]._embedded["wp:featuredmedia"][0].source_url)

      
    
     

    }, (err) => { 
      console.log(err)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategory'); 
  }

  loadMoreProducts(event){
    this.page ++;
    console.log("Getting page " + this.page);
  
 
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" +this.page).then( (data) => {
     
     let temp = (JSON.parse(data.body).products);
     this.products = this.products.concat(JSON.parse(data.body).products)
     console.log(this.products);
     event.complete(); 

     if(temp.length < 10){
       event.enable(false);
       this.toastctrl.create({
        message: "No More Products!",
        duration: 5000
      }).present();
    }
 
   })
 
  } 
  openProductPage(item){
    this.navCtrl.push(ProductDetails, {"product": item} );
  }
}
