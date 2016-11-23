import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

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

import { Storage } from '@ionic/storage';
import { CurrencyPipe } from '../pipes/currencyPipe';


import { MomentModule } from 'angular2-moment';

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
    IonicModule.forRoot(EasyTravel), MomentModule
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
  providers: [RESTService, LoadingDialogService, Storage]
})

export class AppModule {}
