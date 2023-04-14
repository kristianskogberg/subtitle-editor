import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import convertTimeToMs from "../../utils/convertTimeToMs";
import { v4 as uuidv4 } from "uuid";
import convertSecToTimestring from "../../utils/convertSecToTimestring";

const initialState = {
  content: null,
  rows: 0,
  file: null,
  url: null,
  subtitleItems: [],
  isLoading: false,
  isMouseOverSubtitleItem: false,
  theme: "light",
};

/*
export const createFinalSubtitles = createAsyncThunk(
  "createFinalSubtitles",
  async () => {
    let finalContent = "";
    current(state).subtitleItems.forEach((item, index) => {
      console.log(item);
      const itemString =
        index +
        1 +
        "\n" +
        item.startTime +
        " --> " +
        item.endTime +
        "\n" +
        item.textContent +
        "\n\n";
      finalContent += itemString;
    });

    //console.log(finalContent);
    //state.content = finalContent;
    return finalContent;
  }
);
*/

export const subtitleSlice = createSlice({
  name: "subtitle",
  initialState,

  reducers: {
    uploadSrt: (state, action) => {
      state.content = action.payload;

      const fileBlob = new Blob([action.payload]);
      state.url = URL.createObjectURL(fileBlob);

      const file = new File([fileBlob], "name.vtt", { type: "text/vtt" });

      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = file.name;

      state.file = element.href;

      const content = action.payload.split("\n\n");
      const rows = action.payload.split("\n");

      state.rows = rows;

      content.forEach((e, index) => {
        //console.log(e);

        // remove empty rows
        const item = e.split("\n").filter((row) => row !== "");

        const itemNumber = item[0]; //number
        const startAndEndTime = item[1];

        // remove item number and start and end time rows
        const textContent = item.slice(2);

        if (e.includes(":")) {
          // kyseessä on aika rivi, checkaa onks valid
          let colonAmount = startAndEndTime.split(":").length - 1;
          let arrowLineAmount = startAndEndTime.split("-").length - 1;
          let arrowHeadAmount = startAndEndTime.split(">").length - 1;

          const startTime = startAndEndTime.split(" ")[0];
          const endTime =
            startAndEndTime.split(" ")[startAndEndTime.split(" ").length - 1];

          let error = false;

          if (
            colonAmount !== 4 ||
            arrowLineAmount !== 2 ||
            arrowHeadAmount !== 1
          ) {
            // epävalid aikarivi
            error = true;
          }

          // valid aikarivi

          const { ms, shortFormat } = convertTimeToMs(startTime);
          const startTimeMs = ms;
          const startTimeShort = shortFormat;

          {
            ms, shortFormat;
          }
          convertTimeToMs(endTime);

          const endTimeMs = ms;
          const endTimeShort = shortFormat;

          state.subtitleItems.push({
            id: uuidv4(),
            startTime: startTime,
            startTimeMs: convertTimeToMs(startTime).ms,
            endTimeMs: convertTimeToMs(endTime).ms,
            endTime: endTime,
            textContent: textContent.join("\n"),
            error: error,
          });
        }
      });
    },
    editSrt: (state, action) => {
      state.content = action.payload;

      const fileBlob = new Blob([action.payload], { type: ".vtt" });
      state.url = URL.createObjectURL(fileBlob);
      state.file = new File([fileBlob], "subtitles.vtt", { type: ".vtt" });

      const content = action.payload.split("\n\n");
      const rows = action.payload.split("\n");

      state.rows = rows;

      const subtitleItems = [];

      content.forEach((e, index) => {
        //console.log(e);

        // remove empty rows
        const item = e.split("\n").filter((row) => row !== "");

        const itemNumber = item[0]; //number
        const startAndEndTime = item[1];

        // remove item number and start and end time rows
        const textContent = item.slice(2);

        //console.log(textContent);

        if (e.includes(":")) {
          // kyseessä on aika rivi, checkaa onks valid
          let colonAmount = startAndEndTime.split(":").length - 1;
          let arrowLineAmount = startAndEndTime.split("-").length - 1;
          let arrowHeadAmount = startAndEndTime.split(">").length - 1;

          const startTime = startAndEndTime.split(" ")[0];
          const endTime =
            startAndEndTime.split(" ")[startAndEndTime.split(" ").length - 1];

          let error = false;

          if (
            colonAmount !== 4 ||
            arrowLineAmount !== 2 ||
            arrowHeadAmount !== 1
          ) {
            // epävalid aikarivi
            error = true;
          }

          // valid aikarivi, set error

          const { ms, shortFormat } = convertTimeToMs(startTime);

          subtitleItems.push({
            id: uuidv4(),
            startTime: startTime,
            startTimeMs: convertTimeToMs(startTime).ms,
            endTimeMs: convertTimeToMs(endTime).ms,
            endTime: endTime,
            textContent: textContent,
            error: error,
          });
        }
      });

      state.subtitleItems = subtitleItems;
    },
    createSrt: (state, action) => {
      state.content = "";
    },

    toggleMouseOverSubtitleItem: (state, action) => {
      console.log("toggled to: ", action.payload);
      state.isMouseOverSubtitleItem = action.payload;
    },

    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },

    addSubtitleItem: (state, action) => {
      let startTime = "00:00:00,000";
      let startTimeMs = 0;

      let endTime = "00:00:04,000";
      let endTimeMs = 4;

      if (action.payload !== undefined) {
        startTimeMs = action.payload;
        startTime = convertSecToTimestring(startTimeMs);

        endTimeMs = startTimeMs + 4;
        endTime = convertSecToTimestring(endTimeMs);
      }

      state.subtitleItems.push({
        id: uuidv4(),
        startTime: startTime,
        startTimeMs: startTimeMs,
        endTimeMs: endTimeMs,
        endTime: endTime,
        textContent: "",
        error: false,
      });
    },

    editSubtitleItem: (state, action) => {
      //console.log(action.payload.value);
      let updatedSubtitleItems = [];

      switch (action.payload.field) {
        case "textContent":
          updatedSubtitleItems = current(state).subtitleItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, textContent: action.payload.value }
              : item
          );
          state.subtitleItems = updatedSubtitleItems;
          break;

        case "startTime":
          updatedSubtitleItems = current(state).subtitleItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  startTime: action.payload.value,
                  startTimeMs: convertTimeToMs(action.payload.value).ms,
                }
              : item
          );
          state.subtitleItems = updatedSubtitleItems;
          break;

        case "endTime":
          updatedSubtitleItems = current(state).subtitleItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  endTime: action.payload.value,
                  endTimeMs: convertTimeToMs(action.payload.value).ms,
                }
              : item
          );
          state.subtitleItems = updatedSubtitleItems;
          break;

        default:
          break;
      }
    },

    editSubtitleItemTimeline: (state, action) => {
      let updatedSubtitleItems = [];

      //const a = convertSecToTimestring(action.payload.newStartMs);

      updatedSubtitleItems = current(state).subtitleItems.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              startTimeMs: action.payload.newStartMs,
              startTime: convertSecToTimestring(action.payload.newStartMs),

              endTimeMs: action.payload.newEndMs,
              endTime: convertSecToTimestring(action.payload.newEndMs),
            }
          : item
      );

      state.subtitleItems = updatedSubtitleItems;
    },

    deleteSubtitleItem: (state, action) => {
      let updatedSubtitleItems = [];
      updatedSubtitleItems = current(state).subtitleItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.subtitleItems = updatedSubtitleItems;
    },

    createFinalSubtitles: (state, action) => {
      let finalContent = "";
      current(state).subtitleItems.forEach((item, index) => {
        const itemString =
          index +
          1 +
          "\n" +
          item.startTime +
          " --> " +
          item.endTime +
          "\n" +
          item.textContent +
          "\n\n";
        finalContent += itemString;
      });

      //console.log(finalContent);
      state.content = finalContent;
    },
  },
});

export const {
  uploadSrt,
  editSrt,
  editSubtitleItem,
  createSrt,
  addSubtitleItem,
  deleteSubtitleItem,
  createFinalSubtitles,
  editSubtitleItemTimeline,
  toggleMouseOverSubtitleItem,
  toggleTheme,
} = subtitleSlice.actions;

export default subtitleSlice.reducer;
