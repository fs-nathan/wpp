import React from "react";
import * as images from "assets";
import {Box, Button, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "../../../ProjectGroupPage/RightPart/AllProjectTable/Intro/styles.scss";
import {resolvedWorkType} from "../../../../helpers/project/commonHelpers";
import {isNil, get} from "lodash";
import {getPermissionViewDetailProject} from "../../../../actions/viewPermissions";
import {useDispatch, useSelector} from "react-redux";

function EmptyTasksIntro({projectName, projectID, handleOpenModal, work_type = 0}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const permissions = useSelector(state => state.viewPermissions.data.detailProject[projectID]);
  React.useEffect(() => {
    if(!isNil(projectID)) dispatch(getPermissionViewDetailProject({projectId: projectID}));
  }, [dispatch, projectID]);
  return (
    <>
      <Box className={"introEmptyData-container longContent"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h5"}>{t("LABEL_EMPTY_TASK_FIRST_CREATE")}</Typography>
          <div className={"selectedGroup"}>
            <img src={resolvedWorkType(work_type)} width={25} height={25} style={{marginRight: 10}}/>
            <strong style={{fontSize: "14px"}}>{projectName}</strong>
          </div>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_1")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_2")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_3")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_4")}}/>
          <p dangerouslySetInnerHTML={{__html: t("EMPTY_TASK_MESSAGE_5")}}/>
          <Box className={"introEmptyData__btnActionGroup"}>
            <Button variant={"contained"} color={"primary"} disableElevation onClick={() => handleOpenModal("CREATE")} style={{marginRight: "20px"}}>
              {t("LABEL_CHAT_TASK_TAO_CONG_VIEC")}
            </Button>
            {get(permissions, "update_project") && (
              <Button variant={"outlined"} disableElevation onClick={() => handleOpenModal("MEMBERS_SETTING")}>
                {t("LABEL_CHAT_TASK_THEM_THANH_VIEN")}
              </Button>
            )}
          </Box>
        </Box>
        <img src={images.bg003} alt={""} className={"bgEmpty"}/>
      </Box>
    </>
  );
}

export default EmptyTasksIntro;