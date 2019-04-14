import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

/**
 * Inherits from TranslateService. It's the language center of the app.
 * Here, languages are set and functions translate text
 */
@Injectable()
export class Translater {

	/**
	 * Constructor of class [[Translater]]
	 * @param translate Instance of TranslateService
	 */
	constructor(private translate: TranslateService) {
		this.translate.addLangs(['fr','en','jp','pt']);
		this.translate.setDefaultLang('en');
		this.changeLanguage('fr');
	}
	/**
	 * Change the language used by the app
	 * @param lang New language
	 */
	changeLanguage(lang: string) {
		this.translate.use(lang);
	}
	/**
	 * This function take a key as parameter and will check its value into the correct JSON lang file.
	 * @param text Key of text to translate from JSON files
	 */
	translateText(text : string){
		let res :string;
		this.translate.get(text).subscribe(
			value => {res = value;}
		);
		return res;
	}
	
	/**
	 * Get available languages
	 * @return List of languages as string 
	 */
	getAllLanguages(){
		return this.translate.getLangs();
	}
}