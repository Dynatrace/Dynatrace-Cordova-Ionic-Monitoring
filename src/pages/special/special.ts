import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { RESTService } from '../../services/restService';
import { JourneyPage } from '../journey/journey';
import { Config } from '../../services/config';
import { LoadingDialogService } from '../../services/loadingDialogService';

@Component({
	selector: 'page-special',
	templateUrl: 'special.html'
})
export class SpecialPage {
	
	@ViewChild(Content) content: Content;

	config: Config;
	loadingDialog: any;
	arrayOffers: Array<any> = [];
	errorNoResult : boolean = false;

	constructor(public navCtrl: NavController, private dialog: LoadingDialogService, private restService: RESTService) {
		this.config = Config.getInstance();
		this.callRESTOffers();
	}

	private callRESTOffers(){
		if(this.config.getEasyTravelUnreachable()){
			this.restService.showErrorConnection();
			throw "EasyTravel Unreachable!";
		}
		
		let config = {
			parameters: []
		}  

		this.dialog.showLoadingDialog("Searching ...");
		this.restService.getSpecialOffers(config).subscribe((data: any) => this.callbackSpecialOffers(data), error => this.errorSpecialOffers(error));	
	}

	private callbackSpecialOffers(data: any){
		this.arrayOffers = data;
		this.errorNoResult = false;
		this.dialog.dismissLoadingDialog();
	}

	private errorSpecialOffers(error: any){
		console.log(error);
		this.dialog.dismissLoadingDialog();
		this.errorNoResult = true;
	}

	buttonClickedNewOffers(){
		this.callRESTOffers();
		this.content.scrollToTop();
	}

	private bookButtonClicked(journey: any){	    
		this.navCtrl.push(JourneyPage, {
			journeyData: journey
		});
	}
}
