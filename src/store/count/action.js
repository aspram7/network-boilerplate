import { types } from "store/count/types";

export const incrementCount = () => {
  return {
    type: types.INCREMENT_COUNT,
  };
};
export const decrementCount = () => {
  return {
    type: types.DECREMENT_COUNT,
  };
};
