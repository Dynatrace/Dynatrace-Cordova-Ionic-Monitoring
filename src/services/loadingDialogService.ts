import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingDialogService{
	
	loadingDialog: any;
	
	constructor (private loadingCtrl: LoadingController){

	}
	
	// Show the loading dialog for searching the journeys
  public showLoadingDialog(textDialog: string){
	  this.loadingDialog = this.loadingCtrl.create({
		spinner: 'crescent',
	    content: textDialog
	  });
	  
	  this.loadingDialog.present();
  }
  
  // Dismiss the loading dialog for searching the journeys
  public dismissLoadingDialog(){
	  this.loadingDialog.dismiss();
  }
  
}