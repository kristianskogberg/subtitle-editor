import React from "react";

import UploadSubtitles from "../UploadSubtitles";
import UploadVideo from "../UploadVideo";

import ButtonSection from "../ButtonSection";
import NavBar from "../NavBar";
import SubtitleTimeline from "../timeline/SubtitleTimeline";
import TestUploadSubtitlesLayout from "../TestUploadSubtitlesLayout";
import VideoTest from "../VideoTest";
import SubtitleSectionTest from "../SubtitleSectionTest";

// h-[calc(100vh-0px)]

export default function Edit() {
  return (
    <div className="flex flex-col px-4 lg:px-10 dark:bg-gray-900 w-full h-full lg:h-[calc(100vh-40px)]   text-black dark:text-white">
      <div className="flex flex-col h-full ">
        <div className="flex   flex-col-reverse lg:flex-row w-full h-[80%]  dark:bg-gray-900">
          <div className="flex w-full h-full lg:max-w-[600px]  ">
            <UploadSubtitles />
          </div>
          <div className="flex justify-center w-full h-full ">
            <UploadVideo />
          </div>
        </div>
        <div className="h-[10rem] hidden lg:block  dark:bg-gray-900">
          <SubtitleTimeline />
        </div>
      </div>
    </div>
  );
}
