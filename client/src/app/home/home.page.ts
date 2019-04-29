import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Socket } from 'ng-socket-io';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';
  ipaddress = "";
  constructor(private menu: MenuController, private socket: Socket, private networkInterface: NetworkInterface){
    this.networkInterface.getWiFiIPAddress()
    .then(address => this.ipaddress = address.ip)
    .catch(error => console.log('unable to get IP address : ' + error));
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
