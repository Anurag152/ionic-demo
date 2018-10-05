import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
// import { HttpClient } from  '@angular/common/http';
// import { Observable } from  'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage,public alertCtrl: AlertController) {

    this.username = "";
    this.password = "";
  }

  login(){

    this.http.get("http://localhost/wordpress/wp-json/custom-plugin/login?&username=" + this.username + "&password=" + this.password)
    .map(res => res.json()).subscribe( (data) => {
      
        console.log(data);
      //  console.log(JSON.parse(JSON.stringify(res)));

      let response = data;
      console.log(response);

      if(!response.data.ID){
        // console.log(response.data.user_login)
        this.toastCtrl.create({
          message: "hello",
          duration: 5000
        }).present();
        return;
      }
      this.storage.set("userLoginInfo", response).then( (data) =>{
        //  console.log(data.body);

        this.alertCtrl.create({
          title: "Login Successful",
          message: "You have been logged in successfully.",
          buttons: [{
            text: "OK",
            handler: () => {

              // this.events.publish("updateMenu");

              if(this.navParams.get("next")){
                this.navCtrl.push(this.navParams.get("next"));
              } else {
                this.navCtrl.pop();
              }             
            }
          }]
        }).present();


      })


    
    })
  }
  

}
