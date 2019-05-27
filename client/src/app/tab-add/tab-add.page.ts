import { MySocket } from './../mySocket';
import { Translater } from './../translater';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  track = '';

  constructor(private socket: MySocket,
              private translate : Translater,
              private toastController: ToastController) {
  }

  ngOnInit() {
  }

  // send a track to server
  addTrack() {
    if (this.track != "") {
      this.socket.sendNewMusic(this.track);
      //this.localNotifications.requestPermission();
      this.track = '';
    }else{
      this.presentEmptyField();
    }
  }

  async presentEmptyField() {
    const toast = await this.toastController.create({
      message: this.translate.translateText("EMPTYFIELD"),
      duration: 1500
    });
    toast.present();
  }
}
