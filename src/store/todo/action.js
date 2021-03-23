import { types } from "store/todo/types";
import fbService from "api/fbService";

export const setReduxTodos = (startAt, limit) => (dispatch) => {
  fbService.fbServiceTodo
    .getTodos(startAt, limit)
    .then((data) => {
      dispatch({
        type: types.SET_TODOS,
        payload: {
          todos: data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getReduxTodos = (startAt, limit) => (dispatch) => {
  fbService.fbServiceTodo
    .getTodos(startAt, limit)
    .then((data) => {
      dispatch(setTodosHasMore(data.length > 8));
      dispatch({
        type: types.GET_MORE_TODOS,
        payload: {
          todos: data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setTodosHasMore = (hasMore) => (dispatch) => {
  dispatch({
    type: types.SET_TODOS_HAS_MORE,
    payload: {
      hasMore,
    },
  });
};

export const updateTodo = (todo) => {
  return {
    type: types.UPDATE_TODO,
    payload: {
      todo,
    },
  };
};

export const checkTodo = (id) => {
  return {
    type: types.CHECK_TODO,
    payload: {
      id,
    },
  };
};

export const deleteTodo = (data) => {
  return {
    type: types.SET_TODOS,
    payload: {
      todos: data,
    },
  };
};
