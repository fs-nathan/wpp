import React from "react";
import * as images from "assets";
import {Box, Typography, Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "./styles.scss";

function IntroWhenEmptyData({type_data = null}) {
  const {t} = useTranslation();

  return (
    <Box className={"introEmptyData-container"}>
      <Box className={"introEmptyData-left"}>
        <Typography variant={"h5"}>{t("LABEL_PERSONAL_BOARD")}</Typography>
        <p>{t("EMPTY_PERSONAL_BOARD_MESSAGE_1")}</p>
        <p>{t("EMPTY_PERSONAL_BOARD_MESSAGE_2")}</p>
        <p>{t("EMPTY_PERSONAL_BOARD_MESSAGE_3")}</p>
        <Button variant={"contained"} color={"primary"} disableElevation>
          {t("LABEL_CREATE_PERSONAL_BOARD")}
        </Button>
      </Box>
      <img src={images.bg002} alt={""}/>
    </Box>
  );
}

export default IntroWhenEmptyData;