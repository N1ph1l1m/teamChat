export function handlerInputTextChange(setMessage) {
  return (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
}

export function handlerInputImages(
  setModel,
  setSendImage,
  setSelectTypeFile,
  setInputPrew,
  inputPrew
) {
  return (e) => {
    if (e.target.files.length > 10) {
      alert("Можно отправить только 10 файлов");
      setModel(false);
      setSendImage("");
      return null;
    }

    setModel(true);
    setSelectTypeFile(false);
    const files = Array.from(e.target.files);
    setSendImage(files);
    // console.log("Выбранный файл изображения:", files);
  };
}

export function handlerInputDocuments(
  setModel,
  setSendDocument,
  setSelectTypeFile,
  setInputPrew
) {
  return (e) => {
    if (e.target.files.length > 10) {
      alert("Можно отправить только 10 файлов");
      setModel(false);
      setSendDocument("");
      return null;
    }

    setModel(true);
    setSelectTypeFile(false);
    const files = Array.from(e.target.files);
    setSendDocument(files);
  };
}

export function removeElementModal(
  index,
  sendDocument,
  setSendDocument,
  sendImage,
  setSendImage
) {
  if (sendDocument && sendDocument.length !== 0) {
    const newSendImage = sendDocument.filter((_, i) => i !== index);
    setSendDocument(newSendImage);
  }
  if (sendImage && sendImage.length !== 0) {
    const newSendImage = sendImage.filter((_, i) => i !== index);
    setSendImage(newSendImage);
  }
}
