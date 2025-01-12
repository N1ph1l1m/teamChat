import Icon from "../icon/icon";
import exel from "../../App/Icons/xls.png";
import txt from "../../App/Icons/txt.png";
import word from "../../App/Icons/word.png";
import pdf from "../../App/Icons/pdf.png";
import ppt from "../../App/Icons/ppt.png";
import zip from "../../App/Icons/zip.png";
import exe from "../../App/Icons/exe.png";
import defaultIcon from "../../App/Icons/icon-default.png";

export function DownloadFileTypeIcons(fileName) {
  const ext = fileName.split(".").pop().toLowerCase();
  switch (ext) {
    case "txt": {
      return (
        <Icon>
          <img className="fileType" src={txt} alt="txt" />
        </Icon>
      );
    }
    case "pdf": {
      return (
        <Icon>
          <img className="fileType" src={pdf} alt="exel" />
        </Icon>
      );
    }
    case "doc": {
      return (
        <Icon>
          <img className="fileType" src={word} alt="word" />
        </Icon>
      );
    }
    case "docx": {
      return (
        <Icon>
          <img className="fileType" src={word} alt="exel" />
        </Icon>
      );
    }
    case "xls": {
      return (
        <Icon>
          <img className="fileType" src={exel} alt="exel" />
        </Icon>
      );
    }
    case "xlsx": {
      return (
        <Icon>
          <img className="fileType" src={exel} alt="xlsx" />
        </Icon>
      );
    }
    case "ppt": {
      return (
        <Icon>
          <img className="fileType" src={ppt} alt="ppt" />
        </Icon>
      );
    }
    case "pptx": {
      return (
        <Icon>
          <img className="fileType" src={ppt} alt="pptx" />
        </Icon>
      );
    }
    case "zip": {
      return (
        <Icon>
          <img className="fileType" src={zip} alt="zip" />
        </Icon>
      );
    }
    case "rar": {
      return (
        <Icon>
          <img className="fileType" src={zip} alt="rar" />
        </Icon>
      );
    }
    case "exe": {
      return (
        <Icon>
          <img className="fileType" src={exe} alt="exe" />
        </Icon>
      );
    }

    default:
      <img className="fileType" src={defaultIcon} alt="default" />;
  }
}

export function InputFileTypeIcons(img, index) {
  switch (img.type) {
    case "text/plain": {
      return (
        <Icon>
          <img className="fileType" src={txt} alt="txt" />
        </Icon>
      );
    }

    case "application/x-zip-compressed": {
      //zip
      return (
        <Icon>
          <img className="fileType" src={zip} alt="rar" />
        </Icon>
      );
    }
    case "application/x-compressed": {
      //zip
      return (
        <Icon>
          <img className="fileType" src={zip} alt="rar" />
        </Icon>
      );
    }
    case "application/pdf": {
      //pdf
      return (
        <Icon>
          <img className="fileType" src={pdf} alt="exel" />
        </Icon>
      );
    }
    case "application/msword": {
      //doc
      return (
        <Icon>
          <img className="fileType" src={word} alt="word" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      //docx
      return (
        <Icon>
          <img className="fileType" src={word} alt="word" />
        </Icon>
      );
    }
    case "application/vnd.ms-excel": {
      //xls
      return (
        <Icon>
          <img className="fileType" src={exel} alt="xlsx" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      //xlsx
      return (
        <Icon>
          <img className="fileType" src={exel} alt="xlsx" />
        </Icon>
      );
    }
    case "application/vnd.ms-powerpoint": {
      //ppt
      return (
        <Icon>
          <img className="fileType" src={ppt} alt="pptx" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
      //pptx
      return (
        <Icon>
          <img className="fileType" src={ppt} alt="pptx" />
        </Icon>
      );
    }
    case "application/x-msdownload": {
      return (
        <Icon>
          <img className="fileType" src={exe} alt="exe" />
        </Icon>
      );
    }
    default:
      return (
        <Icon>
          <img className="fileType" src={img.content} alt="default" />
        </Icon>
      );
  }
}
