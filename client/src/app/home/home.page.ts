import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';
  constructor(private menu: MenuController, private socket: Socket){

  }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
