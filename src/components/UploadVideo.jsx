import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

import { useSelector, useDispatch } from "react-redux";
import { upload } from "../features/video/videoSlice";

//import subtitles from "../../test.vtt";
import ReactPlayer from "react-player";

import {
  RiArrowGoBackLine as BackwardsIcon,
  RiArrowGoForwardLine as ForwardsIcon,
  //RiPauseCircleLine as PauseIcon,
  //RiPlayCircleLine as PlayIcon,
} from "react-icons/ri";

import {
  FiUpload as UploadIcon,
  FiDownload as DownloadIcon,
} from "react-icons/fi";
import VideoPlayer from "./VideoPlayer";

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
    <div className="flex  flex-col h-full aspect-video max-w-full z-10">
      <div className=" flex h-full   rounded-xl">
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
          <div className="flex w-full h-full">
            <div className="relative w-full h-full">
              {/*  <div className="absolute text-3xl text-white   h-full w-full text-center">
                <div className="h-full w-full flex items-end justify-center pb-10 whitespace-pre-wrap">
                  <span>
                    {subtitles?.map((item) => {
                      if (
                        item.startTimeMs > currentPlaytime ||
                        item.endTimeMs < currentPlaytime
                      ) {
                        // do not show subtitle
                        return;
                      }
                      return (
                        <p className="bg-black bg-opacity-75" key={item.id}>
                          {item.textContent}
                        </p>
                      );
                    })}
                  </span>
                </div>
                  </div> */}
              <div className="w-full"></div>
              <VideoPlayer src={videoUrl} autoPlay={true} muted={true} />

              {/* <ReactPlayer
              config={{
                file: {
                  attributes: {
                    crossOrigin: "true",
                  },
                },
              }}
              controls={true}
              url={videoUrl}
              muted={true}
              playing={playing}
              width={"100%"}
              height={"auto"}
            /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
