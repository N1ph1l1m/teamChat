import Icon from "../icon/icon";
import { FaFile } from "react-icons/fa";
import { BiSolidFileTxt } from "react-icons/bi";
import { GrDocumentZip  ,  GrDocumentRtf} from "react-icons/gr";
import { BsFiletypeExe } from "react-icons/bs";
import { FaRegTrashAlt, FaFilePdf, FaFileWord , FaFileExcel  } from "react-icons/fa";
import { SiMicrosoftword , SiMicrosoftexcel , SiMicrosoftpowerpoint } from "react-icons/si";


export default function InputFileTypeIcons(img, index) {
    switch (img.type) {
      case "text/plain":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <BiSolidFileTxt color="black" size="40" />
            </Icon>
          );
        }
      case "application/x-zip-compressed": //zip
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <GrDocumentZip color="black" size="40" />
            </Icon>
          );
        }
      case "application/pdf": //pdf
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <FaFilePdf color="black" size="40" />
            </Icon>
          );
        }
        case 'application/msword': //doc
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftword color="black" size="40" />
            </Icon>
          );
        }
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : //docx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftword color="black" size="40" />
            </Icon>
          );
        }
        case "application/vnd.ms-excel": //xls
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftexcel color="black" size="40" />
            </Icon>
          );
        }
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": //xlsx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftexcel color="black" size="40" />
            </Icon>
          );
        }
        case "application/vnd.ms-powerpoint": //ppt
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftpowerpoint color="black" size="40" />
            </Icon>
          );
        }
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation": //pptx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <SiMicrosoftpowerpoint color="black" size="40" />
            </Icon>
          );
        }
        case "application/x-msdownload":
          {
            return (
              <Icon>
                <BsFiletypeExe color="black" size="40" />
              </Icon>
            );
          }
      default:
        return <img src={img.content} alt={`image-${index}`} />;
    }
  }
