import { MySocket } from './mySocket';
import { Translater } from './translater';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';

// used to connect with server.io
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { GlobalService } from './global.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
const config: SocketIoConfig = { url: 'http://192.168.42.13:3001', options: {} };

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    NetworkInterface,
    Translater,
    MySocket,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
