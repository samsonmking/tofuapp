// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://192.168.1.146:3000',
  firebaseConfig: {
    apiKey: "AIzaSyAX1IC1fXh8uFOjpibTonhuHSTrea-FRrY",
    authDomain: "tofu-app-fb.firebaseapp.com",
    databaseURL: "https://tofu-app-fb.firebaseio.com",
    projectId: "tofu-app-fb",
    storageBucket: "tofu-app-fb.appspot.com",
    messagingSenderId: "1080136038880",
    appId: "1:1080136038880:web:b1b488ae4a4dd98483d385"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
