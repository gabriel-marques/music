import { Observable } from 'rxjs/Observable';
import { GlobalService } from './../global.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Translater } from '../translater';

@Component({
  selector: 'app-tab-nexttracks',
  templateUrl: './tab-nexttracks.page.html',
  styleUrls: ['./tab-nexttracks.page.scss'],
})
export class TabNexttracksPage implements OnInit {

  constructor(private socket: Socket, public globalTracks: GlobalService, translate: Translater) { 
    this.getNewTrack().subscribe(message => {
      // add track to global variable
      globalTracks.addTrack(message);
    });

    // subscribe to upvotes
    this.getVote().subscribe(message => {
      globalTracks.updateVote(message);
    });

    // subscribe to get list at first time
    this.getList().subscribe(message => {
      // set the value of the track in the array
      for (let key in message) {
        globalTracks.addTrack(message[key]);
      }
    });

    // listen for deleted songs
    this.getDeletedSong().subscribe(message => {
      // look for track into array
      globalTracks.removeTrack(message);
    });
  }

   // create an observer to listen to events "new-track" from socket
   getDeletedSong() {
    let observable = new Observable(observer => {
      this.socket.on('deleteSong', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  // create an observer to listen to events "new-track" from socket
  getNewTrack() {
    let observable = new Observable(observer => {
      this.socket.on('new-track', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  // create an observer to listen to events "voteupdate" from socket
  getVote() {
    let observable = new Observable(observer => {
      this.socket.on('voteUpdate', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  // create an observer to listen to events "allTracks" from socket
  getList() {
    let observable = new Observable(observer => {
      this.socket.on('allTracks', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  ngOnInit() {
  }

  upvote(track: string) {
    this.socket.emit('vote', { vote: "up", track: track });
  }

  downvote(track: string) {
    this.socket.emit('vote', { vote: "down", track: track });
  }

  orderByVotes() {
    return this.globalTracks.tracks.sort((n1,n2) => n2['votes'] - n1['votes']);
  }

}
