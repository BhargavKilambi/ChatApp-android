import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  users = [];
  cu:any;
ref = firebase.database().ref('users/');
  constructor(public ns:NativeStorage,
    public navCtrl: NavController, public navParams: NavParams) {
    this.ns.getItem('user').then((resp)=>{
      this.cu=resp.nickname
    })
    this.ref.on('value', resp => {
      this.users = [];
      this.users = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    

  }
  logout(){
    this.ns.remove('user').then(_=>{
      this.navCtrl.setRoot('SigninPage')
    })
  }


  joinRoom(name,key) {
    this.navCtrl.push('HomePage', {
      user_name:name,
      key:key,
      nickname:this.cu
    }).catch(e=>{
      alert(e)
    });
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
