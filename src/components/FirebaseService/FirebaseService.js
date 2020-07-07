import * as firebaseService from 'firebase';

export const config = {
  apiKey: "AIzaSyD2uIp8ew6goBwgSzB3QtIVT78ohMNZKDc",
  authDomain: "limi-46e7d.firebaseapp.com",
  databaseURL: "https://limi-46e7d.firebaseio.com",
  projectId: "limi-46e7d",
  storageBucket: "limi-46e7d.appspot.com",
  messagingSenderId: "213593642858",
  appId: "1:213593642858:web:00a9fcbe718d89396eb713",
  measurementId: "G-50JTM0J0N2"
};

firebaseService.initializeApp(config);

export default firebaseService;