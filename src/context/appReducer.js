import { actionTypes } from "context/actionTypes";

const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default appReducer;

// action = {
//   type: string SET_USER,
//   payload: {
//     user
//   }
// }
