import { types } from "store/todo/types";

const initialState = {
  todos: null,
  todosHasMore: true,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case types.GET_MORE_TODOS:
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
      };
    case types.SET_TODOS_HAS_MORE:
      return {
        ...state,
        todosHasMore: action.payload.hasMore,
      };
    case types.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el.id === action.payload.todo.id) {
            return action.payload.todo;
          }
          return el;
        }),
      };
    case types.CHECK_TODO:
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

export default todoReducer;
