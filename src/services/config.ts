import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const DEFAULT_HOST_URL: string = "dynasprint.emea.cpwr.corp";
const DEFAULT_HOST_PORT: number = 8079;

const DEFAULT_CRASH_LOGIN: boolean = false;
const DEFAULT_ERROR_BOOKING: boolean = false;
const DEFAULT_UNREACHABLE: boolean = false;

const DEFAULT_USERNAME: string = "hainer";
const DEFAULT_PASSWORD: string = "hainer";

const DEFAULT_STORAGE_CONFIG : string = "config";
const DEFAULT_STORAGE_USER_CONFIG: string = "userConfig";

@Injectable()
export class Config{
	
	static instance: Config;
	static isCreating: boolean  = false;
	
	private hostUrl: string;
	private hostPort: number;
	
	private crashLogin: boolean;
	private errorBooking: boolean;
	private easyTravelUnreachable: boolean;
	
	private username: string;
	private password: string;
	
	private loggedIn: boolean; 
	
	constructor (){
		if (!Config.isCreating){
			throw new Error("Use getInstance()");
		}
	}
	
	static getInstance() : Config{
		if (Config.instance == null){
			Config.isCreating = true;
			Config.instance = new Config();	
			Config.instance.setDefault();
			Config.isCreating = false;
		}

		return Config.instance;
	}
	
	public saveConfig(storage: Storage){
		let config = {
			"hostUrl": this.hostUrl,
			"hostPort": this.hostPort,
			"crashLogin": this.crashLogin,
			"errorBooking": this.errorBooking,
			"easyTravelUnreachable": this.easyTravelUnreachable
		}
		
		storage.set(DEFAULT_STORAGE_CONFIG, config);
	}
	
	public saveUserConfig(storage: Storage){
		let config = {
			"username": this.username,
			"password": this.password,
			"loggedIn": this.loggedIn
		}
		
		storage.set(DEFAULT_STORAGE_USER_CONFIG, config);
	}
	
	public loadConfig(storage: Storage){
		return storage.get(DEFAULT_STORAGE_CONFIG).then((val) => {
			if(val != null){
				this.hostUrl = val.hostUrl;
				this.hostPort = val.hostPort;
				this.crashLogin = val.crashLogin;
				this.errorBooking = val.errorBooking;
				this.easyTravelUnreachable = val.easyTravelUnreachable;
			}else{
				this.setDefault();
			}
		}, (error) => {
			console.log(error);
		});
	}
	
	public loadUserConfig(storage: Storage){
		return storage.get(DEFAULT_STORAGE_USER_CONFIG).then((val) => {
			if(val != null){
				this.username = val.username;
				this.password = val.password;
				this.loggedIn = val.loggedIn;
			}else{
				this.setUserDefault();
			}
		}, (error) => {
			console.log(error);
		});
	}
	
	public setUserDefault(){
		if (Config.instance != null){
			Config.instance.setUsername(DEFAULT_USERNAME);
			Config.instance.setPassword(DEFAULT_PASSWORD);
			Config.instance.setLoggedIn(false);
		}
	}
	
	public setDefault(){
		if (Config.instance != null){
			Config.instance.setHostUrl(DEFAULT_HOST_URL);
			Config.instance.setHostPort(DEFAULT_HOST_PORT);
			Config.instance.setErrorBooking(DEFAULT_ERROR_BOOKING);
			Config.instance.setEasyTravelUnreachable(DEFAULT_UNREACHABLE);
			Config.instance.setCrashLogin(DEFAULT_CRASH_LOGIN);
		}
	}
	
	public resetUser(){
		this.loggedIn = false;
		this.username = "";
		this.password = "";
	}
	
	public getLoggedIn(): boolean{
		return this.loggedIn;
	}
	
	public setLoggedIn(loggedIn: boolean){
		this.loggedIn = loggedIn;
	}
	
	public getUsername(): string{
		return this.username;
	}
	
	public setUsername(username: string){
		this.username = username;
	}
	
	public getPassword(): string{
		return this.password;
	}
	
	public setPassword(password: string){
		this.password = password;
	}
	
	public getHostUrl(): string{
		return this.hostUrl;
	}
	
	public setHostUrl(url: string){
		this.hostUrl = url;
	}
	
	public getHostPort(): number{
		return this.hostPort;
	}
	
	public setHostPort(port: number){
		this.hostPort = port;
	}
	
	public getCrashLogin(): boolean{
		return this.crashLogin;
	}
	
	public setCrashLogin(crash: boolean){
		this.crashLogin = crash;
	}
	
	public getErrorBooking(): boolean{
		return this.errorBooking;
	}
	
	public setErrorBooking(error: boolean){
		this.errorBooking = error;
	}
	
	public getEasyTravelUnreachable(): boolean{
		return this.easyTravelUnreachable;
	}
	
	public setEasyTravelUnreachable(unreachable: boolean){
		this.easyTravelUnreachable = unreachable;
	}  
}