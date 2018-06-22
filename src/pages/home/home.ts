import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content  } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;
  data = { type:'', nickname:'', message:'',user_name:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.nickname =  this.navParams.get("nickname") as string;
    this.data.user_name = this.navParams.get("user_name") as string;
    this.data.type='message';
    let joinData = firebase.database().ref('chatrooms/'+this.nickname+this.data.user_name+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' joined the chat.',
      sendDate:Date()
    });
    this.data.message = '';
    firebase.database().ref('chatrooms/'+this.nickname+this.data.user_name+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  ionViewDidLoad() {
    
  }
  ionViewWillLeave(){
    let exitData = firebase.database().ref('chatrooms/'+this.nickname+this.data.user_name+'/chats').push();
  exitData.set({
    type:'exit',
    user:this.nickname,
    message:this.nickname+' has exited the chat.',
    sendDate:Date()
  });

  this.offStatus = true;
  }
  sendMessage() {
    if(this.data.message==''){
      alert("Enter some text")
    }
    else{
      let newData = firebase.database().ref('chatrooms/'+this.nickname+this.data.user_name+'/chats').push();
      newData.set({
        type:this.data.type,
        user:this.data.nickname,
        message:this.data.message,
        sendDate:Date()
      });
      this.data.message = '';
    }

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
