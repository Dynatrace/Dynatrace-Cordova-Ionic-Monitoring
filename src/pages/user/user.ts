import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Config } from '../../services/config';
import { RESTService } from '../../services/restService';
import { LoadingDialogService } from '../../services/loadingDialogService';
import { Storage } from '@ionic/storage';

const DEFAULT_BUTTON_TEXT_LOGGED_IN = "Logout";
const DEFAULT_BUTTON_TEXT_NOT_LOGGED_IN = "Login";

@Component({
	selector: 'page-user',
	templateUrl: 'user.html'
})

export class UserPage {
  
	buttonText: string;
	inputDisabled: boolean = false;
	config: Config;

	username: string;
	password: string;

	constructor(public navCtrl: NavController, private restService: RESTService, private alertCtrl: AlertController, private dialog: LoadingDialogService, private storage:Storage) {
		this.config = Config.getInstance();
	}

	ionViewWillEnter(){
		this.config.loadUserConfig(this.storage).then((val) => {
			// Now display data from config
			this.config.loadUserConfig(this.storage);
			this.username = this.config.getUsername();
			this.password = this.config.getPassword();

			if(this.config.getLoggedIn()){
			// User is logged in - disable input
				this.inputDisabled = true;
				this.buttonText = DEFAULT_BUTTON_TEXT_LOGGED_IN;
			}else{
				this.inputDisabled = false;
				this.buttonText = DEFAULT_BUTTON_TEXT_NOT_LOGGED_IN;
			}
		}, (error) => {
				console.log(error);
			}
		);
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
  
	private errorLogin(error: any){
		console.log(error);
		this.dialog.dismissLoadingDialog();
		this.restService.showErrorConnection();
	}
  
	private callbackLogin(data: any){
		this.dialog.dismissLoadingDialog();

		if(data){
			this.inputDisabled = true;
			this.buttonText = DEFAULT_BUTTON_TEXT_LOGGED_IN;

			this.config.setLoggedIn(true);
			this.config.setUsername(this.username);
			this.config.setPassword(this.password);

			this.config.saveUserConfig(this.storage);
		}else{
			// Login not successful
			this.alertError("Login Error!", "It seems there is something wrong! Please check your username or password.");
		}  
	}
  
	buttonUserClicked(){  
		if(this.config.getCrashLogin()){
			this.alertError("Login Error!", "It seems there is something wrong! Please check your username or password.");
			throw "Crash on Login";
		}
		
		if(this.config.getEasyTravelUnreachable()){
			this.restService.showErrorConnection();
			throw "EasyTravel Unreachable!";
		}
	
		if(this.config.getLoggedIn()){
			// User is logged in
			this.inputDisabled = false;
			this.buttonText = DEFAULT_BUTTON_TEXT_NOT_LOGGED_IN;
			this.config.resetUser();
			this.config.saveUserConfig(this.storage);
		}else{		  
			let config = {
				parameters: [
					{name: "userName", value: this.username},
					{name: "password", value: this.password}
				]
			}  

			this.dialog.showLoadingDialog("Login User ...");
			this.restService.doLogin(config).subscribe((data: any) => this.callbackLogin(data), error => this.errorLogin(error));
		}
	}

}
