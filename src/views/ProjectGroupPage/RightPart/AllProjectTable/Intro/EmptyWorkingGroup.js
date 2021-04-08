import React from "react";
import * as images from "assets";
import {Box, Button, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "./styles.scss";
import CreateProjectGroup from "../../../Modals/CreateProjectGroup";

function EmptyWorkingGroup() {
  const {t} = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  function handleOpen() {
    setOpenModal(true);
  }
  return (
    <>
      <Box className={"introEmptyData-container"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h4"}>{t("LABEL_WORKING_GROUP")}</Typography>
          <p>{t("EMPTY_WORKING_GROUP_MESSAGE_1")}</p>
          <p>{t("EMPTY_WORKING_GROUP_MESSAGE_2")}</p>
          <p>{t("EMPTY_WORKING_GROUP_MESSAGE_3")}</p>
          <p>{t("EMPTY_WORKING_GROUP_MESSAGE_4")}</p>
          <p>{t("EMPTY_WORKING_GROUP_MESSAGE_5")}</p>
          <Button variant={"contained"} color={"primary"} disableElevation onClick={() => handleOpen()}>
            {t("LABEL_START_WORK_STEP_1")}
          </Button>
        </Box>
        <img src={images.bg004} alt={""} className={"bgEmpty"}/>
      </Box>
      <CreateProjectGroup open={openModal} setOpen={setOpenModal}/>
    </>
  );
}

export default EmptyWorkingGroup;