import Icon from "../icon/icon";
import { GrDocumentZip} from "react-icons/gr";
import { BsFiletypeExe } from "react-icons/bs";
import exel from "../../App/Icons/xls.png"
import txt from "../../App/Icons/txt.png"
import word from "../../App/Icons/word.png"
import pdf from "../../App/Icons/pdf.png"
import ppt from "../../App/Icons/ppt.png"
import zip from "../../App/Icons/zip.png"
import exe from "../../App/Icons/exe.png"
import defaultIcon from "../../App/Icons/icon-default.png"



 export function DownloadFileTypeIcons(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case "txt":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img className ="fileType"  src={txt} alt="txt"  />
            </Icon>
          );
        }
      case "pdf": //pdf
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img  className="fileType" src={pdf} alt="exel"  />
            </Icon>
          );
        }
        case 'doc': //doc
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img  className="fileType" src={word} alt="word"  />
            </Icon>
          );
        }
      case "docx" : //docx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img  className="fileType" src={word} alt="exel"  />
            </Icon>
          );
        }
        case "xls": //xls
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img className="fileType" src={exel} alt="exel" />
            </Icon>
          );
        }
        case "xlsx":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
               <img  className="fileType" src={exel} alt="xlsx"  />
            </Icon>
          );
        }
        case "ppt":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
             <img  className ="fileType" src={ppt} alt="ppt"  />
            </Icon>
          );
        }
        case "pptx":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
             <img  className ="fileType" src={ppt} alt="pptx"  />
            </Icon>
          );
        }
      case "zip":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img className ="fileType"  src={zip} alt="zip"  />
            </Icon>
          );
        }
        case "rar":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img className ="fileType"  src={zip} alt="rar"  />
            </Icon>
          );
        }
        case "exe":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img className ="fileType"  src={exe} alt="exe"/>
            </Icon>
          );
        }

      default:
        <img className ="fileType"  src={defaultIcon} alt="default"  />
    }
  }


export function InputFileTypeIcons(img, index) {
    switch (img.type) {
      case "text/plain":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img className ="fileType"  src={txt} alt="txt"  />
            </Icon>
          );
        }

      case "application/x-zip-compressed": //zip
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img className ="fileType"  src={zip} alt="rar"  />
            </Icon>
          );
        }
        case "application/x-compressed": //zip
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img className ="fileType"  src={zip} alt="rar"  />
            </Icon>
          );
        }
      case "application/pdf": //pdf
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
               <img  className="fileType" src={pdf} alt="exel"  />
            </Icon>
          );
        }
        case 'application/msword': //doc
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img  className="fileType" src={word} alt="word"  />
            </Icon>
          );
        }
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : //docx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
                 <img  className="fileType" src={word} alt="word"  />
            </Icon>
          );
        }
        case "application/vnd.ms-excel": //xls
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
                          <img  className="fileType" src={exel} alt="xlsx"  />
            </Icon>
          );
        }
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //xlsx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
                  <img  className="fileType" src={exel} alt="xlsx"  />
            </Icon>
          );
        }
        case "application/vnd.ms-powerpoint": //ppt
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
               <img  className ="fileType" src={ppt} alt="pptx"  />
            </Icon>
          );
        }
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <img  className ="fileType" src={ppt} alt="pptx"  />
            </Icon>
          );
        }
        case "application/x-msdownload":
          {
            return (
              <Icon>
                  <img className ="fileType"  src={exe} alt="exe"/>
              </Icon>
            );
          }
      default:
        <img className ="fileType"  src={defaultIcon} alt="default"  />
    }
  }

// export   DownloadFileTypeIcons , InputFileTypeIcons;
