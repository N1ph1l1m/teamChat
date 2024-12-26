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
    console.log("Выбранный файл изображения:", files);

    const prewImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewData = {
          content: reader.result,
          type: file.type,
        };
        prewImages.push(previewData);
        setInputPrew((prev) => ({
          ...prev,
          preview: [...(prev.preview || []), previewData],
        }));
      };

      reader.readAsDataURL(file);
    });

    if (inputPrew && inputPrew.preview) {
      console.log("Предпросмотр изображений:", inputPrew.previews);
    }
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

    const prewImages = [];
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const previewData = {
          content: reader.result,
          type: file.type,
        };
        prewImages.push(previewData);

        setInputPrew((prev) => ({
          ...prev,
          preview: [...(prev.preview || []), previewData],
        }));
      };

      reader.readAsDataURL(file);
    });

    if (prewImages.length > 0) {
    }
  };
}
