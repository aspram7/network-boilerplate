import { createContext } from "react";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  posts: null,
  todos: null,
};

export const AppContext = createContext(initialState);
