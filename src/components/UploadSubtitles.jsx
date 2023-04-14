import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

import { useSelector, useDispatch } from "react-redux";
import {
  addSubtitleItem,
  createSrt,
  editSrt,
  uploadSrt,
  editSubtitleItem,
  deleteSubtitleItem,
  createFinalSubtitles,
} from "../features/subtitle/subtitleSlice";

import { AiOutlineFileAdd as AddFileIcon } from "react-icons/ai";
import { IoClose as DeleteIcon } from "react-icons/io5";
import { BiTimeFive as TimeIcon } from "react-icons/bi";
import { IoMdAdd as AddIcon } from "react-icons/io";
import {
  FiUpload as UploadIcon,
  FiDownload as DownloadIcon,
} from "react-icons/fi";

import { MdArrowRightAlt as RightArrowIcon } from "react-icons/md";
import ButtonSection from "./ButtonSection";

export default function UploadSubtitles() {
  const content = useSelector((state) => state.subtitle.content);
  const currentPlaytime = useSelector((state) => state.video.currentPlaytime);
  const subtitleItems = useSelector((state) => state.subtitle.subtitleItems);
  const isLoading = useSelector((state) => state.subtitle.isLoading);
  const dispatch = useDispatch();
  const [downloadClicked, setDownloadClicked] = useState(false);

  const hiddenFileInputRef = useRef(null);

  function handleUploadSubtitles(e) {
    e.preventDefault();
    handleUploadClick();
  }
  function handleCreateNewFile(e) {
    e.preventDefault();
    dispatch(addSubtitleItem());
  }

  function handleUploadClick() {
    hiddenFileInputRef.current.click();
  }

  async function handleFileChange(e) {
    //setImageUrl(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();

    const fileUrl = URL.createObjectURL(e.target.files[0]);

    const fileReader = new FileReader();
    const { files } = e.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      const content = e.target.result;

      dispatch(uploadSrt(content));
    };
  }

  function handleRemoveVideo() {
    dispatch(removeImage());
  }

  function handleEditSrt(e) {
    dispatch(editSrt(e.target.value));
  }

  function handleDownloadSubtitles() {
    /*
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = Date.now() + ".vtt";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    */
    setDownloadClicked(true);
    dispatch(createFinalSubtitles());
  }

  useEffect(() => {
    if (content === null) return;

    if (!downloadClicked) return;

    const element = document.createElement("a");
    element.setAttribute("id", "download-link");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "mySubtitles.vtt";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // remove link from DOM
    // remove any existing download link
    const existingElement = document.getElementById("download-link");
    if (existingElement) {
      existingElement.parentNode.removeChild(existingElement);
    }

    setDownloadClicked(false);
  }, [content, downloadClicked]);

  function handleAddNewSubtitleItem(e) {
    e.preventDefault();
    dispatch(addSubtitleItem(currentPlaytime));
  }

  function handleEditSubtitleItem(e, id, field) {
    e.preventDefault();
    dispatch(
      editSubtitleItem({
        id: id,
        value: e.target.value,
        field: field,
      })
    );
  }

  function handleDeleteSubtitleItem(e, id) {
    e.preventDefault();
    dispatch(
      deleteSubtitleItem({
        id: id,
      })
    );
  }

  return (
    <div className="flex flex-col p-1 lg:p-6 h-full w-full ">
      {subtitleItems.length === 0 ? (
        <form className="h-[37vh] lg:h-[calc(60vh+10px)] border-2 border-gray-400 flex flex-col gap-10 items-center justify-center w-full  ">
          <div>
            <Button
              text={"Select Subtitles (.srt / .vtt)"}
              onClick={handleUploadSubtitles}
              icon={<UploadIcon size={24} />}
            />

            <input
              type="file"
              accept=".vtt"
              ref={hiddenFileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <p>or</p>
          <div>
            <Button
              text={"Create a new subtitle file"}
              onClick={handleCreateNewFile}
              icon={<AddFileIcon size={24} />}
            />
          </div>
        </form>
      ) : (
        <div className="h-[37vh] lg:h-[calc(60vh+10px)] border-2 border-gray-400 flex flex-col overflow-auto  w-full justify-start  items-center">
          <form className="h-full   w-full overflow-auto   ">
            {subtitleItems.map((item, index) => {
              return (
                <div
                  className={`${
                    (index + 1) % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-800"
                  }   `}
                  key={item.id}
                >
                  {/*

                  <div className="relative ">
                    <code className="absolute z-10 mx-2 text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </code>
                  </div>

                  <div className="relative ">
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSubtitleItem(e, item.id)}
                      className="absolute z-10 right-0 mx-2 my-1 text-xl text-gray-600 dark:text-gray-300 "
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                */}

                  <div className="grid grid-cols-1 gap-3 p-2">
                    <div className="flex   w-full justify-between items-center">
                      <label className="pr-2 ">{index + 1}</label>

                      <div className="relative ">
                        <span className="absolute inset-y-0 left-1 flex items-center pl-1">
                          <TimeIcon size={20} />
                        </span>
                        <label className="py-1 px-4 text-sm  w-full rounded-lg pl-8  ">
                          {item.startTime}
                        </label>
                      </div>
                      <div className="text-black px-3 dark:text-white flex items-center  justify-center">
                        <RightArrowIcon size={24} />
                      </div>
                      <div className="relative ">
                        <span className="absolute inset-y-0 left-1 flex items-center pl-1">
                          <TimeIcon size={20} />
                        </span>
                        <label className="py-1 px-4 text-sm  w-full rounded-lg pl-8  ">
                          {item.endTime}
                        </label>
                      </div>
                      <div className="relative pl-2 ">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSubtitleItem(e, item.id)}
                          className=" z-10 text-xl flex  text-gray-500 dark:text-gray-300 "
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="w-full h-auto resize-none bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-500 rounded-lg p-2"
                        value={item.textContent}
                        rows={2}
                        placeholder="Type your subtitle here..."
                        onChange={(e) => {
                          handleEditSubtitleItem(e, item.id, "textContent");
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-full flex justify-center py-6">
              <Button
                text="Add subtitle"
                type="submit"
                onClick={handleAddNewSubtitleItem}
                icon={<AddIcon size={24} />}
              />
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 flex w-full py-6  justify-center">
        <Button
          text={"Download Subtitles"}
          icon={<DownloadIcon />}
          color={"primary"}
          onClick={handleDownloadSubtitles}
          disabled={subtitleItems.length === 0 ? true : false}
        />
      </div>
    </div>
  );
}
