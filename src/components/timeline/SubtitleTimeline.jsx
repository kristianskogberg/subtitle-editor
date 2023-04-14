import React, { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";
import PlaytimeCursor from "./PlaytimeCursor";
import { useHorizontalScroll } from "../../hooks/UseHorizontalScroll";
import { useSelector } from "react-redux";
import DraggableSubtitle from "./DraggableSubtitle";

export default function SubtitleTimeline() {
  const scrollRef = useHorizontalScroll();
  const subtitleItems = useSelector((state) => state.subtitle.subtitleItems);
  const videoDurationArray = useSelector((state) => state.video.durationArray);
  const videoDurationSec = useSelector((state) => state.video.durationSec);
  const [zoomLevel, setZoomLevel] = useState(30);

  function handleZoom(e) {
    console.log(e.deltaY);
    const INTERVAL = 5;
    if (e.deltaY < 0) {
      if (zoomLevel >= 50) return;
      setZoomLevel(zoomLevel + INTERVAL);
    } else {
      // scroll down
      if (zoomLevel <= 10) return;
      setZoomLevel(zoomLevel - INTERVAL);
    }
  }

  return (
    <div className="dark:bg-gray-900   h-full ">
      <div
        className="w-full overflow-x-scroll h-full flex flex-col"
        onWheel={handleZoom}
        ref={scrollRef}
      >
        {/*<div className="bg-gray-200 glex justify-center items-center h-[100px]"></div>*/}
        <div className="relative pb-3 ">
          {videoDurationArray.map((time, index) => {
            if (time.label === null) {
              return (
                <span
                  key={index}
                  style={{
                    position: "absolute",
                    left: `${time.value * zoomLevel}px`,
                  }}
                  className=" bg-gray-300 dark:bg-gray-700 w-[2px] h-[10px] bottom-1"
                ></span>
              );
            }
            if (time.label !== null) {
              return (
                <span key={index}>
                  <label
                    className="absolute text-sm text-gray-500 h-full select-none pointer-events-none"
                    style={{
                      paddingLeft: 6,
                      left: `${time.value * zoomLevel}px`,
                    }}
                  >
                    {time.label}
                  </label>

                  <span
                    style={{
                      position: "absolute",

                      left: `${time.value * zoomLevel}px`,
                    }}
                    className=" bg-gray-300 dark:bg-gray-700 w-[2px] h-[30px] bottom-1"
                  ></span>
                </span>
              );
            }
          })}
          <label className="opacity-0 select-none pointer-events-none">0</label>
        </div>
        <div
          //ref={containerRef}
          // onWheel={onMouseWheel}
          className="relative h-full  bg-gray-300 dark:bg-gray-800"
          style={{ width: `${videoDurationSec * zoomLevel}px` }}
        >
          <div className="w-full h-full ">
            <PlaytimeCursor
              elementId={"playtime-cursor"}
              zoomLevel={zoomLevel}
            />

            <div>
              {subtitleItems.map((item, index) => {
                return (
                  <DraggableSubtitle
                    item={item}
                    index={index + 1}
                    key={item.id}
                    zoomLevel={zoomLevel}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
