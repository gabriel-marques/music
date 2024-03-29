import { AppComponent } from './../app.component';
import { MySocket } from './../mySocket';
import { GlobalService } from './../global.service';
import { Component, OnInit } from '@angular/core';
import { Translater } from '../translater';

@Component({
  selector: 'app-tab-nexttracks',
  templateUrl: './tab-nexttracks.page.html',
  styleUrls: ['./tab-nexttracks.page.scss'],
})
export class TabNexttracksPage {

  constructor(public socket: MySocket,
    public globalTracks: GlobalService,
    public translate: Translater) {

  }

  upvote(track: string) {
    this.socket.upvote(track);
  }

  downvote(track: string) {
    this.socket.downvote(track);
  }

  orderByVotes() {
    return this.globalTracks.tracks.sort((n1, n2) => n2['votes'] - n1['votes']);
  }

  /*getMinusButtonColor(track[]: string){
    if (track.myvote ){
      return 
    }
      ? 'default' : 'danger'
  }*/

}
