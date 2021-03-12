import React from "react";
import PropTypes from "prop-types";
import "./ImageCard.scss";

function ImageCard({ className, image, children, onClick }) {
  return (
    <div className={`app-image-card ${className}`} onClick={onClick}>
      <img src={image} alt={children} />
      <h5>{children}</h5>
    </div>
  );
}

ImageCard.defaultProps = {
  className: "",
  image: "",
  onClick: () => {},
};

ImageCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default ImageCard;
