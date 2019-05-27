import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tab-nexttracks', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'serv-con', loadChildren: './serv-con/serv-con.module#ServConPageModule' },
  { path: 'tab-nexttracks', loadChildren: './tab-nexttracks/tab-nexttracks.module#TabNexttracksPageModule' },
  { path: 'tab-lastadded', loadChildren: './tab-lastadded/tab-lastadded.module#TabLastaddedPageModule' },
  { path: 'tab-add', loadChildren: './tab-add/tab-add.module#TabAddPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
