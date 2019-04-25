import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabNexttracksPage } from './tab-nexttracks.page';

const routes: Routes = [
  {
    path: '',
    component: TabNexttracksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabNexttracksPage]
})
export class TabNexttracksPageModule {}
