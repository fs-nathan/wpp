import React from "react";
import styled from "styled-components";
import ColorTypo from "components/ColorTypo";
import { useTranslation } from "react-i18next";
import { IconButton, Tab, Tabs } from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { StyledDialogTitle } from "components/CustomModal";

const TitleModalAdd = ({ value, handleChangeTab, setOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      <WrapperTitle
        className="comp_CustomModal__renderTitle"
        id="alert-dialog-slide-title"
      >
        <ColorTypo
          uppercase
          style={{
            overflow: "hidden",
            position: "relative",
            fontSize: "1.1rem",
            boxSizing: "border-box",
            fontWeight: "500",
          }}
        >
          {t("ADD_FIELDS_DATA")}
        </ColorTypo>
        <IconButton
          className="comp_CustomModal___iconButton"
          onClick={() => setOpen(false)}
        >
          <Icon path={mdiClose} size={1} color={"rgba(0, 0, 0, 0.54)"} />
        </IconButton>
      </WrapperTitle>
      <WrapperTabs
        value={value}
        onChange={handleChangeTab}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#4caf50",
          },
        }}
      >
        <Tab label={t("IDS_WP_CREATE_NEW")} {...a11yProps(0)} />
        <Tab label={t("SELECT_FROM_LIBRARY")} {...a11yProps(1)} />
      </WrapperTabs>
    </>
  );
};

const WrapperTitle = styled(StyledDialogTitle)`
  background: #fff !important;
  border: 0 !important;
  padding-bottom: 0 !important;
`;

const WrapperTabs = styled(Tabs)`
  border-bottom: 1px solid #0000001a;
  .Mui-selected span {
    color: #4caf50;
  }
`;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default TitleModalAdd;
