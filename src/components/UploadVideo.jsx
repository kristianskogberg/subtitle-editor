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

  useEffect(() => {
    setSub(subtitles);
  }, [subtitles]);

  return (
    <div className="z-10">
      <div className=" flex h-full flex- rounded-xl">
        {videoUrl === "" ? (
          <form
            onSubmit={handleSubmit}
            className="h-full w-full rounded-xl border-2 border-gray-500 border-dashed"
          >
            <span className="flex  items-center justify-center w-full h-full">
              <Button
                text={"Upload a Video (.mp4)"}
                type="submit"
                icon={<UploadIcon size={24} />}
              />
            </span>
            <input
              type="file"
              accept="video/mp4"
              ref={hiddenFileInputRef}
              onChange={handleVideoChange}
              className="hidden"
            />
          </form>
        ) : (
          <div className="flex w-full flex-col h-full items-center justify-center">
            <VideoPlayer src={videoUrl} autoPlay={false} muted={true} />
          </div>
        )}
      </div>
    </div>
  );
}
