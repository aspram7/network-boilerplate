import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

import firebaseConfig from "./firebaseConfig";

class FbServiceAuth {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  login = async (credentials) => {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
    const { uid, email, displayName, photoURL } = res.user;
    return { uid, email, displayName, photoURL };
  };

  signup = async (credentials) => {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
    const user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: credentials.name,
    });
    const { uid, email, displayName, photoURL } = res.user;
    return { uid, email, displayName, photoURL };
  };

  logout = async () => {
    await firebase.auth().signOut();
  };

  svaePhotoToStorage = async (pic, callback) => {
    try {
      const fileUrl = URL.createObjectURL(pic);
      const fileRes = await fetch(fileUrl);
      const file = await fileRes.blob();

      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const pathRef = firebase.storage().ref(`images/${user.uid}`);
          await pathRef.put(file);
          const photoURL = await pathRef.getDownloadURL();
          await user.updateProfile({ photoURL });
          callback(photoURL);
        }
      });

      return null;
    } catch (err) {
      callback(null);
      return null;
    }
  };
}

const fbServiceAuth = new FbServiceAuth();
export default fbServiceAuth;
