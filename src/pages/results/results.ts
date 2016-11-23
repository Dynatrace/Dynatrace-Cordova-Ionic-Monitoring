import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { JourneyPage } from '../journey/journey';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})

export class ResultsPage {
  @ViewChild(Content) content: Content;
	
  journeyData : any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
	  this.journeyData = navParams.get("journeyData");
  }

  private bookButtonClicked(journey: any){
	  this.navCtrl.push(JourneyPage, {
			  journeyData: journey
	  });
  }

}
