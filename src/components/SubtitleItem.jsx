import React, { useState, useEffect, useRef } from "react";


import { useDispatch } from "react-redux";
import {
  editSubtitleItemTimeline,
  toggleMouseOverSubtitleItem,
} from "../features/subtitle/subtitleSlice";

export default function SubtitleItem({ item, index, elementId }) {
  const dispatch = useDispatch();

  const xPosition = useRef(item.startTimeMs * 30);
  const [startTime, setStartTime] = useState(item.startTimeMs);
  const [endTime, setEndTime] = useState(item.endTimeMs);
  const [itemIsMoving, setItemIsMoving] = useState(true);
  const isClicked = useRef(false);
  const [direction, setDirection] = useState("");

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(elementId);
    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("target element must have a parent");

    const onMouseDown = (e) => {
      isClicked.current = true;
      console.log("mouse down", e.clientX);
      target.style.zIndex = 1000;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e) => {
      isClicked.current = false;
      setItemIsMoving(false);
      target.style.zIndex = 10;
      target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseLeave = (e) => {
      if (isClicked.current) return;

      target.style.zIndex = 0;
      // dispatch(toggleMouseOverSubtitleItem(false));
      isClicked.current = false;
      target.style.boxShadow = "none";
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      target.style.zIndex = 1000;
      target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";

      const nextX = e.clientX + -coords.current.startX + coords.current.lastX;
      // const nextY = e.clientY - coords.current.startY + coords.current.lastY;
      //xPosition.current = 0;

      if (nextX < 0) {
        // item goes off the timeline
        return;
      }
      //target.style.top = `${nextY}px`;
      /* console.log("onMouseMove", {
        eClientX: e.clientX,
        coordsStartX: coords.current.startX,
        coordsLastX: coords.current.lastX,
        nextX: nextX,
      }); */

      target.style.left = `${nextX}px`;
      //console.log(nextX);

      const endX = (item.endTimeMs - item.startTimeMs) * 30 + nextX;
      setStartTime(nextX);
      setEndTime(endX);
      setItemIsMoving(true);

      //console.log(endX);
    };

    function onMouseOver() {
      target.style.zIndex = 10;
      target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
      dispatch(toggleMouseOverSubtitleItem(true));
      console.log("mouse over");
      coords.current.lastX = target.offsetLeft;
    }

    target.addEventListener("mouseover", onMouseOver);
    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      target.removeEventListener("mouseover", onMouseOver);
    };

    return cleanup;
  }, [elementId]);

  function handleResize(direction) {
    console.log(direction);
    setDirection(direction);
  }

  useEffect(() => {
    if (itemIsMoving) return;

    if (item.startTimeMs === startTime || item.endTimeMs === endTime) return;

    const payload = {
      id: item.id,
      newStartMs: startTime / 30,
      newEndMs: endTime / 30,
      //field: "startTimeMs",
    };
    //console.log(payload);

    dispatch(editSubtitleItemTimeline(payload));
  }, [startTime, endTime, itemIsMoving]);

  return (
    <div
      id={elementId}
      className="absolute text-ellipsis bg-white h-10 items-center justify-center flex w-20 overflow-hidden text-black cursor-pointer text-center rounded-lg  top-[30px]"
      style={{
        left: `${item.startTimeMs * 30}px`,
        width: `${(item.endTimeMs - item.startTimeMs) * 30}px`,
      }}
    >
      {/*  <div className="absolute cursor-ew-resize w-[6px] h-full z-1 left-0 top-0 bg-gray-300"></div> */}
      <label className="truncate px-4 select-none pointer-events-none">
        {index + ". " + item.textContent}
      </label>
    </div>
  );
}
