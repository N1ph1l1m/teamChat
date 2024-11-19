import React from "react";
import styles from "../../App/Styles/messagePhoto.module.css";

export function MessagePhoto({ photos, modalPhoto, photoData }) {
  if (!Array.isArray(photos) || photos.length === 0) return null;

  let wrapClass = styles.wrapPhoto;
  let photoClass = styles.photoMessage;

  if (photos.length === 2) {
    wrapClass = styles.wrapPhotoTwo;
    photoClass = styles.photoMessageTwoPhoto;
  } else if (photos.length > 2 && photos.length % 2 === 0) {
    wrapClass = styles.wrapPhotoEven;
    photoClass = styles.photoMessageEven;
  } else if (photos.length > 2) {
    wrapClass = styles.wrapPhotoOdd;
    photoClass = styles.photoMessageOdd;
  }

  return (
    <div className={wrapClass}>
      {photos.map((photo, index) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          key={`photo-${index}-${photo}`}
          src={photo}
          className={photoClass}
          alt={`message photo ${index + 1}`}
          onClick={() => modalPhoto({ photoData: photoData, id: index })}
        />
      ))}
    </div>
  );
}
