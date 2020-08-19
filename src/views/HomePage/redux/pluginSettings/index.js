import { createAction } from "@reduxjs/toolkit";
import {
  createAsyncAction,
  createPostAsyncAction,
  createSimpleAsyncReducer,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "pluginSettings";

//
const initialState = {
  state: true,
  data: [],
};

const {
  load: loadPluginSettings,
  selector: pluginSettingsSelector,
  reducer: pluginSettingsReducer,
} = createSimpleAsyncReducer(
  // start_date: String format YYYY-MM-DD required
  // end_date: String format YYYY-MM-DD required
  (_blank, options) =>
    createAsyncAction({
      config: {
        url: `/home-page/get-setting`,
      },
      ...options,
    }),
  rootPath,
  initialState
);
//
const updatePluginSettings = ({ sections }) => {
  return createPostAsyncAction({
    config: {
      url: "/home-page/post-setting",
      data: { sections },
    },
    success: createAction(rootPath),
  });
};
export const pluginSettings = {
  selectors: { pluginSettingsSelector },
  actions: { loadPluginSettings, updatePluginSettings },
  key: rootPath,
  reducer: pluginSettingsReducer,
};
export default pluginSettings;
