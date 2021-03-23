import { types } from "store/image/types";
import fbService from "api/fbService";

export const setReduxImages = () => (dispatch) => {
  fbService.fbServiceImage
    .getAllImages()
    .then((data) => {
      dispatch({
        type: types.SET_IMAGES,
        payload: {
          image: data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
