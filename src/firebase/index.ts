import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBt2l6YVX0ko1Y4oBShX0P0voZQRK6Bl8I",
    authDomain: "simplepharma2019.firebaseapp.com",
    databaseURL: "https://simplepharma2019.firebaseio.com",
    projectId: "simplepharma2019",
    storageBucket: "simplepharma2019.appspot.com",
    messagingSenderId: "17263473642",
    appId: "1:17263473642:web:b6bd2cb16363cd97",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
