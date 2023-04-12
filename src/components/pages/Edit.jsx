import React from "react";
import Button from "../Button";
import SubtitleItem from "../SubtitleItem";
import Test from "../Test";
import SubtitleTimeline from "../SubtitleTimeline";
import UploadSubtitles from "../UploadSubtitles";
import UploadVideo from "../UploadVideo";
import SubtitleTimelineOld from "../TimelineOld";
import ButtonSection from "../ButtonSection";
import NavBar from "../NavBar";

// h-[calc(100vh-0px)]

export default function Edit() {
  return (
    <div className="flex flex-col px-20 dark:bg-gray-900 w-full h-[calc(100vh-0px)]   text-black dark:text-white">
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col h-[85%] ">
        <div className="flex  flex-row w-full h-[80%]  dark:bg-gray-900">
          <div className="w-full  max-w-[600px] ">
            <UploadSubtitles />
          </div>
          <div className="flex justify-center h-full w-full  p-20 dark:bg-gray-900">
            <UploadVideo />
          </div>
        </div>
        <div className="h-[20%]   dark:bg-gray-900">
          <SubtitleTimelineOld />
        </div>
      </div>
      <div className="h-[10%] flex items-center justify-end">
        <ButtonSection />
      </div>
    </div>
  );
}
