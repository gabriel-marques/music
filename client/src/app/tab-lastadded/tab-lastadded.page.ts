import { Translater } from './../translater';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { GlobalService } from './../global.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab-lastadded',
  templateUrl: './tab-lastadded.page.html',
  styleUrls: ['./tab-lastadded.page.scss'],
})
export class TabLastaddedPage implements OnInit {

  constructor(private socket: Socket, public globalTracks: GlobalService, public localNotifications: LocalNotifications, translate : Translater) {
    // subscribe to events of new tracks from server
    this.getNewTrack().subscribe(message => {
      // add track to global variable
      globalTracks.addTrack(message);
      this.localNotifications.schedule({
        id: 1,
        title: 'New song added',
        text: message['track'],
        actions: [
          { id: 'plus', title: 'up' },
          { id: 'minus',  title: 'down' }
        ],
        foreground : true 
      });
    });

    this.localNotifications.on('plus').subscribe(notification => { console.log(notification); this.upvote(notification['text']);});
    this.localNotifications.on('minus').subscribe(notification => { console.log(notification); this.downvote(notification['text']);}); 

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

  upvote(track: string) {
    this.socket.emit('vote', { vote: "up", track: track });
  }

  downvote(track: string) {
    this.socket.emit('vote', { vote: "down", track: track });
  }

  ngOnInit() {
  }

}
