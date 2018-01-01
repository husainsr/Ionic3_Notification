import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { DatePicker } from "@ionic-native/date-picker";
import * as moment from 'moment';
declare var cordova: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title: any;
  description: any;
  date: any;

  constructor(public navCtrl: NavController,private alrtCtrl: AlertController,private datePicker: DatePicker) {

  }

  ionViewDidLoad(){
    let trimdate = new Date().toISOString()
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let datetoday = new Date().toISOString()
    // let currenttime = new Date().toLocaleTimeString()
    let hour = ""
    let minute = ""
    let second = ""
    if (hours < 10) {
      hour += "0" + hours + ":"
    } else {
      hour += hours + ":"
    }
    if (minutes < 10) {
      minute += "0" + minutes + ":"
    } else {
      minute += minutes + ":"
    }
    second += "00"

    let currenttime = hour + minute + second;
    this.date = trimdate.substring(0, 10) + " " + currenttime;
   }

   createnotification(){

       console.log("---Title---"+this.title+"---Description---"+this.description+"---Datetime---"+this.date);

       let dateobject = moment(this.date).toDate();
       let remindid = new Date().getUTCMilliseconds();


       let notification = {
         id: remindid,
         title: this.title,
         text: this.description,
         at: dateobject,
         forceShow: 'true',
         coldstart: false,
         foreground: true
       };

       cordova.plugins.notification.local.schedule(notification);

               let alert = this.alrtCtrl.create({
                 title: 'Notifications set',
                 buttons: ['Ok']
               });

               alert.present();
              }

              openCalendar(){

                   this.datePicker.show({
                     date: new Date(),
                     mode: 'datetime',
                     androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
                   }).then((date)=>{
                     let format = moment(date).format("YYYY-MM-DD HH:mm:ss");
                     this.date = format;
                   })


                 }

}
