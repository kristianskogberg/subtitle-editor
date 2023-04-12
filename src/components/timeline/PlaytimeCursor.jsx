import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { moveCursor, setPlaytime } from "../../features/video/videoSlice";

export default function PlaytimeCursor({ item, elementId }) {
  const dispatch = useDispatch();
  const currentPlaytime = useSelector((state) => state.video.currentPlaytime);
  const isMouseOverSubtitleItem = useSelector(
    (state) => state.subtitle.isMouseOverSubtitleItem
  );
  const [startTime, setStartTime] = useState(0);
  //const [endTime, setEndTime] = useState(item.endTimeMs);
  const [itemIsMoving, setItemIsMoving] = useState(true);
  const isClicked = useRef(false);
  const isMoving = useRef(false);
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

    const onMouseUp = (e) => {
      isClicked.current = false;
      setItemIsMoving(false);
      target.style.zIndex = 10;
      target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseLeave = (e) => {
      target.style.zIndex = 0;
      isClicked.current = false;
      target.style.boxShadow = "none";
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      console.log("mouse move");
      isMoving.current = true;

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

      setStartTime(nextX);

      setItemIsMoving(true);

      //console.log(endX);
    };

    function onMouseOver() {
      target.style.zIndex = 10;
      target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";

      coords.current.lastX = target.offsetLeft;
    }

    function onMouseDown(e) {
      //if (isMouseOverSubtitleItem) return;

      console.log(isMouseOverSubtitleItem);

      isClicked.current = true;

      const cursorPosition = e.clientX - container.getBoundingClientRect().left;
      target.style.left = `${cursorPosition}px`;

      /*  console.log(
        "current playtiem: ",
        currentPlaytime,
        "xposition:",
        cursorPosition / 30
      ); */
      dispatch(moveCursor(cursorPosition / 30));
    }

    //target.addEventListener("mouseover", onMouseOver);
    //target.addEventListener("mousedown", onMouseDown);
    //target.addEventListener("mouseup", onMouseUp);

    container.addEventListener("mousedown", onMouseDown);
    // container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      target.removeEventListener("mouseover", onMouseOver);
    };

    return cleanup;
  }, [isMouseOverSubtitleItem]);

  function handleResize(direction) {
    console.log(direction);
    setDirection(direction);
  }

  useEffect(() => {
    if (itemIsMoving) return;

    //console.log(payload);
  }, [startTime, itemIsMoving]);

  useEffect(() => {
    console.log(isMouseOverSubtitleItem);
  }, [isMouseOverSubtitleItem]);

  return (
    <div
      id={elementId}
      className={` z-10 h-full absolute bg-amber-500 `}
      style={{ left: Math.floor(currentPlaytime * 30), width: `${2}px` }}
    ></div>
  );
}
