import { Component, ViewChild } from '@angular/core';
import { Content, AlertController, NavController, Platform } from 'ionic-angular';
import { RESTService } from '../../services/restService';
import { DatePicker } from '@ionic-native/date-picker';
import { ResultsPage } from '../results/results';
import { Config } from '../../services/config';
import { LoadingDialogService } from '../../services/loadingDialogService';

const DEFAULT_INFO_NO_RESULT_ICON = "assets/icon/question-sign.png";
const DEFAULT_INFO_NO_RESULT_TEXT = "No search results? Type in another destination.";
const DEFAULT_INFO_ERROR_ICON = "assets/icon/warning.png";
const DEFAULT_INFO_ERROR_TEXT = "Error occured! There is something wrong with the server. Check your settings.";

@Component({
	selector: 'page-search',
	templateUrl: 'search.html',
	entryComponents:[ ResultsPage ]
})

export class SearchPage {
	@ViewChild(Content) content: Content;

	// For Non-Native
	@ViewChild('dateFromPicker') dateFromPicker;
	@ViewChild('dateToPicker') dateToPicker;
	@ViewChild('destinationInput') destinationInput;

	destinations : string[];
	noSearchResults : boolean = false;

	fromDate: any;
	fromDateRaw: any;
	toDate: any;
	toDateRaw: any;
	fromDateButtonText: string;
	toDateButtonText: string;
	loadingDialog: any;

	infoIcon : string;
	infoText : string;

	config: Config;

	constructor(private restService: RESTService, private dialog: LoadingDialogService, private alertCtrl: AlertController, private navCtrl: NavController, private platform: Platform, private datePicker: DatePicker){
		this.config = Config.getInstance();

		this.fromDateRaw = new Date();
		this.fromDate = this.fromDateRaw.toISOString();
		this.toDateRaw = new Date();
		this.toDate = this.toDateRaw.toISOString();

		this.infoIcon = DEFAULT_INFO_NO_RESULT_ICON;
		this.infoText = DEFAULT_INFO_NO_RESULT_TEXT;
	}

	// After View
	ionViewDidEnter (){
		this.fromDateButtonText = this.dateFromPicker._text;
		this.toDateButtonText = this.dateToPicker._text;
	}

	// User made input in the destination text field
	journeyInputChanged(keyEvent){
		if(this.config.getEasyTravelUnreachable()){
			this.restService.showErrorConnection();
			throw "EasyTravel Unreachable!";
		}

		let config = {
			parameters: [
				{name: "name", value: keyEvent.target.value},
				{name: "maxResultSize", value: "10"},
				{name: "checkForJourneys", value: "true"}
			]
		}

		this.restService.getDestinations(config).subscribe((data: any) => this.callbackDestinationSearch(data), error => this.errorJourneyInput(error));
	}

	// New destinations get loaded from rest call
	private callbackDestinationSearch(data: any){
		this.destinations = data;
		this.infoIcon = DEFAULT_INFO_NO_RESULT_ICON;
		this.infoText = DEFAULT_INFO_NO_RESULT_TEXT;
		this.noSearchResults = this.destinations.length > 0;
	}

	// New destinations get loaded from rest call
	private callbackJourneySearch(data: any){
		this.dialog.dismissLoadingDialog();

		if(data == null){
			// No search results
			this.alertError("No Journey found!", "Sadly no journeys were found, which match with your date.");
		}else{
			this.navCtrl.push(ResultsPage, {
				journeyData: data
			});
		}
	}

	private errorJourneyInput(error: any){
		console.log(error);
		this.infoIcon = DEFAULT_INFO_ERROR_ICON;
		this.infoText = DEFAULT_INFO_ERROR_TEXT;
	}

	// When there is an error with the rest call
	private errorJourneySearch(error: any){
		console.log(error);
		this.dialog.dismissLoadingDialog();
		this.restService.showErrorConnection();
	}

	// Button pressed to search a Journey
	searchJourneyClicked(){
		if(this.config.getEasyTravelUnreachable()){
			this.restService.showErrorConnection();
			throw "EasyTravel Unreachable!";
		}

		this.dialog.showLoadingDialog("Searching ...");

		let config = {
			parameters: [
				{name: "destination", value: this.destinationInput.value},
				{name: "fromDate", value: new Date(this.fromDate).getTime()},
				{name: "toDate", value: new Date(this.toDate).getTime()}
			]
		}

		this.restService.getJourneys(config).subscribe((data: any) => this.callbackJourneySearch(data), error => this.errorJourneySearch(error));
	}

	// Alert about not found journeys
	private alertError(title: string, message: string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}

	// Destination selected out of the list
	private destinationSelected(item){
		this.destinationInput.value = item;
	}

	// Hidden date picker
	fromDateChanged(dateEvent){
		this.fromDateButtonText = dateEvent.day.text + ". " + dateEvent.month.text + " " + dateEvent.year.text;
	}

	// From Date Button Clicked - Will link to the hidden date picker
	fromDateButtonClicked(){
		if (this.platform.is('cordova')) {
			let options = {
				date: this.fromDateRaw,
				mode: 'date',
				androidTheme: 3
			}

			this.datePicker.show(options).then(
				date => {
					this.fromDateRaw = date;
					this.fromDate = date.toISOString();;
				}
			);
	    }else{
			this.dateFromPicker.open();
	    }
	}

	// Hidden date picker
	toDateChanged(dateEvent){
		this.toDateButtonText = dateEvent.day.text + ". " + dateEvent.month.text + " " + dateEvent.year.text;
	}

	// From Date Button Clicked - Will link to the hidden date picker
	toDateButtonClicked(){
		if (this.platform.is('cordova')) {
			let options = {
				date: this.toDateRaw,
				mode: 'date',
				androidTheme: 3
			}

			this.datePicker.show(options).then(
				date => {
					this.toDateRaw = date;
					this.toDate = date.toISOString();;
				}
			);
	    }else{
			this.dateToPicker.open();
	    }
	}

}
