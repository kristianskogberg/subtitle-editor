import React, { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";

import { useDispatch, useSelector } from "react-redux";
import {
  editSubtitleItemTimeline,
  toggleMouseOverSubtitleItem,
} from "../../features/subtitle/subtitleSlice";

export default function DraggableSubtitle({ item, index, zoomLevel }) {
  const [size, setSize] = useState({
    width: (item.endTimeMs - item.startTimeMs) * zoomLevel,
    height: 80,
  });
  const dispatch = useDispatch();
  const [xPosition, setXPosition] = useState(item.startTimeMs * zoomLevel);
  const [disableDrag, setDisableDrag] = useState(false);
  const [focus, setFocus] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const subtitleItems = useSelector((state) => state.subtitle.subtitleItems);
  const theme = useSelector((state) => state.subtitle.theme);
  const [focusColor, setFocusColor] = useState("rgb(31 41 55)");
  const [unFocusColor, setUnFocusColor] = useState("#fff");

  useEffect(() => {
    if (theme === "light") {
      setFocusColor("rgb(31 41 55)");
    } else {
      setFocusColor("red");
    }
  }, [theme]);
  useEffect(() => {
    // if (itemIsMoving) return;

    const payload = {
      id: item.id,
      newStartMs: xPosition / zoomLevel,
      newEndMs: (xPosition + size.width) / zoomLevel,
    };

    //console.log(payload);

    dispatch(editSubtitleItemTimeline(payload));
  }, [xPosition, size]);

  useEffect(() => {
    setSize({
      width: (item.endTimeMs - item.startTimeMs) * zoomLevel,
      height: 60,
    });
    setXPosition(item.startTimeMs * zoomLevel);
  }, [zoomLevel]);

  function handleMouseLeave() {
    setMouseHover(false);
    if (clicked) return;
    setFocus(false);
  }

  function handleMouseOver() {
    setMouseHover(true);
    setFocus(true);
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <Rnd
        size={{ width: size.width, height: size.height }}
        position={{ x: xPosition, y: 30 }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onDrag={(e, d) => {
          setXPosition(d.x);
          //  setPosition({ x: d.x, y: d.y });
        }}
        onDragStart={(e) => {
          setClicked(true);
        }}
        onDragStop={(e, d) => {
          setXPosition(d.x);

          setClicked(false);
          if (!mouseHover) {
            setFocus(false);
          }
          //  setPosition({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
          //setPosition({ ...position });
          setFocus(true);
          setXPosition(position.x);
        }}
        onResizeStop={(e) => {
          if (!mouseHover) {
            setFocus(false);
          }
        }}
        dragAxis="x"
        /* resizeHandleStyles={{
        right: {
          backgroundColor: "rgb(156 163 175)",
          borderEndEndRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        },
      }} */
        bounds={"parent"}
        minWidth={50}
        enableResizing={{ right: true, left: true }}
        className={`  border-2  bg-white dark:bg-gray-900 px-2  border-transparent  rounded-lg  `}
        style={{
          backgroundColor: `${
            focus
              ? `${theme === "light" ? "rgb(31 41 55)" : "white"}`
              : `${theme === "light" ? "white" : "rgb(17 24 39)"}`
          }`,

          borderColor: `${
            focus
              ? `${theme === "light" ? "rgb(31 41 55)" : "white"}`
              : "rgb(107 114 128)"
          }`,
          zIndex: `${focus ? "1000" : "10"}`,
        }}
      >
        <span className="bg-white dark:bg-gray-900 w-full py-2 flex h-full px-1 ">
          <p className="line-clamp-2 overflow-hidden  text-sm h-full flex px-0 items-start select-none pointer-events-none">
            {index + ". " + item.textContent}
          </p>
        </span>
      </Rnd>
    </div>
  );
}
