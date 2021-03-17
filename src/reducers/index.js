import { createStore } from "redux";
import { reduxActionTypes } from "reducers/reduxActionTypes";

const initialState = {
  count: 0,
  todos: null,
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

    default:
      return state;
  }
};

export const store = createStore(reducer);
