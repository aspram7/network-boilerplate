import React from "react";

import "./ImageCard.scss";

function ImageCard({ className, image, children, onClick }) {
  return (
    <div className={`app-image-card ${className}`} onClick={onClick}>
      <img src={image} alt={children} />
      <h5>{children}</h5>
    </div>
  );
}

export default ImageCard;
