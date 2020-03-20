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
const ListPart = () => {
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
      icon: mdiAccountSwitch,
      sub: [
        {
          name: t(labels.mission_giving),
          url: Routes.MISSION.replace(":typeAssign", "0")
        },
        {
          name: t(labels.mission_given),
          url: Routes.MISSION.replace(":typeAssign", "1")
        },
        {
          name: t(labels.self_giving),
          url: Routes.MISSION.replace(":typeAssign", "2")
        }
      ]
    },

    {
      title: t(labels.role),
      icon: mdiAccountTie,
      sub: [
        {
          name: t(labels.role_doing),
          url: Routes.ROLE.replace(":roleId", "0")
        },
        {
          name: t(labels.role_monitor),
          url: Routes.ROLE.replace(":roleId", "1")
        },
        {
          name: t(labels.role_coordination),
          url: Routes.ROLE.replace(":roleId", "2")
        }
      ]
    }
  ];
  return <LeftSetting title={t(labels.pageTitle)} listMenu={listMenu} />;
};

export default ListPart;
