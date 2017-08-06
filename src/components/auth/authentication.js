import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA_VmfCAN_WjKIUpaFpSelCgu2m-nrNA68",
    authDomain: "topicwhiz-185ff.firebaseapp.com",
    databaseURL: "https://topicwhiz-185ff.firebaseio.com",
    projectId: "topicwhiz-185ff",
    storageBucket: "",
    messagingSenderId: "889000754203"
};

export const firebaseApp = firebase.initializeApp(config);