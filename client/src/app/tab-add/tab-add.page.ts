import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  track = '';

  constructor(private socket: Socket, public localNotifications: LocalNotifications) {
    this.socket.connect(); // connect to server one time 
  }

  ngOnInit() {
  }

  // send a track to server
  addTrack() {
    this.socket.emit('add-track', { track: this.track, date: Date.now() });
    this.localNotifications.requestPermission();
    console.log(this.localNotifications.hasPermission());
    this.localNotifications.schedule({
      id: 1,
      title: 'New song added',
      text: this.track,
      foreground : true,
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no',  title: 'No' }
      ],
      icon: 'http://example.com/icon.png'
    });
    this.track = '';
  }
}
