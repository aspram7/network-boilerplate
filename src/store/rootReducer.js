import { combineReducers } from "redux";
import todo from "store/todo/reducer";
import image from "store/image/reducer";
import count from "store/count/reducer";

export default combineReducers({
  todo,
  image,
  count,
});

export const initialState = {
  todo: {
    todos: null,
    todosHasMore: true,
  },
  image: {
    images: null,
    imagesHasMore: true,
  },
  count: 0,
};
