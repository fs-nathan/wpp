import React from "react";
import { useTranslation } from "react-i18next";
import { labels } from "../../contants/attrs";
import LeftSetting from "../LeftSetting";
import "./style.scss";
const ListPart = ({ listMenu }) => {
  const { t } = useTranslation();
  return <LeftSetting title={t(labels.pageTitle)} listMenu={listMenu} />;
};

export default ListPart;
