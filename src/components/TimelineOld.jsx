import React, { useEffect, useRef, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHorizontalScroll } from "../hooks/UseHorizontalScroll";
import useDragComponent from "../hooks/UseDragComponent";
import SubtitleItem from "./SubtitleItem";
import PlaytimeCursor from "./timeline/PlaytimeCursor";

export default function SubtitleTimelineOld() {
  const subtitleItems = useSelector((state) => state.subtitle.subtitleItems);
  const videoDurationArray = useSelector((state) => state.video.durationArray);
  const videoDurationSec = useSelector((state) => state.video.durationSec);
  const currentPlaytime = useSelector((state) => state.video.currentPlaytime);
  const scrollRef = useHorizontalScroll();

  return (
    <div className="dark:bg-gray-900   h-full ">
      <div
        className="w-full overflow-x-scroll h-full flex flex-col"
        ref={scrollRef}
      >
        {/*<div className="bg-gray-200 glex justify-center items-center h-[100px]"></div>*/}
        <div className="relative pb-2 ">
          {videoDurationArray.map((time) => {
            if (time.label === null) {
              return (
                <span
                  style={{
                    position: "absolute",
                    left: `${time.value * 30}px`,
                  }}
                  className=" bg-gray-300 dark:bg-gray-700 w-[2px] h-[10px] bottom-0"
                ></span>
              );
            }
            if (time.label !== null) {
              return (
                <>
                  <label
                    className="absolute h-full select-none pointer-events-none"
                    style={{
                      paddingLeft: 6,
                      left: `${time.value * 30}px`,
                    }}
                  >
                    {time.label}{" "}
                  </label>

                  <span
                    style={{
                      position: "absolute",

                      left: `${time.value * 30}px`,
                    }}
                    className=" bg-gray-300 dark:bg-gray-700 w-[2px] h-[30px] bottom-0"
                  ></span>
                </>
              );
            }
          })}
          <label className="opacity-0 select-none pointer-events-none">0</label>
        </div>
        <div
          //ref={containerRef}
          // onWheel={onMouseWheel}
          className="relative h-full  bg-gray-300 dark:bg-gray-800"
          style={{ width: `${videoDurationSec * 30}px` }}
        >
          <div className="w-full h-full ">
            <PlaytimeCursor elementId={"playtime-cursor"} />

            {/* <>
              <span className="absolute left-[300px] bg-gray-100 w-[2px] h-[100px]"></span>
              <span className="absolute left-[600px] bg-gray-100 w-[2px] h-[100px]"></span>
        </>*/}

            <div id="holder">
              {subtitleItems.map((item, index) => {
                return (
                  <SubtitleItem
                    item={item}
                    index={index + 1}
                    elementId={`subtitle-item-${item.id}`}
                    key={item.id}
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
