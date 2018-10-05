import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;

  constructor() {
    this.Woocommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_a2477eb3923f9f0c88df7cbb6295908f46e30c32",
      consumerSecret: "cs_a0eca8ee548082e5d898c3b202f19298f5f3f1e3"
    });

    this.WoocommerceV2 = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_a2477eb3923f9f0c88df7cbb6295908f46e30c32",
      consumerSecret: "cs_a0eca8ee548082e5d898c3b202f19298f5f3f1e3",
      wpAPI: true,
      version: "wc/v2"
    });
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }

}