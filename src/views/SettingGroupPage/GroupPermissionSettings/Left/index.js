import {Box, ListItem, ListItemText} from "@material-ui/core";
import {mdiChevronLeft,} from "@mdi/js";
import LeftSideContainer from "components/LeftSideContainer";
import LoadingBox from "components/LoadingBox";
import {Routes} from "constants/routes";
import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {GroupPermissionSettingsContext} from "..";
import "./index.scss";
import {Alert, AlertTitle} from "@material-ui/lab";
import List from "@material-ui/core/List";

function Left({setMode, mode}) {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      <LeftSideContainer
        title={t('DMH.VIEW.DP.RIGHT.UT.PERMISSION')}
        leftAction={{
          iconPath: mdiChevronLeft,
          onClick: () => {
            history.push(Routes.SETTING_GROUP_INFO);
          },
          tooltip: t("Trở lại"),
        }}
        loading={{
          bool: false,
          component: () => <LoadingBox />,
        }}
      >
        <Box
          className="comp_GroupPermissionSettings__List"
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box className={"comp_GroupPermissionSettings__List_GuidelineWrapper"}>
            <Alert severity="info">
              <AlertTitle>{t("LABEL_QUICK_GUIDELINE")}</AlertTitle>
              <div className={"comp_GroupPermissionSettings__List_GuidelineWrapper_content"}>
                <span>{t("LABEL_QUICK_GUIDELINE_GROUP_PERMISSIONS_1")}</span>
                <span>{t("LABEL_QUICK_GUIDELINE_GROUP_PERMISSIONS_2")}</span>
              </div>
            </Alert>
            <Alert severity="error">
              <AlertTitle>{t("LABEL_WARNING")}</AlertTitle>
              <div className={"comp_GroupPermissionSettings__List_GuidelineWrapper_content"}>
                <span>{t("LABEL_GROUP_PERMISSION_WARNING")}</span>
              </div>
            </Alert>
          </Box>
          <List component={"nav"} className={"comp_GroupPermissionSettings__ListMenu"}>
            <ListItem
              className={`${mode === "GROUP_PERMISSION" && "comp_GroupPermissionSettings__ListMenu_active"}`}
              onClick={() => setMode("GROUP_PERMISSION")}
            >
              <ListItemText primary={t("IDS_WP_PERMISSION_GROUP")}/>
            </ListItem>
            <ListItem
              className={`${mode === "MEMBERS_PERMISSION" && "comp_GroupPermissionSettings__ListMenu_active"}`}
              onClick={() => setMode("MEMBERS_PERMISSION")}
            >
              <ListItemText primary={t("DMH.VIEW.DP.RIGHT.UT.PERMISSION")}/>
            </ListItem>
          </List>
        </Box>
      </LeftSideContainer>
    </>
  );
}
export default () => {
  const {
    select,
    setSelect,
    setModal,
    groupPermissionList,
    groupPermissionDefaultList,
    setMode, mode
  } = useContext(GroupPermissionSettingsContext);
  return (
    <Left
      groupPermissionList={groupPermissionList}
      groupPermissionDefaultList={groupPermissionDefaultList}
      {...{ setSelect, setModal, select, setMode, mode }}
    />
  );
};
