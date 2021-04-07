import React from "react";
import * as images from "assets";
import {Box, Button, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import "./styles.scss";
import {find, get} from "lodash";
import {useSelector} from "react-redux";
import CustomAvatar from "../../../../../components/CustomAvatar";
import CreateNewProjectModal from "../../../Modals/CreateNewProject";

function IntroEmptyWorkingBoard({groupID}) {
  const {t} = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  const [group, setGroup] = React.useState(null);
  const groups = useSelector(state => state.projectGroup.listProjectGroup.data.projectGroups);
  function handleOpen() {
    setOpenModal(true);
  }
  React.useEffect(() => {
    const _group = find(groups, {"id": groupID});
    setGroup(_group);
  }, [groups, groupID]);
  return (
    <>
      <Box className={"introEmptyData-container longContent"}>
        <Box className={"introEmptyData-left"}>
          <Typography variant={"h4"}>{t("LABEL_WORKING_BOARD_FIRST_CREATE")}</Typography>
          <div className={"selectedGroup"}>
            <CustomAvatar
              style={{marginRight: "10px", width: 25, height: 25}}
              src={get(group, 'icon')}
              alt='avatar'
            />
            <strong>{get(group, "name")}</strong>
          </div>
          <p>{t("EMPTY_WORKING_BOARD_MESSAGE_1")}</p>
          <p>{t("EMPTY_WORKING_BOARD_MESSAGE_2")}</p>
          <p>{t("EMPTY_WORKING_BOARD_MESSAGE_3")}</p>
          <ul>
            <li><p dangerouslySetInnerHTML={{__html: t("EMPTY_WORKING_BOARD_MESSAGE_WORKING_TYPE1")}}/></li>
            <li><p dangerouslySetInnerHTML={{__html: t("EMPTY_WORKING_BOARD_MESSAGE_WORKING_TYPE2")}}/></li>
            <li><p dangerouslySetInnerHTML={{__html: t("EMPTY_WORKING_BOARD_MESSAGE_WORKING_TYPE3")}}/></li>
          </ul>
          <p>{t("EMPTY_WORKING_BOARD_MESSAGE_4")}</p>
          <Button variant={"contained"} color={"primary"} disableElevation onClick={() => handleOpen()}>
            {t("LABEL_WORKING_BOARD_CREATE")}
          </Button>
        </Box>
        <img src={images.bg001} alt={""} className={"bgEmpty"}/>
      </Box>
      <CreateNewProjectModal open={openModal} setOpen={setOpenModal} projectGroupId={groupID}/>
    </>
  );
}

export default IntroEmptyWorkingBoard;