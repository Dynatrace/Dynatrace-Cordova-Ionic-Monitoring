# Dynatrace Ionic 2 EasyTravel Demo Application
> Ionic 2 Sample App 

![Screenshot](docs/screenshot.PNG?raw=true "Screenshot of the app")

The EasyTravel demo application is used to explain how Dynatrace real user monitoring within a typical Cordova Ionic 2 hybrid app works. EasyTravel implements a simple travel booking app that triggers real backend service calls. The user is able to book journeys within the application. This is only a demo use case (no worry, we do not charge for the journey you are booking). The goal of this demo application is to show you how easy it is, to instrument a hybrid ionic application with Dynatrace and how easy it is to track the actions of the user within the application.

## Getting Started

This section describes how to install and run this demo application on your own computer or mobile phone.

### Prerequisites

Following software packages are necessary to build and run the EasyTravel app:

* Installation of NodeJS: https://nodejs.org/en/
* Installation of Ionic CLI through npm (Node Package Manager): Enter in the cmd or terminal "npm install -g ionic" 

### Installation

Now you are ready for the installation of the application.

* Checkout or download the project content
* Installation of all necessary project modules: In the project directory execute the following command - *"npm install"*
* Adding a platform (e.g. Android) - **Not necessary** : Enter the command *"ionic platform add Android"*

**Important:** Especially when adding a platform be sure that you install all necessary platform tools. See https://ionicframework.com/docs/v2/getting-started/installation/ for more information. The Android platform requirements can be found here: http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html. The iOS platform requirements can be found here: http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html

### Start

Depending on the platforms added, the startup looks different. Basically *"ionic serve --lab"* will work out of the box, because it does not need a platform to be executed. If you want to run the application on iOS or Android simply enter *"ionic run android"* or *"ionic run ios"*. This of course only works when the platform was added in the installation step.

## Instrumentation

The instrumention will be explained in this section. Stay tuned.

## Credits

* Icons: [Flat Icons](http://www.flaticon.com/authors/flat-icons), [Freepik](http://www.flaticon.com/authors/freepik), [Eleonor Wang](http://www.flaticon.com/authors/eleonor-wang), [Dave Gandy](http://www.flaticon.com/authors/dave-gandy) from [Flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
