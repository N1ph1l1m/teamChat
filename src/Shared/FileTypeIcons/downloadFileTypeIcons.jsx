import Icon from "../icon/icon";
import { FaFile } from "react-icons/fa";
import { BiSolidFileTxt } from "react-icons/bi";
import { GrDocumentZip  ,  GrDocumentRtf} from "react-icons/gr";
import { BsFiletypeExe } from "react-icons/bs";
import { FaRegTrashAlt, FaFilePdf, FaFileWord , FaFileExcel  } from "react-icons/fa";
import { SiMicrosoftword , SiMicrosoftexcel , SiMicrosoftpowerpoint } from "react-icons/si";
import exel from "../../App/Icons/xls.png"
import txt from "../../App/Icons/txt.png"
import word from "../../App/Icons/word.png"
import pdf from "../../App/Icons/pdf.png"
import ppt from "../../App/Icons/ppt.png"



export default function DownloadFileTypeIcons(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
      case "txt":
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img src={txt} alt="txt" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
      case "zip": //zip
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
              <GrDocumentZip color="white" size="35" />
            </Icon>
          );
        }
      case "pdf": //pdf
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img src={pdf} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case 'doc': //doc
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img src={word} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
      case "docx" : //docx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img src={word} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case "xls": //xls
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
            <img src={exel} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case "xlsx": //xlsx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
               <img src={exel} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case "ppt": //ppt
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
        <img src={ppt} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case "pptx": //pptx
        // eslint-disable-next-line no-lone-blocks
        {
          return (
            <Icon>
             <img src={ppt} alt="exel" style={{width:"48px", height:"48px"}} />
            </Icon>
          );
        }
        case "application/x-msdownload":
          {
            return (
              <Icon>
                <BsFiletypeExe color="white" size="35" />
              </Icon>
            );
          }
      default:
        // return <img src={img.content} alt={`image-${index}`} />;
    }
  }
