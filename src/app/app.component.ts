import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private ns : NativeStorage,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.ns.getItem('user').then(_=>{
        this.rootPage= 'RoomPage';
      })
      .catch(_=>{
        this.rootPage = 'SigninPage';
      })
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

