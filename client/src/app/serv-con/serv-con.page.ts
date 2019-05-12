import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Translater } from './../translater';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serv-con',
  templateUrl: './serv-con.page.html',
  styleUrls: ['./serv-con.page.scss'],
})
export class ServConPage implements OnInit {
  translate : Translater
  constructor(public loadingController: LoadingController, translate : Translater, private router: Router) {
    this.presentLoading()
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      message: 'Looking up for your friends, please wait for a second...',//this.translate.translateText("HELLO"),//
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
    this.router.navigateByUrl('/tab-nexttracks')
    return await loading.present();
  }

  ngOnInit() {
  }

}