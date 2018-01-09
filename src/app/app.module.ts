import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
import { MomentModule } from 'angular2-moment';

import { RESTService } from '../services/restService';
import { LoadingDialogService } from '../services/loadingDialogService';

import { EasyTravel } from './app.component';
import { SearchPage } from '../pages/search/search';
import { ResultsPage } from '../pages/results/results';
import { JourneyPage } from '../pages/journey/journey';
import { UserPage } from '../pages/user/user';
import { ContactPage } from '../pages/contact/contact';
import { SettingsPage } from '../pages/settings/settings';
import { WebPage } from '../pages/web/web';
import { SpecialPage } from '../pages/special/special';

import { IonicStorageModule } from '@ionic/storage';
import { CurrencyPipe } from '../pipes/currencyPipe';

@NgModule({
  declarations: [
    EasyTravel,
	SearchPage,
	ResultsPage,
	JourneyPage,
	UserPage,
	ContactPage,
	SettingsPage,
	WebPage,
	SpecialPage,
	CurrencyPipe
  ],
  imports: [
	BrowserModule,
	HttpModule,
	MomentModule,
    IonicModule.forRoot(EasyTravel),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EasyTravel,
	SearchPage, 
	ResultsPage,
	JourneyPage,
	UserPage,
	ContactPage,
	SettingsPage,
	WebPage,
	SpecialPage
  ],
  providers: [
    RESTService, 
    LoadingDialogService,
    StatusBar,
	DatePicker
  ]
})

export class AppModule {

}
