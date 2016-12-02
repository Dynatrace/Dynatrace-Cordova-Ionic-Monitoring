import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { RESTConfiguration } from '../interfaces/restConfiguration';
import { Parameter } from '../interfaces/parameter';
import { Config } from '../services/config';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

declare var module: any, require: any;
const X2JS = ((typeof module === 'object') ? require('x2js') : window['X2JS']);

const SERVICE_DESTINATION_SEARCH : string = "/services/JourneyService/findLocations";
const SERVICE_JOURNEY_SEARCH : string = "/services/JourneyService/findJourneys";
const SERVICE_SPECIAL_OFFERS : string = "/CreateSpecialOffers";
const SERVICE_LOGIN : string = "/services/AuthenticationService/authenticate";
const SERVICE_BOOK_JOURNEY : string = "/services/BookingService/storeBooking";
const TIMEOUT_REST_CALL : number = 11000;

@Injectable()
export class RESTService{

  xmlParser: any;
  config: Config;

  constructor (private http: Http, private alertCtrl: AlertController){
    this.config = Config.getInstance();
  }

  // URL of the Rest Service
  private getURL(config: RESTConfiguration, service: string) : string{
    let basicURL : string = "http://" + this.config.getProxy() + this.config.getHostUrl() + ":" + (this.config.getHostPort() || 1).toString() + service;
    basicURL = basicURL + this.handleParameters(config.parameters);
    return basicURL;
  }

  // Check the XML Object - If it has text
  private checkXMLObject(xmlObject: any){
    if (xmlObject.__text === undefined) {
      return "";
    } else {
      return xmlObject.toString();
    }
  }

  // Create a journey object from json information
  private createJourneyObject(jsonObject: any){
    var journeyObj = {
      "destination" : this.checkXMLObject(jsonObject.destination.name),
      "fromDate" : this.checkXMLObject(jsonObject.fromDate),
      "toDate" : this.checkXMLObject(jsonObject.toDate),
      "id" : this.checkXMLObject(jsonObject.id),
      "image" : this.checkXMLObject(jsonObject.picture),
      "name" : this.checkXMLObject(jsonObject.name),
      "price" : this.checkXMLObject(jsonObject.amount)
    };

    return journeyObj;
  }

  // Convert or handle the Response
  private handleDestinations(rawResponse: Response){
    this.xmlParser = new X2JS();
    let data = this.xmlParser.xml2js(rawResponse.text());
    let jsonObjects = data.findLocationsResponse.return;
    let allLocations = [];

    // Check if there is data
    if (jsonObjects !== undefined) {
      let lengthObjects = jsonObjects.length;

      if (lengthObjects === undefined) {
        // Only one element
        allLocations.push(this.checkXMLObject(jsonObjects.name));
      } else {
        for (var i = 0; i < lengthObjects; i++) {
          allLocations.push(this.checkXMLObject(jsonObjects[i].name));
        }
      }
    }

    return allLocations;
  }

  private handleJourneys(rawResponse: Response){
    this.xmlParser = new X2JS();
    let data = this.xmlParser.xml2js(rawResponse.text());
    var jsonObjects = data.findJourneysResponse.return;

    var allJourneys = [];

    // Check if there is data
    if (jsonObjects !== undefined) {
      var lengthObjects = jsonObjects.length;

      if (lengthObjects === undefined) {
        // Only one element
        allJourneys.push(this.createJourneyObject(jsonObjects));
      } else {
        for (var i = 0; i < lengthObjects; i++) {
          allJourneys.push(this.createJourneyObject(jsonObjects[i]));
        }
      }

      return allJourneys;
    }

    return null;
  }

  private handleSpecialOffers(rawResponse: Response){
    let parser = new DOMParser();
    let doc = parser.parseFromString(rawResponse.text(), "text/html");
    let offers = doc.getElementsByClassName('icePnlGrp resultBox');

    let arrayOffersParsed: Array<any> = [];

    if(offers !== undefined){
      for(let i = 0; i < offers.length; i++){
        let price = offers[i].getElementsByClassName('iceOutFrmt journeyAmount')[0].innerHTML;
        let date = offers[i].getElementsByClassName('iceOutTxt journeyDate')[0].innerHTML;
        let indexDate = date.indexOf("-");
        arrayOffersParsed.push({
          "destination" : offers[i].getElementsByClassName('iceOutTxt journeyName')[0].innerHTML,
          "price" : price.substring(2, price.length),
          "fromDate" : date.substring(0, indexDate - 1),
          "toDate" : date.substring(indexDate + 1, date.length),
        });
      }
    }

    return arrayOffersParsed;
  }

  private handleSimpleReponse(rawResponse: Response, tagName: string){
    this.xmlParser = new X2JS();
    let data = this.xmlParser.xml2js(rawResponse.text());
    let jsonObjects = data[tagName].return;

    // Check if there is data
    if (jsonObjects !== undefined) {
      if (jsonObjects.toString() == "false") {
        return 0;
      } else {
        return 1;
      }
    }
  }

  private handleLogin(rawResponse: Response){
    return this.handleSimpleReponse(rawResponse, "authenticateResponse");
  }

  private handleBooking(rawResponse: Response){
    return this.handleSimpleReponse(rawResponse, "storeBookingResponse");
  }

  private handleResponse(rawResponse: Response){
    if(rawResponse.status == 0){
      return "0";
    }else{
      return rawResponse.text();
    }
  }

  // Return the query String for the used parameters
  private handleParameters(parameters: Parameter[]){
    var parameterString = "?";

    for (let i in parameters) {
      parameterString = parameterString + parameters[i].name + "=" + parameters[i].value + "&";
    }

    // Concat Last Character
    return encodeURI(parameterString.substring(0, parameterString.length - 1));
  }

  // Make an Alert because of Bad Connection
  public showErrorConnection(){
    let alert = this.alertCtrl.create({
      title: "No Connection!",
      subTitle: "There seems to be a connection problem to the server. Please check your connection.",
      buttons: ['Okay']
    });
    alert.present();
  }

  // Get the destinations
  public getDestinations(config: RESTConfiguration){
    let url = this.getURL(config, SERVICE_DESTINATION_SEARCH);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleDestinations(res));
  }

  // Get the journeys
  public getJourneys(config: RESTConfiguration){
    let url = this.getURL(config, SERVICE_JOURNEY_SEARCH);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleJourneys(res));
  }

  public getSpecialOffers(config: RESTConfiguration){
    let url = this.getURL(config, SERVICE_SPECIAL_OFFERS);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleSpecialOffers(res));
  }

  public doLogin(config: RESTConfiguration){
    let url = this.getURL(config, SERVICE_LOGIN);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleLogin(res));
  }

  public doBooking(config: RESTConfiguration){
    let url = this.getURL(config, SERVICE_BOOK_JOURNEY);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleBooking(res));
  }

  public getWeb(config: RESTConfiguration, page: string){
    let url = this.getURL(config, page);
    return this.http.get(url).timeout(TIMEOUT_REST_CALL).map((res) => this.handleResponse(res));
  }
}
