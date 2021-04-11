import React from "react";
import * as images from "assets";
import {Box, Button, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "../../../ProjectGroupPage/RightPart/AllProjectTable/Intro/styles.scss";
import {resolvedWorkType} from "../../../../helpers/project/commonHelpers";

function EmptyTasksIntro({projectName, handleOpenModal, work_type = 0}) {
  const {t} = useTranslation();
  return (
    <>
      <Box className={"introEmptyData-container longContent"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h5"}>{t("LABEL_EMPTY_TASK_FIRST_CREATE")}</Typography>
          <div className={"selectedGroup"}>
            <img src={resolvedWorkType(work_type)} width={25} height={25} style={{marginRight: 10}}/>
            <strong>{projectName}</strong>
          </div>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_1")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_2")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_3")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_4")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_5")}}/>
          <Box className={"btnActionGroup"}>
            <Button variant={"contained"} color={"primary"} disableElevation onClick={() => handleOpenModal("CREATE")}>
              {t("LABEL_CHAT_TASK_TAO_CONG_VIEC")}
            </Button>
            <Button variant={"outlined"} disableElevation onClick={() => handleOpenModal("ADD_MEMBER")}>
              {t("LABEL_CHAT_TASK_THEM_THANH_VIEN")}
            </Button>
          </Box>
        </Box>
        <img src={images.bg003} alt={""} className={"bgEmpty"}/>
      </Box>
    </>
  );
}

export default EmptyTasksIntro;