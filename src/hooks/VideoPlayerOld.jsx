import React, { useRef, useState } from "react";

import {
  RiArrowGoBackLine as BackwardsIcon,
  RiArrowGoForwardLine as ForwardsIcon,
  RiPauseCircleLine as PauseIcon,
  RiPlayCircleLine as PlayIcon,
} from "react-icons/ri";

export default function VideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      const vid = document.getElementById("video");
      setVideoTime(vid.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const rewind = () => {
    videoRef.current.currentTime -= 5;
  };

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  return (
    <div className="flex flex-col h-full w-full">
      <video id="video" ref={videoRef} className="video" src={videoUrl}></video>
      <div className="controlsContainer">
        <div className="controls">
          <BackwardsIcon size={50} onClick={rewind} />
          {playing ? (
            <PauseIcon size={50} onClick={() => videoHandler("pause")} />
          ) : (
            <PlayIcon size={50} onClick={() => videoHandler("play")} />
          )}

          <ForwardsIcon size={50} onClick={fastForward} />
        </div>
      </div>
      <div className="timecontrols">
        <p className="controlsTime">
          {Math.floor(currentTime / 60) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </p>
        <div className="time_progressbarContainer">
          <div
            style={{ width: `${progress}%` }}
            className="time_progressBar"
          ></div>
        </div>
        <p className="controlsTime">
          {Math.floor(videoTime / 60) +
            ":" +
            ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </p>
      </div>
    </div>
  );
}
