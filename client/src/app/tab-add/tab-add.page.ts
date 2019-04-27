import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-tab-add',
  templateUrl: './tab-add.page.html',
  styleUrls: ['./tab-add.page.scss'],
})
export class TabAddPage implements OnInit {

  track = '';

  constructor( private socket: Socket) { }

  ngOnInit() {
  }

  addTrack(){
    this.socket.connect();
    this.socket.emit('add-track', this.track);
  }
}
