import React from "react";

import UploadSubtitles from "../UploadSubtitles";
import UploadVideo from "../UploadVideo";

import ButtonSection from "../ButtonSection";
import NavBar from "../NavBar";
import SubtitleTimeline from "../timeline/SubtitleTimeline";
import TestUploadSubtitlesLayout from "../TestUploadSubtitlesLayout";

// h-[calc(100vh-0px)]

export default function Edit() {
  return (
    <div className="flex flex-col px-20 dark:bg-gray-900 w-full h-[calc(100vh-40px)]   text-black dark:text-white">
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col h-full ">
        <div className="flex  flex-row w-full h-[80%]  dark:bg-gray-900">
          <div className="w-full h-full max-w-[500px] ">
            <UploadSubtitles />
          </div>
          <div className="flex justify-center h-full w-full  p-20 dark:bg-gray-900">
            <UploadVideo />
          </div>
        </div>
        <div className="h-[10rem]   dark:bg-gray-900">
          <SubtitleTimeline />
        </div>
      </div>
    </div>
  );
}
