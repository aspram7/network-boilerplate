import firebase from "firebase/app";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

import todoMockup from "data-mockup/todo-mockup";

class FbServiceTodo {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  initializeTodos = () => {
    firebase.database().ref("todos").set(todoMockup);
  };

  getAllTodos = async () => {
    const res = await firebase.database().ref("todos").get();
    const data = res.toJSON();
    return Object.values(data);
  };

  getTodos = async (startAt = 0, endAt = 8) => {
    const res = await firebase
      .database()
      .ref("todos")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  deleteTodo = async (id) => {
    const todoRef = firebase.database().ref(`todos/${id}`);
    await todoRef.remove();

    const todos = await this.getAllTodos();
    await firebase
      .database()
      .ref("todos")
      .set(
        todos.map((item, idx) => {
          return {
            ...item,
            id: idx,
          };
        })
      );
  };

  createTodo = async (data) => {
    const res = await firebase.database().ref("todos").orderByKey().limitToLast(1).get();
    const lastItemJson = res.toJSON();
    const lastItem = Object.values(lastItemJson)[0];
    const { id } = lastItem;
    const newItem = { ...data, id: id + 1 };

    await firebase
      .database()
      .ref(`todos/${id + 1}`)
      .set(newItem);

    return newItem;
  };

  updateTodo = async (todoData) => {
    const todoRef = firebase.database().ref(`todos/${todoData.id}`);
    await todoRef.update(todoData);
    const res = await todoRef.get();
    return res.val();
  };
}

const fbServiceTodo = new FbServiceTodo();
export default fbServiceTodo;
