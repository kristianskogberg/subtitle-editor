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
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-900  border-gray-200">
      {subtitleItems.length === 0 ? (
        <form className="flex flex-col gap-10 items-center justify-center w-full h-full  ">
          <div>
            <Button
              text={"Upload Subtitles (.srt / .vtt)"}
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
        <div className="flex  flex-col w-full  h-full justify-start  items-center">
          <form className="flex flex-col  h-full w-full overflow-auto   ">
            {subtitleItems.map((item, index) => {
              return (
                <div
                  className={`${
                    (index + 1) % 2 === 0
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-800"
                  }   `}
                  key={item.id}
                >
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

                  <div className="grid grid-cols-1 gap-4 p-6">
                    <div className="grid grid-cols-9   w-full justify-center items-center">
                      <div className="relative col-span-4">
                        <span className="absolute inset-y-0 left-1 flex items-center pl-1">
                          <TimeIcon size={24} />
                        </span>
                        <input
                          type="text"
                          name="q"
                          className="py-2 text-sm bg-white dark:bg-gray-900 w-full rounded-lg pl-10   border-2 border-gray-300 dark:border-gray-500"
                          placeholder="Start Time"
                          value={item.startTime}
                          onChange={(e) =>
                            handleEditSubtitleItem(e, item.id, "startTime")
                          }
                        />
                      </div>
                      <div className="text-black dark:text-white flex items-center col-span-1  justify-center">
                        <RightArrowIcon size={24} />
                      </div>
                      <div className="relative col-span-4">
                        <span className="absolute inset-y-0 left-1 flex items-center pl-1">
                          <TimeIcon size={24} />
                        </span>
                        <input
                          type="text"
                          name="q"
                          className="py-2 text-sm bg-white dark:bg-gray-900 w-full rounded-lg pl-10  border-2 border-gray-300 dark:border-gray-500"
                          placeholder="End Time"
                          value={item.endTime}
                          onChange={(e) =>
                            handleEditSubtitleItem(e, item.id, "endTime")
                          }
                        />
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

                      {/*    <div
                          className="w-full h-auto  bg-white border-2 border-gray-300 rounded-lg p-2"
                          contentEditable={true}
                          onChange={(e) => console.log(e.target.value)}
                        >
                          {item.textContent}
                        </div>*/}
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

          {/*  <textarea
              type="text"
              rows={10}
              className=" rounded-xl resize-none w-full h-full overflow-y-scroll border-2 border-primary  p-2"
              value={content}
              onChange={handleEditSrt}
        /> */}
        </div>
      )}
    </div>
  );
}
