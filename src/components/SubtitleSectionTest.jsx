import React from "react";

export default function SubtitleSectionTest() {
  return (
    <div className="p-6 flex flex-col w-full h-full bg-red-100">
      <div className="h-[30vh] lg:h-[calc(60vh+10px)] bg-green-100 w-full overflow-auto">
        <p className="py-20">test</p>
        <p className="py-20">test</p>
        <p className="py-20">test</p>
        <p className="py-20">test</p>
        <p className="py-20">test</p>
      </div>

      <button className="mt-6">Test</button>
    </div>
  );
}
