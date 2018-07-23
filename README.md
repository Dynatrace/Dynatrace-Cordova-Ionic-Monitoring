# Dynatrace Ionic 3 EasyTravel Demo Application
> Ionic 3 Sample Apps

![Screenshot](docs/screenshot.PNG?raw=true "Screenshot of the app")

The EasyTravel demo application is used to explain how Dynatrace real user monitoring within a typical Cordova Ionic 3 hybrid app works. EasyTravel implements a simple travel booking app that triggers real backend service calls. The user is able to book journeys within the application. This is only a demo use case (no worry, we do not charge for the journey you are booking). The goal of this demo application is to show you how easy it is, to instrument a hybrid ionic application with Dynatrace and how easy it is to track the actions of the user within the application.

## Getting Started

This section describes how to install and run this demo application on your own computer or mobile phone.

### Prerequisites

The following software packages are necessary to build and run the EasyTravel app.

1. Installation of NodeJS: https://nodejs.org/en/
2. Installation of required global node modules with the following command: `npm install -g ionic cordova`

### Installation

Now you are ready for the installation of the application.

1. Checkout or download the project content
2. Installation of all necessary project modules: In the project directory execute the command `npm install`
3. Add a desktop platform: Enter the command `ionic cordova platform add browser`
4. **Not necessary**: Add a mobile platform (e.g. Android) - Enter the command `ionic cordova platform add android`

**Important:** Especially when adding a platform be sure that you install all necessary platform tools. See https://ionicframework.com/docs/v2/getting-started/installation/ for more information. The Android platform requirements can be found here: http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html. The iOS platform requirements can be found here: http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html

### Start

Depending on the platforms added, the startup looks different. If you want to run `ionic serve --lab`, please read the section *CORS Problems*.

If you want to run the application on iOS or Android simply enter `ionic cordova run android` or `ionic cordova run ios`. This, of course, only works when the platform was added in the installation step.

### Build

To build the iOS & Android apps, execute `ionic cordova build ios` or `ionic cordova build android`, respectively. Again, this only works when the platform was added in the installation step.

### CORS Problems

If you want to start the application in your browser locally hardly any browser will allow CORS requests. To bypass this symptom you can install an extension for your browser. This [Chrome extension](https://chrome.google.com/webstore/detail/cors/dboaklophljenpcjkbbibpkbpbobnbld?utm_source=chrome-app-launcher-info-dialog) is known to work. You have to turn on the extension after installing it. This workaround is not needed when you execute the electron executabel or the application on the phone.

## Instrumentation

Have a look into the plugin which you find here: https://www.npmjs.com/package/dynatrace-cordova-plugin

## Credits

* Icons: [Flat Icons](http://www.flaticon.com/authors/flat-icons), [Freepik](http://www.flaticon.com/authors/freepik), [Eleonor Wang](http://www.flaticon.com/authors/eleonor-wang), [Dave Gandy](http://www.flaticon.com/authors/dave-gandy) from [Flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
