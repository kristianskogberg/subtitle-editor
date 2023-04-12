import React, { Fragment, useEffect, useRef, useState } from "react";

import {
  BsFillPlayFill as PlayIcon,
  BsFillPauseFill as PauseIcon,
  BsVolumeUpFill as VolumeMaxIcon,
  BsVolumeDownFill as VolumeLowIcon,
  BsVolumeMuteFill as VolumeMuteIcon,
} from "react-icons/bs";

import {
  RiArrowGoBackLine as BackwardsIcon,
  RiArrowGoForwardLine as ForwardsIcon,
} from "react-icons/ri";

import { shallowEqual, useDispatch } from "react-redux";
import { setPlaytime, setDuration } from "../features/video/videoSlice";
import { useSelector } from "react-redux";
import convertSecToTimelineString from "../utils/convertSecToTimelineString";

export default function VideoPlayer({ src, autoPlay, muted }) {
  const subtitles = useSelector((state) => state.subtitle.subtitleItems);
  const currentPlaytime = useSelector((state) => state.video.currentPlaytime);
  const currentPlaytimeTimeline = useSelector(
    (state) => state.video.currentPlaytimeTimeline
  );
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const bufferRef = useRef(null);
  const [durationSec, setDurationSec] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [controlsOpacity, setControlsOpacity] = useState(0);
  const [volumeSliderOpacity, setVolumeSliderOpacity] = useState(0);
  const [hoverOnVolumeIcon, setHoverOnVolumeIcon] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const dispatch = useDispatch();
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.volume = volumeLevel;
    const element = videoRef.current;

    function onPlay() {
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(true);
    }

    function onPause() {
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(false);
    }

    function onWaiting() {
      if (isPlaying) setIsPlaying(false);

      setIsWaiting(true);
    }

    function onTimeUpdate() {
      if (isWaiting) setIsWaiting(false);
      if (!progressRef.current) return;

      const { currentTime, duration } = element;
      const progress = currentTime / duration;
      setDurationSec(duration);
      setCurrentTime(currentTime);
      const width = progress * 100;
      progressRef.current.style.width = `${width}%`;
      dispatch(setPlaytime(currentTime));
    }

    function onProgress() {
      /*
      if (!element.buffered.length || !bufferRef.current) return;

      const { duration } = element;
      const bufferEnd = element.buffer.end(element.buffer.length - 1);

      if (bufferRef.current && duration > 0) {
        const width = (bufferEnd / duration) * 100;
        bufferRef.current.style.width = `${width}%`;
      }
      */
    }

    function onDurationChange() {
      //console.log(element.duration);
      dispatch(setDuration(element.duration));
    }

    element.addEventListener("play", onPlay);
    element.addEventListener("playing", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("waiting", onWaiting);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("progress", onProgress);
    element.addEventListener("durationchange", onDurationChange);

    return () => {
      element.removeEventListener("play", onPlay);
      element.removeEventListener("playing", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("waiting", onWaiting);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("progress", onProgress);
      element.removeEventListener("durationchange", onDurationChange);
    };
  }, [videoRef.current]);

  function seekToPosition(e) {
    if (!videoRef.current) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - left) / width;

    if (clickPosition < 0 || clickPosition > 1) return;

    const durationMs = videoRef.current.duration * 100;
    const newTimeMs = (durationMs * clickPosition) / 100;

    videoRef.current.currentTime = newTimeMs;
  }

  function handlePlayPauseClick() {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  function onMouseOver() {
    setControlsOpacity(100);
  }

  function onMouseLeave() {
    setControlsOpacity(0);
  }

  function handleVolumeChange(e) {
    videoRef.current.volume = e.target.value;
    setVolumeLevel(e.target.value);
  }

  function handleMuteVolume() {
    if (videoRef.current.volume === 0) {
      videoRef.current.volume = 0.5;
      setVolumeLevel(0.5);
      return;
    }
    videoRef.current.volume = 0;
    setVolumeLevel(0);
  }

  function handleFastForward() {
    videoRef.current.currentTime += 5;
  }

  function handleRewind() {
    videoRef.current.currentTime -= 5;
  }

  useEffect(() => {
    if (!videoRef.current) return;

    console.log(currentPlaytimeTimeline);
    videoRef.current.currentTime = currentPlaytimeTimeline;
  }, [currentPlaytimeTimeline]);

  return (
    <div className=" w-full h-full flex flex-col  items-center justify-center ">
      <div
        className="relative w-full h-full flex flex-col cursor-pointer items-center justify-center  "
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={handlePlayPauseClick}
      >
        <div className="absolute text-3xl  bottom-4  h-full w-full text-center">
          <div className="h-full w-full flex items-end justify-center  whitespace-pre-wrap">
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
                  <p
                    className="bg-black bg-opacity-70 text-white dark:text-white"
                    key={item.id}
                  >
                    {item.textContent}
                  </p>
                );
              })}
            </span>
          </div>
        </div>
        <video
          className="flex-shrink-1 h-full w-full object-contain  bg-black -z-10 "
          // onClick={handlePlayPauseClick}
          ref={videoRef}
          autoPlay={autoPlay}
          //muted={muted}
          src={src}
        ></video>

        <div
          id="timeline-container"
          style={{ opacity: 0 }}
          className={` bg-gradient-to-b from-transparent to-black w-full h-[2rem] absolute  duration-300 left-0 bottom-0 items-end px-5`}
        >
          <div
            className="flex flex-row w-full items-center  "
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      </div>
      <>
        {/* timeline */}
        <div className="flex w-full cursor-pointer bottom-0">
          <div
            className=" flex w-full h-[10px]  bg-gray-500 overflow-hidden z-10"
            onClick={seekToPosition}
          >
            <div className="flex relative w-full h-full">
              {/* playback progress */}
              <div
                ref={progressRef}
                className="flex h-full bg-emerald-400 z-1"
              ></div>
              <div ref={bufferRef} className="flex h-full bg-white z-1"></div>
            </div>
          </div>
        </div>
        <div className=" pt-4 flex w-full justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <button className="" onClick={handlePlayPauseClick}>
              {isPlaying ? <PauseIcon size={50} /> : <PlayIcon size={50} />}
            </button>
            <div className="flex flex-row text-xl ">
              <p>{convertSecToTimelineString(currentTime)}</p>

              <label className="px-1 text-gray-500">/</label>
              <p className="text-gray-500">
                {convertSecToTimelineString(durationSec)}
              </p>
            </div>
          </div>{" "}
          {/* volume slider */}
          <div className="relative justify-center flex   h-full ">
            <button
              onMouseOver={() => setShowVolumeSlider(true)}
              onClick={() => handleMuteVolume()}
              className="z-10"
            >
              {volumeLevel < 0.01 ? <VolumeMuteIcon size={26} /> : null}
              {volumeLevel >= 0.01 && volumeLevel <= 0.5 ? (
                <VolumeLowIcon size={26} />
              ) : null}
              {volumeLevel > 0.5 ? <VolumeMaxIcon size={26} /> : null}
            </button>
            {showVolumeSlider ? (
              <>
                <span
                  //style={{ opacity: volumeSliderOpacity }}
                  onMouseLeave={() => setShowVolumeSlider(false)}
                  className={` duration-300 absolute h-[170px]  bottom-0 bg-transparent w-[50px]`}
                ></span>
                <input
                  // style={{ opacity: volumeSliderOpacity }}
                  className={` duration-300 absolute w-[100px] -rotate-90 bottom-20 accent-cyan-500   py-2 `}
                  type="range"
                  aria-orientation="vertical"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volumeLevel}
                  onChange={handleVolumeChange}
                  onMouseOver={() => setShowVolumeSlider(true)}
                ></input>
              </>
            ) : null}
          </div>
        </div>
      </>
    </div>
  );
}
