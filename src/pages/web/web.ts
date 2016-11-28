import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingDialogService } from '../../services/loadingDialogService';
import { RESTService } from '../../services/restService';
import { Config } from '../../services/config';

@Component({
	selector: 'page-web',
	templateUrl: 'web.html'
})

export class WebPage {
	
	@ViewChild("divPage") divPage:ElementRef;
	
	pageName: string;
	pageUrl = "about:blank";
	pageInfo: any;
	errorNoResult: boolean = false;
	config: any;

	constructor(public navCtrl: NavController, navParams: NavParams, private sanitizer: DomSanitizer, private dialog: LoadingDialogService, private restService: RESTService) {
		this.config = Config.getInstance();
		
		if(this.config.getEasyTravelUnreachable()){
			this.restService.showErrorConnection();
			throw "EasyTravel Unreachable!";
		}
		
		this.pageInfo = navParams.get("pageData");
		this.pageName = this.pageInfo.title;
		this.dialog.showLoadingDialog("Loading ...");
		
		let config = {
			parameters: []
		}
		
		this.restService.getWeb(config, this.pageInfo.url).subscribe((data: any) => this.webViewLoadComplete(data), error => this.webViewError(error));	
	}
	
	private webViewError(error: any){
		this.dialog.dismissLoadingDialog();
		if(error.cancelable){
			// URL wrong
			this.restService.showErrorConnection();
		}
	}
	
	private webViewLoadComplete(data: any){
		this.dialog.dismissLoadingDialog();
		
		if(data == "0"){
			this.errorNoResult = false;
		}else{
			this.divPage.nativeElement.innerHTML = data;
			this.errorNoResult = true;
		}
	}
}
