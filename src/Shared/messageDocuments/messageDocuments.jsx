import React from "react";
import styles from "../../App/Styles/messageDocuments.module.css";
import { DownloadFileTypeIcons } from "../FileTypeIcons/downloadFileTypeIcons";
import { Parameters } from "../../App/Parameters/Parametrs";
export function MessageDocuments({ documents }) {
  if (!documents) return null;
  return (
    <>
      {documents.map((document, index) => (
        <div
          className={styles.documentHeaderWrap}
          key={`doc-${index}-${document.document}`}
        >
          {DownloadFileTypeIcons(document.name)}
          <div className={styles.documentTitleUpload}>
            <a
              key={index}
              href={`${Parameters.url}chat/docs/${document.id}/${document.name}/`}
              download
              className={styles.documentTitle}
            >
              <span style={{ color: "black" }}>{document.name}</span>
              <span className={styles.documentUpload}>Загрузить</span>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
