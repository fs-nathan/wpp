import {
  mdiAccountSwitch,
  mdiAccountTie,
  mdiAlarm,
  mdiViewDashboard
} from "@mdi/js";
import React from "react";
import { useTranslation } from "react-i18next";
import LeftSetting from "../../../../components/LeftSetting/LeftSetting";
import { labels } from "../../contants/attrs";
import { Routes } from "../../contants/routes";
import "./style.scss";
const ListPart = props => {
  const { t } = useTranslation();
  const listMenu = [
    {
      title: t(labels.overview),
      url: Routes.OVERVIEW,
      icon: mdiViewDashboard
    },
    {
      title: t(labels.due),
      url: Routes.DUE,
      icon: mdiAlarm
    },
    {
      title: t(labels.mission),
      url: Routes.MISSION,
      icon: mdiAccountSwitch
    },
    {
      title: t(labels.mission_giving),
      url: Routes.MISSION_GIVING
    },
    {
      title: t(labels.mission_given),
      url: Routes.MISSION_GIVEN
    },
    {
      title: t(labels.self_giving),
      url: Routes.MISSION_SELFGIVING
    },
    {
      title: t(labels.role),
      url: Routes.ROLE,
      icon: mdiAccountTie
    },
    {
      title: t(labels.role_doing),
      url: Routes.ROLE_RUNNING
    },
    {
      title: t(labels.role_monitor),
      url: Routes.ROLE_MONITOR
    },
    {
      title: t(labels.role_coordination),
      url: Routes.ROLE_COORDINATION
    }
  ];
  return <LeftSetting title={t(labels.pageTitle)} listMenu={listMenu} />;
};

export default ListPart;
