import { Translater } from './translater';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'; 

@Injectable({
  providedIn: 'root'
})
export class MySocket {

	//localNotifications : LocalNotifications;
  constructor(private socket: Socket,
              public globalTracks : GlobalService,
              private notif : LocalNotifications,
              private translate : Translater) {

    // set notifications handlers for actions
    this.notif.on('plus').subscribe(notification => { console.log(notification); this.upvote(notification['text']);});
    this.notif.on('minus').subscribe(notification => { console.log(notification); this.downvote(notification['text']);});

    // reset list of songs
    this.globalTracks.removeAllTracks();
    // connect to server
    this.connectToServer();

    this.getNewTrack().subscribe(message => {
      // add track to global variable
      globalTracks.addTrack(message);
      this.startNotif(message);
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

  upvote(track: string) {
    this.socket.emit('vote', { vote: "up", track: track });
  }

  downvote(track: string) {
    this.socket.emit('vote', { vote: "down", track: track });
  }

sendNewMusic(track: string){
    this.socket.emit('add-track', { track: track, date: Date.now() });
  }

  connectToServer(){
    console.log("I'm throwed !!!!");
    this.socket.connect();  
  }

  startNotif(message : any) {
    this.notif.schedule({
      id: 1,
      title: this.translate.translateText("NEWSONGADDED"),
      text: message['track'],
      actions: [
        { id: 'plus', title: this.translate.translateText("UP")},
        { id: 'minus', title: this.translate.translateText("DOWN") }
      ],
      foreground: true
    });
  }
}
