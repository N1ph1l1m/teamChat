export function SendFiles(send, setInputPrew) {
  if (send.length === 0) {
    setInputPrew({ preview: [] });

    return;
  }

  const files = Array.from(send);
  const prewFiles = files.map((file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve({ content: reader.result, type: file.type });
      };
      reader.readAsDataURL(file);
    });
  });

  Promise.all(prewFiles).then((file) => {
    setInputPrew({ preview: file });
  });
}
