import { Box } from "@material-ui/core";
import { mdiAccountKey, mdiChevronLeft, mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import LoadingBox from "components/LoadingBox";
import SearchBox from "components/SearchInput";
import { Routes } from "constants/routes";
import React, { useCallback, useContext, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  createMapPropsFromAttrs,
  loginlineParams,
  template,
} from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import { DraggableList } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/DraggableList";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { GroupPermissionSettingsCotnext } from "..";
import AddGroupPermissionModal from "../components/AddGroupPermissionModal";
import { groupPermissionAttr } from "../contants";
function Left({ groupPermissionList, setSelect, setModal }) {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = useCallback((e) => setKeyword(e.target.value), []);
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <LeftSideContainer
      title={t("Thiết lập nhóm quyền")}
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
      <Box height="100%" display="flex" flexDirection="column">
        <Box
          position="sticky"
          style={{ background: "#fff" }}
          top="0px"
          zIndex={1}
        >
          <Stack>
            <div />
            <Box padding="0 10px">
              <ListItemLayout
                title={t("Danh sách nhóm quyền")}
                actions={
                  <AddButton
                    onClick={() => {
                      setModal(<AddGroupPermissionModal />);
                    }}
                    label={t("Thêm nhóm")}
                  />
                }
              ></ListItemLayout>
            </Box>
            <Box padding="0 10px">
              <SearchBox
                fullWidth
                placeholder="Tìm nhóm dự án"
                onChange={handleInputChange}
              />
            </Box>
          </Stack>
          <Space heigth="10px" />
        </Box>
        <Box flex="1">
          <Scrollbars autoHide autoHideTimeout={500}>
            <Box paddingRight="10px">
              <DraggableList
                list={groupPermissionList.filter((item) =>
                  item.name.includes(keyword)
                )}
                getId={(item) => item.id}
                renderListWrapper={(children) => (
                  <StyledList>{children}</StyledList>
                )}
                onDragEnd={loginlineParams}
              >
                {(item, bindDraggable, bindDragHandle) => {
                  const [
                    name,
                    total_of_member_assigned,
                  ] = createMapPropsFromAttrs([
                    groupPermissionAttr.name,
                    groupPermissionAttr.total_of_member_assigned,
                  ])(item);
                  return bindDraggable(
                    <div>
                      <StyledListItem
                        onClick={() => {
                          setSelect(item);
                        }}
                      >
                        {bindDragHandle(
                          <div style={{ flexShrink: 0, lineHeight: 1 }}>
                            <Icon
                              path={mdiDragVertical}
                              size={1}
                              color="#8d8d8d"
                            />
                          </div>
                        )}
                        <Icon
                          style={{ flexShrink: 0, fill: "#8d8d8d" }}
                          path={mdiAccountKey}
                          size={1}
                        />
                        <ListItemLayout
                          title={name}
                          subTitle={template(
                            t("Đã gán <%= number %> thành viên")
                          )({
                            number: total_of_member_assigned,
                          })}
                        ></ListItemLayout>
                      </StyledListItem>
                    </div>
                  );
                }}
              </DraggableList>
              <Space heigth="50px" />
            </Box>
          </Scrollbars>
        </Box>
      </Box>
    </LeftSideContainer>
  );
}
export default () => {
  const { setSelect, setModal, groupPermissionList } = useContext(
    GroupPermissionSettingsCotnext
  );
  return (
    <Left
      groupPermissionList={groupPermissionList}
      {...{ setSelect, setModal }}
    />
  );
};
