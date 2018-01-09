import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SearchPage } from '../pages/search/search';
import { UserPage } from '../pages/user/user';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { WebPage } from '../pages/web/web';
import { SpecialPage } from '../pages/special/special';
import { Config } from '../services/config';
import { Storage } from '@ionic/storage';

const TITLE_TERMS_OF_USE : string = "Terms Of Use";
const TITLE_PRIVACY_POLICY : string = "Privacy Policy";

@Component({
	templateUrl: 'app.html'
})

export class EasyTravel {
  @ViewChild(Nav) nav: Nav;
  
  rootPage = SearchPage;
  config: Config;
  
  username: string;
  
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, private storage: Storage, private statusBar: StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
	
	this.config = Config.getInstance();
	
	// Load the data (if there is any)
	this.config.loadConfig(this.storage);
	this.config.loadUserConfig(this.storage).then((val) => {
		if(this.config.getLoggedIn()){
			this.username = this.config.getUsername();
		}else{
			this.username = "Not Logged In";
		}
	});
	
	this.pages = [
		{ title: 'Search', component: SearchPage, icon: 'search' },
		{ title: 'Special Offers', component: SpecialPage, icon: 'star' },
		{ title: 'User Account', component: UserPage, icon: 'contact' },
		{ title: 'Contact', component: ContactPage, icon: 'help-buoy' },
		{ title: TITLE_TERMS_OF_USE, component: WebPage, icon: 'paper' },
		{ title: TITLE_PRIVACY_POLICY, component: WebPage, icon: 'lock' },
		{ title: 'Settings', component: SettingsPage, icon: 'settings' }
    ];
  }
  
  openPage(page) {
    if(page.title == TITLE_TERMS_OF_USE){
		let pageInfo = {
			"title" : TITLE_TERMS_OF_USE,
			"url" : "/legal-orange-mobile.jsf"
		}
		this.nav.setRoot(page.component,{
			pageData: pageInfo
	    });
	}else if (page.title == TITLE_PRIVACY_POLICY){
		let pageInfo = {
			"title" : TITLE_PRIVACY_POLICY,
			"url" : "/privacy-orange-mobile.jsf"
		}
		this.nav.setRoot(page.component,{
			pageData: pageInfo
	    });
	}else{
		this.nav.setRoot(page.component);
	}
  }
 
}
