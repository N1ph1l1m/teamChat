import React, { useState } from "react";
import Portal from "../modalCreateGroup/portal";
import PropTypes from "prop-types";
import styles from "../../App/Styles/modalMediaChat.module.css";
import { MessageDocuments } from "../../Shared/messageDocuments/messageDocuments";
import ModalPhoto from "../modalPhoto/modalPhoto";
import { MdImageNotSupported } from "react-icons/md";
import { TbNoteOff } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import { NoMessages } from "../../Shared/NoMessages/NoMessages";

function sortMedia(data) {
  const groupedPhotos = data.reduce((acc, img) => {
    const date = new Date(img.upload_at);
    const monthYear = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(img);
    return acc;
  }, {});
  return groupedPhotos;
}

const MediaRender = ({ media, modalPhoto }) => {
  const allPhotos = Array.isArray(media)
    ? media
        .filter((item) => item && item.images.length !== 0)
        .flatMap((item,index) => item.images)
    : [];
  return (
    <>
      {allPhotos && allPhotos.length === 0 ? (
        <NoMessages
          text={"Нет отправленных изображений"}
          icon={<MdImageNotSupported color="gray" size="30" />}
        />
      ) : (
        Object.entries(sortMedia(allPhotos)).map(([monthYear, photos],index) => (
          <div className={styles.groupPhoto} key={index}>
            <h3>{monthYear}</h3>
            <div className={styles.mediaImgWrap}>
              {photos.map((img, index) => (
                <img
                  key={`${img.id}-${monthYear}`}
                  className={styles.mediaImg}
                  src={img.image}
                  alt={`media${img.id}`}
                  onClick={() => {
                    modalPhoto({ photoData: allPhotos, id: index });
                  }}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

const DocumentsRender = ({ media }) => {
  const allDocuments = Array.isArray(media)
    ? media
        .filter((item) => item && item.documents.length !== 0)
        .flatMap((item) => item.documents)
    : [];
  return (
    <div className={styles.groupPhoto}>
      {allDocuments && allDocuments.length === 0 ? (
        <NoMessages
          text={"Нет отправленных документов"}
          icon={<TbNoteOff color="gray" size="30" />}
        />
      ) : (
        Object.entries(sortMedia(allDocuments)).map(([monthYear],index) => (
          <div key={index}>
            <h3>{monthYear}</h3>
            <MessageDocuments documents={allDocuments} />
          </div>
        ))
      )}
    </div>
  );
};

const ModalMediaChat = ({ isOpen, onCancel, media, photoData , isMedia , setMedia, isDocuments,setDocuments }) => {
  const [modalPhoto, setModalPhoto] = useState("");
  const [photoModal, setPhotoModal] = useState(false);
  const [currentPhotoId, setCurrentPhotoId] = useState(0);
  const mediaShow = isMedia && !isDocuments;
  const documentsShow = !isMedia && isDocuments;

  const modalPh = (photoData) => {
    setCurrentPhotoId(photoData.id);
    setModalPhoto(photoData);
    setPhotoModal(true);
  };
  const nextImg = () => {
    console.log("next");
    if (currentPhotoId < modalPhoto.photoData.length - 1) {
      setCurrentPhotoId(currentPhotoId + 1);
    }
  };

  const prevImg = () => {
    console.log("prev");
    if (!currentPhotoId > 0) return;
    setCurrentPhotoId(currentPhotoId - 1);
  };
  function handleCancelModal() {
    setPhotoModal(false);
  }
  return (
    <>
      <ModalPhoto
        sizeGalary={modalPhoto.photoData}
        image={
          modalPhoto &&
          modalPhoto.photoData &&
          modalPhoto.photoData[currentPhotoId]
            ? modalPhoto.photoData[currentPhotoId].image
            : null
        }
        nextPhoto={nextImg}
        prevPhoto={prevImg}
        isOpen={photoModal}
        onCancel={handleCancelModal}
      />
      {isOpen && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalWrap}>
              <div className={styles.modalBody}>
                <div className={styles.menuWrap}>
                  <div className={styles.menuButtons}>
                    <button
                      className={`${styles.menuItem} ${
                        isMedia ? styles.menuActive : styles.menuItem
                      }`}
                      onClick={() => {
                        setMedia(true);
                        setDocuments(false);
                      }}
                    >
                      Фотографии
                    </button>
                    <button
                      className={`${styles.menuItem} ${
                        isDocuments ? styles.menuActive : styles.menuItem
                      }`}
                      onClick={() => {
                        setMedia(false);
                        setDocuments(true);
                      }}
                    >
                      Документы
                    </button>
                  </div>
                  <IoIosClose
                    className={styles.closeModel}
                    onClick={onCancel}
                    color="black"
                    size="35"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className={styles.mediaContent}>
                  {mediaShow && (
                    <MediaRender
                      photoData={photoData}
                      modalPhoto={modalPh}
                      media={media}
                    />
                  )}
                  {documentsShow && <DocumentsRender media={media} />}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

ModalMediaChat.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

ModalMediaChat.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
};
export default ModalMediaChat;
