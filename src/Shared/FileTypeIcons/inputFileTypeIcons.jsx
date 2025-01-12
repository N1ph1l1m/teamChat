import Icon from "../icon/icon";
import { BiSolidFileTxt } from "react-icons/bi";
import { GrDocumentZip } from "react-icons/gr";
import { BsFiletypeExe } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import {
  SiMicrosoftword,
  SiMicrosoftexcel,
  SiMicrosoftpowerpoint,
} from "react-icons/si";

export default function InputFileTypeIcons(img, index) {
  switch (img.type) {
    case "text/plain": {
      return (
        <Icon>
          <BiSolidFileTxt color="black" size="40" />
        </Icon>
      );
    }
    case "application/x-zip-compressed": {
      return (
        <Icon>
          <GrDocumentZip color="black" size="40" />
        </Icon>
      );
    }
    case "application/pdf": {
      return (
        <Icon>
          <FaFilePdf color="black" size="40" />
        </Icon>
      );
    }
    case "application/msword": {
      return (
        <Icon>
          <SiMicrosoftword color="black" size="40" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      return (
        <Icon>
          <SiMicrosoftword color="black" size="40" />
        </Icon>
      );
    }
    case "application/vnd.ms-excel": {
      return (
        <Icon>
          <SiMicrosoftexcel color="black" size="40" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      return (
        <Icon>
          <SiMicrosoftexcel color="black" size="40" />
        </Icon>
      );
    }
    case "application/vnd.ms-powerpoint": {
      return (
        <Icon>
          <SiMicrosoftpowerpoint color="black" size="40" />
        </Icon>
      );
    }
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
      return (
        <Icon>
          <SiMicrosoftpowerpoint color="black" size="40" />
        </Icon>
      );
    }
    case "application/x-msdownload": {
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
