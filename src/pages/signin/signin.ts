import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  data = { nickname:"" };
  constructor(
    public nativeStorage:NativeStorage,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  enterNickname() {
    if(this.data.nickname==""){
      alert("Your name can't be empty!")
    }
    else{
      let newUser = firebase.database().ref(`users/`).push()
      newUser.set({
        nickname:this.data.nickname
      })
      this.nativeStorage.setItem('user',{
        nickname:this.data.nickname
      }).then(_=>{
        this.navCtrl.setRoot('RoomPage', {
          nickname: this.data.nickname
        });
      })
    }

  }

}
