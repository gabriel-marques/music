import { MySocket } from './../mySocket';
import { Translater } from './../translater';
import { GlobalService } from './../global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-lastadded',
  templateUrl: './tab-lastadded.page.html',
  styleUrls: ['./tab-lastadded.page.scss'],
})
export class TabLastaddedPage implements OnInit {

  constructor(private socket: MySocket,
              public globalTracks: GlobalService,
              translate : Translater)
              {
  }

  upvote(track: string) {
    this.socket.upvote(track);
  }

  downvote(track: string) {
    this.socket.downvote(track);
  }

  ionViewWillEnter() {
    this.socket.notificationNumber = 0;
  }

}
