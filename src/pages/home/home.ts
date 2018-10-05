import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';
import { List } from 'ionic-angular';


import * as WC from 'woocommerce-api';

    

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any; 
  Products: any[]; 
  moreItem: any[];
  page: number;

 
  @ViewChild('proSlides') proSlides: Slides;
  @ViewChild(List) list: List;

  constructor(public navCtrl: NavController, public toastctrl: ToastController) {

    this.page = 2;
    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_2a54c288858a3153c35269922f40e1123779e528",
      consumerSecret: "cs_1fb228025805af5e70dc8440d3801056f184ae56",
      // wpAPI: true,
      // version: 'wc/v2'
      
    }); 
    
    this.loadMoreProducts(null);
    
    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.Products = JSON.parse(data.body).products;
      console.log(this.Products);
      // console.log(this.Products[0]._embedded["wp:featuredmedia"][0].source_url)

      
    
     

    }, (err) => { 
      console.log(err)
    })


    
    
  }

  ionViewDidLoad(){
    setInterval(()=> {

      if(this.proSlides.getActiveIndex() == this.proSlides.length() - 1)
        this.proSlides.slideTo(0);



      this.proSlides.slideNext();
    } ,3000)
 }

 loadMoreProducts(event){
   console.log(event);
   if(event == null){
     this.page = 2;
     this.moreItem = [];

   }
    else

      this.page ++;
      // this.moreItem = [];

  this.WooCommerce.getAsync("products?page=" +this.page).then( (data) => {
    console.log(JSON.parse(data.body));
    this.moreItem = this.moreItem.concat(JSON.parse(data.body).products);
    // console.log(this.moreItem);
    // console.log(this.Products[0]._embedded["wp:featuredmedia"][0].source_url)

    if(event != null)
    {
      event.complete(); 
    }

    if(JSON.parse(data.body).products.length < 10){
      event.enable(false);

      this.toastctrl.create({
        message: "No More Products!",
        duration: 5000
      }).present();
    }
  
   

  }, (err) => { 
    console.log(err)
  })

 } 
 openProductPage(item){
   this.navCtrl.push(ProductDetails, {"product": item} );
 }
}
