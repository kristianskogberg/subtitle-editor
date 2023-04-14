import React from "react";

export default function VideoTest() {
  return (
    <div className="p-6 w-full   h-full items-center flex flex-col justify-center">
      <div className=" w-full   h-full">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        ></iframe>
      </div>

      <div className="py-4 w-full">video controls</div>
    </div>
  );
}
