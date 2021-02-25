import firebase from "firebase/app";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

import postMockup from "data-mockup/post-mockup";

class FbService {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  initializePosts = () => {
    firebase.database().ref("posts").set(postMockup);
  };

  getAllPosts = async () => {
    const res = await firebase.database().ref("posts").get();
    const data = res.toJSON();
    return Object.values(data);
  };

  getPosts = async (startAt = 0, endAt = 8) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  getPost = async (id) => {
    const res = await firebase.database().ref(`posts/${id}`).get();
    return res.val();
  };

  updatePost = async (postData) => {
    const postRef = firebase.database().ref(`posts/${postData.id}`);
    await postRef.update(postData);
    const res = await postRef.get();
    return res.val();
  };

  deletePost = async (id) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    await postRef.remove();

    const posts = await this.getAllPosts();
    await firebase
      .database()
      .ref("posts")
      .set(
        posts.map((item, idx) => {
          return {
            ...item,
            id: idx,
          };
        })
      );
  };

  createPost = async (data) => {
    const res = await firebase.database().ref("posts").orderByKey().limitToLast(1).get();
    const lastItemJson = res.toJSON();
    const lastItem = Object.values(lastItemJson)[0];
    const { id } = lastItem;
    const newItem = { ...data, id: id + 1 };

    await firebase
      .database()
      .ref(`posts/${id + 1}`)
      .set(newItem);

    return newItem;
  };
}

const fbService = new FbService();
export default fbService;
