import React from "react";

export default function Test() {
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] px-20">
      <div className="flex flex-row w-full h-[75%]">
        <div className=" min-w-[600px] bg-cyan-200  ">
          <div className="overflow-auto max-h-full">
            <div className="bg-green-200 p-20"></div>
            <div className="bg-green-200 p-20"></div>
            <div className="bg-green-200 p-20"></div>
            <div className="bg-green-200 p-20"></div>
            <div className="bg-green-200 p-20"></div>
            <div className="bg-green-200 p-20"></div>
          </div>
        </div>
        <div className="flex justify-center h-full w-full bg-blue-200 p-20">
          <form className="aspect-video max-w-full flex rounded-xl border-2 border-gray-500 border-dashed"></form>
        </div>
      </div>
      <div className="bg-cyan-100 h-[15%]"></div>
      <div className="bg-cyan-100 h-[10%]"></div>
    </div>
  );
}
