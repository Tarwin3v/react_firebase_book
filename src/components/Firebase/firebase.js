import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC1bAUZMnqGqFgHsCCzlopFVMnU1VMMdqk",
  authDomain: "react-book-dev.firebaseapp.com",
  databaseURL: "https://react-book-dev.firebaseio.com",
  projectId: "react-book-dev",
  storageBucket: "react-book-dev.appspot.com",
  messagingSenderId: "754306855756",
  appId: "1:754306855756:web:f67d0580a31b19e69a55e9",
  measurementId: "G-5WXSMREDH5"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider().setCustomParameters(
      { prompt: "select_account" }
    );
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  //@x AUTH API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //@x AUTH API - Social Networks SignIn

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //@x MERGE AUTH AND DB USER API

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  //@x USER API

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
}

export default Firebase;
