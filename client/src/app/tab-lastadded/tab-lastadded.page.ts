import { Component, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tab-lastadded',
  templateUrl: './tab-lastadded.page.html',
  styleUrls: ['./tab-lastadded.page.scss'],
})
export class TabLastaddedPage implements OnInit {

messages = [];

  constructor(private socket: Socket) {

    // subscribe to events of new messages from server
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  
    
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  ngOnInit() {
  }

}
