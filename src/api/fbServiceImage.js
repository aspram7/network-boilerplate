import firebase from "firebase/app";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

import imageMockup from "data-mockup/image-mockup";

class FbServiceImage {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  initializeImages = () => {
    firebase.database().ref("images").set(imageMockup);
  };

  getAllImages = async () => {
    const res = await firebase.database().ref("images").get();
    const data = res.toJSON();
    return Object.values(data);
  };

  getImages = async (startAt = 0, endAt = 8) => {
    const res = await firebase
      .database()
      .ref("images")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  getImage = async (id) => {
    const res = await firebase.database().ref(`images/${id}`).get();
    return res.val();
  };
}

const fbServiceImage = new FbServiceImage();
export default fbServiceImage;
