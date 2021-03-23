import React, { useRef, useState } from "react";
import fbService from "api/fbService";
import CircularProgress from "@material-ui/core/CircularProgress";

import avatar from "assets/profile/user.png";

import "./ImageInput.scss";
import { useEffect } from "react";

const ImageInput = ({ userImage }) => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (userImage) {
      setImageLoading(true);
      setImage(userImage);
    }
  }, [userImage]);

  const changeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageLoading(true);
      await fbService.fbServiceAuth.svaePhotoToStorage(file, (image) => {
        if (image) {
          setImage(image);
        } else {
          setImageLoading(false);
        }
      });
    }
  };

  return (
    <div className="app-image-input">
      <input type="file" style={{ display: "none" }} ref={inputRef} onChange={changeHandler} />
      {imageLoading && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      <div className="app-image-input__input" onClick={() => inputRef.current.click()}>
        {image ? (
          <img
            src={image}
            className="user-image"
            alt="profile"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImage(null);
            }}
          />
        ) : (
          <>
            <img src={avatar} className="user-avatar" alt="profile" />
            Upload Image
          </>
        )}
      </div>
    </div>
  );
};

export default ImageInput;
