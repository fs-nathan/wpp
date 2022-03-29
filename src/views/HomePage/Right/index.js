import get from "lodash/get";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import pluginSettingsModule from "../redux/pluginSettings";
import HightLight from "./HightLight";
import Language from "./Language";
import Statistic from "./Statistic";
import WeedSchedule from "./WeedSchedule";
function Right() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pluginSettingsResponse = useSelector(
    pluginSettingsModule.selectors.pluginSettingsSelector
  );
  const pluginSettings = get(pluginSettingsResponse, "data", emptyArray);
  useEffect(() => {
    dispatch(pluginSettingsModule.actions.loadPluginSettings());
  }, [dispatch]);
  return (
    <Stack>
      {pluginSettings.map((item) => {
        if (item.status === "OFF") return null;
        switch (item.value) {
          // case 1:
          //   return <WeedSchedule key={item.value} />;
          case 2:
            return <HightLight key={item.value} />;
          case 3:
            return <Statistic key={item.value} />;
          default:
            return null;
        }
      })}

      <Language />
    </Stack>
  );
}

export default Right;
