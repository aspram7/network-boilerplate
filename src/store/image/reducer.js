import { types } from "store/image/types";

const initialState = {
  images: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_IMAGES:
      return {
        ...state,
        images: action.payload.image,
      };

    default:
      return state;
  }
};

export default imageReducer;
