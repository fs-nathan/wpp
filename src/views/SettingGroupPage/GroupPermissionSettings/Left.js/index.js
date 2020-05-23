import { Box, IconButton } from "@material-ui/core";
import {
  mdiAccountKey,
  mdiChevronLeft,
  mdiDotsVertical,
  mdiDragVertical,
} from "@mdi/js";
import Icon from "@mdi/react";
import { StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import LoadingBox from "components/LoadingBox";
import SearchBox from "components/SearchInput";
import { Routes } from "constants/routes";
import React, { useCallback, useContext, useMemo, useState } from "react";
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
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import { ItemMenu } from "../components/ItemMenu";
import UpdateInfoGroupPermissionModal from "../components/UpdateInfoGroupPermissionModal";
import { groupPermissionAttr } from "../contants";
import "./index.css";

const GroupSettingMenu = ({ menuAnchor, item, onClose, setMenuAnchor }) => {
  const { t } = useTranslation();
  const { setModal } = useContext(GroupPermissionSettingsCotnext);
  const options = useMemo(() => {
    return [
      { key: "edit", label: t("Chỉnh sửa") },
      { key: "delete", label: t("Xóa") },
    ];
  }, [t]);
  const handleItemClick = (key) => {
    switch (key) {
      case "edit":
        setModal(<UpdateInfoGroupPermissionModal item={item} />);
        break;
      case "delete":
        setModal(<DeleteGroupPermissionModal item={item} />);
        break;
      default:
        break;
    }
  };
  return (
    <ItemMenu
      onItemClick={handleItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
    ></ItemMenu>
  );
};

function Left({
  groupPermissionList,
  setSelect,
  groupPermissionDefaultList,
  setModal,
}) {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = useCallback((e) => setKeyword(e.target.value), []);
  const history = useHistory();
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState(null);
  return (
    <>
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
        <Box
          className="comp_GroupPermissionSettings__List"
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box style={{ background: "#fff" }}>
            <Stack>
              <div />
              <Box padding="0 15px">
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
              <Box padding="0 15px">
                <SearchBox
                  fullWidth
                  placeholder={t("Tìm nhóm quyền")}
                  onChange={handleInputChange}
                />
              </Box>
            </Stack>
            <Space heigth="10px" />
          </Box>
          <Box flex="1">
            <Box>
              <StyledList>
                {groupPermissionDefaultList.map((item) => {
                  const [
                    id,
                    name,
                    total_of_member_assigned,
                    can_modify,
                  ] = createMapPropsFromAttrs([
                    groupPermissionAttr.id,
                    groupPermissionAttr.name,
                    groupPermissionAttr.total_of_member_assigned,
                    groupPermissionAttr.can_modify,
                  ])(item);
                  return (
                    <StyledListItem
                      key={id}
                      onClick={() => {
                        setSelect(item, true);
                      }}
                    >
                      <div style={{ flexShrink: 0, lineHeight: 1 }}>
                        {can_modify && (
                          <Icon
                            path={mdiDragVertical}
                            size={1}
                            color="#8d8d8d"
                          />
                        )}
                      </div>

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
                        actions={
                          can_modify && (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuAnchor(
                                  <GroupSettingMenu
                                    item={item}
                                    menuAnchor={e.currentTarget}
                                    setMenuAnchor={setMenuAnchor}
                                  />
                                );
                              }}
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <Icon
                                path={mdiDotsVertical}
                                size={1}
                                color="rgba(0, 0, 0, 0.7)"
                              />
                            </IconButton>
                          )
                        }
                      ></ListItemLayout>
                    </StyledListItem>
                  );
                })}
              </StyledList>
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
                          actions={
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuAnchor(
                                  <GroupSettingMenu
                                    item={item}
                                    menuAnchor={e.currentTarget}
                                    setMenuAnchor={setMenuAnchor}
                                  />
                                );
                              }}
                              color="primary"
                              aria-label="upload picture"
                              component="span"
                            >
                              <Icon
                                path={mdiDotsVertical}
                                size={1}
                                color="rgba(0, 0, 0, 0.7)"
                              />
                            </IconButton>
                          }
                        ></ListItemLayout>
                      </StyledListItem>
                    </div>
                  );
                }}
              </DraggableList>
              <Space heigth="50px" />
            </Box>
          </Box>
        </Box>
      </LeftSideContainer>
      {menuAnchor}
    </>
  );
}
export default () => {
  const {
    setSelect,
    setModal,
    groupPermissionList,
    groupPermissionDefaultList,
  } = useContext(GroupPermissionSettingsCotnext);
  return (
    <Left
      groupPermissionList={groupPermissionList}
      groupPermissionDefaultList={groupPermissionDefaultList}
      {...{ setSelect, setModal }}
    />
  );
};
