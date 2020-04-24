import React from "react";
import { useTranslation } from "react-i18next";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import HightLight from "./HightLight";
import Statistic from "./Statistic";
import { WeedSchedule } from "./WeedSchedule";
function Right() {
  const { t } = useTranslation();
  return (
    <Stack>
      <WeedSchedule />
      <HightLight />
      <Statistic />
    </Stack>
  );
}

export default Right;
