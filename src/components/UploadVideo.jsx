import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

import { useSelector, useDispatch } from "react-redux";
import { upload } from "../features/video/videoSlice";

import {
  FiUpload as UploadIcon,
  FiDownload as DownloadIcon,
} from "react-icons/fi";
import VideoPlayer from "./VideoPlayer";
import ButtonSection from "./ButtonSection";
import VideoTest from "./VideoTest";

export default function UploadVideo() {
  const videoUrl = useSelector((state) => state.video.url);
  const currentPlaytime = useSelector((state) => state.video.currentPlaytime);
  const dispatch = useDispatch();

  const hiddenFileInputRef = useRef(null);

  const [sub, setSub] = useState([]);

  const subtitles = useSelector((state) => state.subtitle.subtitleItems);

  function handleSubmit(e) {
    e.preventDefault();
    handleUploadVideoClick();
  }
  function handleUploadVideoClick() {
    hiddenFileInputRef.current.click();
  }

  function handleVideoChange(e) {
    //setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();
    dispatch(upload(e));
  }

  return (
    <div className="flex  flex-col h-full   z-10">
      <div className=" flex h-full  w-full rounded-xl">
        <div className="flex w-full h-full">
          <div className="relative w-full h-full">
            <VideoPlayer src={videoUrl} autoPlay={true} muted={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
