import React from "react";
import * as images from "assets";
import {Box, Button, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "../../../ProjectGroupPage/RightPart/AllProjectTable/Intro/styles.scss";
import {get} from "lodash";
import CustomAvatar from "../../../../components/CustomAvatar";

function EmptyTasksIntro({group, handleOpenModal}) {
  const {t} = useTranslation();
  return (
    <>
      <Box className={"introEmptyData-container longContent"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h4"}>{t("LABEL_EMPTY_TASK_FIRST_CREATE")}</Typography>
          <div className={"selectedGroup"}>
            <CustomAvatar
              style={{marginRight: "10px", width: 25, height: 25}}
              src={get(group, 'icon')}
              alt='avatar'
            />
            <strong>{get(group, "name")}</strong>
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
            <Button variant={"outlined"} disableElevation onClick={() => handleOpenModal("PERMISSION")}>
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