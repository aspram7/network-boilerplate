import { types } from "store/count/types";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNT:
      return state + 1;
    case types.DECREMENT_COUNT:
      return state - 1;

    default:
      return state;
  }
};

export default countReducer;
