import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingDialogService } from '../../services/loadingDialogService';
import { RESTService } from '../../services/restService';
import { Config } from '../../services/config';
import { UserPage } from '../../pages/user/user';
import { SearchPage } from '../../pages/search/search';

@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
export class JourneyPage {
	
	mySlideOptions = {
		initialSlide: 1,
		loop: true,
		pager: true,
		autoplay: 2000
	};

	journeyData : any;
	calculatedPrice: number;
	pricePerPerson: number;
	config : Config;

	amountPerson = 2;

	constructor(public navCtrl: NavController, navParams: NavParams, private dialog: LoadingDialogService, private restService: RESTService, private alertCtrl: AlertController) {
		this.journeyData = navParams.get("journeyData");
		this.calculatedPrice = this.journeyData.price;
		this.pricePerPerson = this.journeyData.price / 2;
		this.config = Config.getInstance();
	}

	peopleRangeChanged(){
		this.calculatedPrice = this.pricePerPerson * this.amountPerson;
	}

	bookJourneyClicked(){
		if(this.config.getErrorBooking()){
			this.restService.showErrorConnection();
			throw "Booking Error";
		}
		
		if(!this.config.getLoggedIn()){
			let prompt = this.alertCtrl.create({
				title: 'Not Logged In',
				message: "You need to login with your user account to book a journey!",
				buttons: [
				{
					text: 'Login',
					handler: data => {
						this.navCtrl.setRoot(UserPage);
					}
				},
				{
					text: 'Cancel',
					handler: data => {
						console.log('Cancel clicked');
					}
				}]
			});
			
			prompt.present();
		}else{
			this.dialog.showLoadingDialog("Booking Journey ...");
			let journeyId = this.journeyData.id;
			
			if(journeyId === undefined){
				journeyId = "1111";
			}
			
			console.log(this.calculatedPrice.toString());
			
			let config = { 
				parameters: [
					{name: "journeyId", value: journeyId},
					{name: "userName", value: this.config.getUsername()},
					{name: "creditCard", value: "0123456789012345"},
					{name: "amount", value: this.calculatedPrice.toString()}
				]
			};
			
			this.restService.doBooking(config).subscribe((data: any) => this.callbackBookJourney(data), error => this.errorBookJourney(error));
		}
	}
	
	private callbackBookJourney(data: any){
		if(data){
			let alert = this.alertCtrl.create({
				title: "Booking successful",
				subTitle: "Your booking was successful. The price of the journey will be charged from your credit card. Have a safe trip!",
				buttons: [{
					text: 'Yay!',
					handler: data => {
						this.navCtrl.setRoot(SearchPage);
					}
				}]
			});
			alert.present();
		}else{
			let alert = this.alertCtrl.create({
				title: "Booking Error",
				subTitle: "Sorry the booking was not possible. Please try again!",
				buttons: ['Meh']
			});
			alert.present();
		}
		
		this.dialog.dismissLoadingDialog();
	}
	
	private errorBookJourney(error: any){
		console.log(error);
		this.dialog.dismissLoadingDialog();
	}
}
