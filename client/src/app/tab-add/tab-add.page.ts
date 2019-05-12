import { MySocket } from './../mySocket';
import { Translater } from './../translater';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  track = '';

  constructor(private socket: MySocket,
              public localNotifications: LocalNotifications,
              translate : Translater) {
  }

  ngOnInit() {
  }

  // send a track to server
  addTrack() {
    this.socket.sendNewMusic(this.track);
    //this.localNotifications.requestPermission();
    this.track = '';
  }
}
