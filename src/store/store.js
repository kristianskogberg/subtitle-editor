import { combineReducers, configureStore } from "@reduxjs/toolkit";
import subtitleReducer from "../features/subtitle/subtitleSlice";
import videoReducer from "../features/video/videoSlice";

const reducer = combineReducers({
  subtitle: subtitleReducer,
  video: videoReducer,
});



export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
