import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  track = '';

  constructor(private socket: Socket) {
    this.socket.connect(); // connect to server one time 
  }

  ngOnInit() {
  }

  // send a track to server
  addTrack() {
    this.socket.emit('add-track', { track: this.track, date: Date.now() });
    this.track = '';
  }
}
