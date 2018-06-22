import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'firebase/app';
import { MyApp } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage';

var config = {
  apiKey: "AIzaSyD6IU5SDq9TpEGUlYpDTHNZmbufeCMT_YM",
  authDomain: "chatapp-29b3c.firebaseapp.com",
  databaseURL: "https://chatapp-29b3c.firebaseio.com",
  projectId: "chatapp-29b3c",
  storageBucket: "chatapp-29b3c.appspot.com",
  messagingSenderId: "252207630702"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
