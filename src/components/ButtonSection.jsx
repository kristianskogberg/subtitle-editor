import React, { useState, useEffect } from "react";
import Button from "./Button";
import {
  FiUpload as UploadIcon,
  FiDownload as DownloadIcon,
} from "react-icons/fi";
import { createFinalSubtitles } from "../features/subtitle/subtitleSlice";

import { useDispatch, useSelector } from "react-redux";

export default function ButtonSection() {
  const content = useSelector((state) => state.subtitle.content);

  const isLoading = useSelector((state) => state.subtitle.isLoading);
  const dispatch = useDispatch();
  const [downloadClicked, setDownloadClicked] = useState(false);

  function handleDownloadSubtitles() {
    setDownloadClicked(true);
    dispatch(createFinalSubtitles());
  }

  useEffect(() => {
    if (content === null) return;

    if (!downloadClicked) return;

    const element = document.createElement("a");
    element.setAttribute("id", "download-link");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "mySubtitles.vtt";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // remove link from DOM
    // remove any existing download link
    const existingElement = document.getElementById("download-link");
    if (existingElement) {
      existingElement.parentNode.removeChild(existingElement);
    }

    setDownloadClicked(false);
  }, [content, downloadClicked]);

  return (
    <>
      <Button
        text={"Download Subtitles"}
        icon={<DownloadIcon />}
        color={"primary"}
        onClick={handleDownloadSubtitles}
      />
    </>
  );
}
