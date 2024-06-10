import React from "react";
import { UnsplashImage } from "../../domains/unsplash";

export const ImageList: React.FC<{ images: UnsplashImage[] }> = ({ images }) => {
  return (
    <div className="image-list">
      {images.map((image) => (
        <img key={image.urls.regular} src={image.urls.regular} alt="" />
      ))}
    </div>
  );
};
