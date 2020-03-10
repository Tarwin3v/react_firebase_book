import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC3g48d_SO23GgCshEGkegMgvkvGpahllE",
  authDomain: "react-firebase-book-5900f.firebaseapp.com",
  databaseURL: "https://react-firebase-book-5900f.firebaseio.com",
  projectId: "react-firebase-book-5900f",
  storageBucket: "react-firebase-book-5900f.appspot.com",
  messagingSenderId: "349557309816",
  appId: "1:349557309816:web:b13e71bbb02131bbee888d",
  measurementId: "G-26PTBBVFGX"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  //@x AUTH API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //@x USER API

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.deb.ref("users");
}

export default Firebase;
