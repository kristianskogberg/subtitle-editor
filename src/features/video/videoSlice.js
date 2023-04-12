import { createSlice } from "@reduxjs/toolkit";
import convertSecToTimestring from "../../utils/convertSecToTimestring";
import convertSecToTimelineString from "../../utils/convertSecToTimelineString";
import { INITIAL_TIMELINE_LENGTH } from "../../constants";

const initialState = {
  url: "",
  video: null,
  currentPlaytime: 0,
  durationSec: 120,
  durationArray: INITIAL_TIMELINE_LENGTH,
  currentPlaytimeTimeline: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    upload: (state, action) => {
      if (action.payload.target.files && action.payload.target.files[0]) {
        //url for rendering image on client

        const videoUrl = URL.createObjectURL(action.payload.target.files[0]);
        state.url = videoUrl;
        state.video = action.payload.target.files[0];
      }
    },
    setPlaytime: (state, action) => {
      state.currentPlaytime = action.payload;
    },
    moveCursor: (state, action) => {
      state.currentPlaytimeTimeline = action.payload;
    },
    setDuration: (state, action) => {
      let vidoeDurationArr = [];
      for (let i = 0; i <= Math.floor(action.payload); i++) {
        const currentNumber = Number(i).toFixed(1);
        if (currentNumber % 10 === 0) {
          vidoeDurationArr.push({
            label: convertSecToTimelineString(Number(i).toFixed(1)),
            value: Number(i).toFixed(0),
          });
        } else {
          vidoeDurationArr.push({
            label: null,
            value: Number(i).toFixed(0),
          });
        }
      }
      console.log(vidoeDurationArr);
      state.durationArray = vidoeDurationArr;
      state.durationSec = action.payload;
    },
  },
});

export const { upload, setPlaytime, setDuration, moveCursor } =
  videoSlice.actions;

export default videoSlice.reducer;
