import { Component } from '@angular/core';
import { Translater } from '../translater';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	/** Translater object, is not used yet because there is no text */
  private translate: Translater;
  /** Will contain all available languages for user selection */ 				
	private currentLangs: any;

  constructor(translate: Translater) {

		this.translate = translate;
    this.currentLangs = this.translate.getAllLanguages();
    this.translate.changeLanguage('fr');
  }
  
  unread(item){
    console.log("coucou");
  }


}
