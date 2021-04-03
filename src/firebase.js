// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//API key

import firebase from "firebase";

//앱 초기화. firebase설치 -> npm으로 따로 또 설정해야함
//npm i firebase            --save??????
const firebaseApp = firebase.initializeApp({

        apiKey: "AIzaSyDBhgv55ApHUEnB_MES5hnBs0LPFcnIwGg",
        authDomain: "instagram-clone-react-334cf.firebaseapp.com",
        projectId: "instagram-clone-react-334cf",
        storageBucket: "instagram-clone-react-334cf.appspot.com",
        messagingSenderId: "635291718350",
        appId: "1:635291718350:web:00d87aa73dc75e9fca769f",
        measurementId: "G-SL9E8C0PKL"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

//   export default db;

// snippet of code
/*
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
*/