import { Translater } from './translater';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MySocket {
  //used to automatically upvote a song if the user add it
  private lastTrackAddedByMe: string;
  public notificationNumber;
  //localNotifications : LocalNotifications;
  constructor(private socket: Socket,
    public globalTracks: GlobalService,
    private notif: LocalNotifications,
    private translate: Translater,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController, ) {

    // set notifications handlers for actions
    this.notif.on('plus').subscribe(notification => { console.log(notification); this.upvote(notification['text']); });
    this.notif.on('minus').subscribe(notification => { console.log(notification); this.downvote(notification['text']); });

    // reset list of songs
    this.globalTracks.removeAllTracks();
    // connect to server
    this.connectToServer();

    this.notificationNumber = 0;
    this.lastTrackAddedByMe = '';

    this.getNewTrack().subscribe(message => {
      // add track to global variable
      globalTracks.addTrack(message);
      if (this.lastTrackAddedByMe == this.globalTracks.getTrackName(message)) {
        this.upvote(this.globalTracks.getTrackName(message))
        this.lastTrackAddedByMe = '';
      } else {
        this.notificationNumber += 1;
        this.startNotif(message);
      }
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
      this.presentToast(message + this.translate.translateText("HASBEENREMOVED"))
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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
    var index = this.globalTracks.tracks.findIndex(t => t.track == track);
    switch (this.globalTracks.tracks[index].myvote) {
      case -1:
        this.socket.emit('vote', { vote: "up", track: track });
      //intentionnal falltrough
      case 0:
        this.globalTracks.tracks[index].myvote = 1;
        this.socket.emit('vote', { vote: "up", track: track });
        break;
      case 1:
        this.socket.emit('vote', { vote: "down", track: track });
        this.globalTracks.tracks[index].myvote = 0;
    }
  }

  downvote(track: string) {
    var index = this.globalTracks.tracks.findIndex(t => t.track == track);
    switch (this.globalTracks.tracks[index].myvote) {
      case 1:
        this.socket.emit('vote', { vote: "down", track: track });
      //intentionnal falltrough
      case 0:
        this.globalTracks.tracks[index].myvote = -1;
        this.socket.emit('vote', { vote: "down", track: track });
        break;
      case -1:
        this.socket.emit('vote', { vote: "up", track: track });
        this.globalTracks.tracks[index].myvote = 0;
    }
  }

  sendNewMusic(track: string, artist: string) {
    this.lastTrackAddedByMe = track;
    this.socket.emit('add-track', { track: track, date: Date.now(), artist: artist });
  }

  connectToServer() {
    this.socket.connect();
  }

  startNotif(message: any) {
    this.notif.schedule({
      id: 1,
      title: this.translate.translateText("NEWSONGADDED"),
      text: message['track'],
      actions: [
        { id: 'plus', title: this.translate.translateText("UP") },
        { id: 'minus', title: this.translate.translateText("DOWN") }
      ],
      foreground: true
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.translateText("SETTINGS") + "Lucas",
      animated: true,
      backdropDismiss: true,
      mode: "ios",
      buttons: [{
        text: 'Dummy server 1',
        icon: 'musical-note',
        handler: () => {
          this.presentToast(this.translate.translateText("NOTIMPLEMENTEDYET"));
        }
      }, {
        text: 'Dummy server 2',
        icon: 'musical-note',
        handler: () => {
          this.presentToast(this.translate.translateText("NOTIMPLEMENTEDYET"));
        }
      }, {
        text: this.translate.translateText("DISCONNECT"),
        role: 'destructive',
        icon: 'rocket',
        handler: () => {
          this.presentToast(this.translate.translateText("NOTIMPLEMENTEDYET"));
        }
      }, {
        text: this.translate.translateText("SHAREAPP"),
        icon: 'share',
        handler: () => {
          this.presentToast(this.translate.translateText("NOTIMPLEMENTEDYET"));
        }
      }, {
        text: this.translate.translateText("QUITAPP"),
        role: 'destructive',
        icon: 'close-circle-outline',
        handler: () => {
          this.presentToast(this.translate.translateText("NOTIMPLEMENTEDYET"));
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
}
