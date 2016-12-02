import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Config } from '../../services/config';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

	config: Config;

	hostUrl: string;
	hostPort: number;
  proxyUrl: string;
  proxyPort: number;

	crashLogin: boolean;
	easyTravelUnreachable: boolean;
	bookingError: boolean;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {
		this.config = Config.getInstance();
	}

	ionViewWillEnter(){
		this.config.loadConfig(this.storage).then((val) => {
			this.setAllViews();
		}, (error) => {
			console.log(error);
		});
	}

	setAllViews(){
		// Now display data from config
		this.hostUrl = this.config.getHostUrl();
		this.hostPort = this.config.getHostPort();
    this.proxyUrl = this.config.getProxyUrl();
    this.proxyPort = this.config.getProxyPort();
		this.bookingError = this.config.getErrorBooking();
		this.easyTravelUnreachable = this.config.getEasyTravelUnreachable();
		this.crashLogin = this.config.getCrashLogin();
	}

	ionViewWillLeave(){
		this.config.saveConfig(this.storage);
	}

	inputHostUrlChanged(){
		this.config.setHostUrl(this.hostUrl);
	}

	inputHostPortChanged(){
		this.config.setHostPort(this.hostPort);
	}

  inputProxyUrlChanged(){
		this.config.setProxyUrl(this.proxyUrl);
	}

  inputProxyPortChanged(){
		this.config.setProxyPort(this.proxyPort);
	}

	toggleBookingChanged(){
		this.config.setErrorBooking(this.bookingError);
	}

	toggleUnreachableChanged(){
		this.config.setEasyTravelUnreachable(this.easyTravelUnreachable);
	}

	toggleCrashChanged(){
		this.config.setCrashLogin(this.crashLogin);
	}

	buttonClickedDefaultSettings(){
		let prompt = this.alertCtrl.create({
			title: 'Default Settings',
			message: "Do you really want to discard your settings?",
			buttons: [
			{
				text: 'OK',
				handler: data => {
					this.config.setUserDefault();
					this.config.setDefault();

					this.setAllViews();
				}
			},
			{
				text: 'Cancel',
				handler: data => {
					// Nothing will happen
				}
			}]
		});

		prompt.present();
	}

}
