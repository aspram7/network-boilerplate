import { createStore } from "redux";
import { reduxActionTypes } from "store/reducers/types";

const initialState = {
  count: 0,
  todos: null,
  todosHasMore: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1,
      };
    case reduxActionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case reduxActionTypes.GET_MORE_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
      };
    case reduxActionTypes.SET_TODOS_HAS_MORE:
      return {
        ...state,
        todosHasMore: action.payload.hasMore,
      };
    case reduxActionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el.id === action.payload.todo.id) {
            return action.payload.todo;
          }
          return el;
        }),
      };
    case reduxActionTypes.CHECK_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, completed: !el.completed };
          }
          return el;
        }),
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
