import { MySocket } from './mySocket';
import { Translater } from './translater';
import { GlobalService } from './global.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

   constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: Translater,
    public globalTracks: GlobalService,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController,
    public socket : MySocket,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message : string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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
      },{
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
