import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-serv-con',
  templateUrl: './serv-con.page.html',
  styleUrls: ['./serv-con.page.scss'],
})
export class ServConPage implements OnInit {

  constructor(public loadingController: LoadingController) {
    this.presentLoading()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Looking up for your friends, please wait for a second...',
      duration: 6000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    this.presentLoadingWithOptions()
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 2000,
      message: 'Connecting to xx\'s servers',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  ngOnInit() {
  }

}