import { Box, IconButton } from "@material-ui/core";
import {
  mdiAccountKey,
  mdiChevronLeft,
  mdiDotsVertical,
  mdiDragVertical,
  mdiLockOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import LoadingBox from "components/LoadingBox";
import SearchBox from "components/SearchInput";
import { Routes } from "constants/routes";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@material-ui/lab";
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
import { GroupPermissionSettingsContext } from "..";
import AddGroupPermissionModal from "../components/AddGroupPermissionModal";
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import { ItemMenu } from "../components/ItemMenu";
import UpdateInfoGroupPermissionModal from "../components/UpdateInfoGroupPermissionModal";
import { groupPermissionAttr } from "../contants";
import "./index.css";

const GroupSettingMenu = ({ menuAnchor, item, onClose, setMenuAnchor }) => {
  const { t } = useTranslation();
  const { setModal } = useContext(GroupPermissionSettingsContext);
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
  select,
  groupPermissionDefaultList,
  setModal,
}) {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = useCallback((e) => setKeyword(e.target.value), []);
  const history = useHistory();
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { detail } = useContext(GroupPermissionSettingsContext);
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
          <Alert severity="info">
              {
                detail && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail.description_detail ? detail.description_detail : detail.module_description ? detail.module_description : "",
                    }}
                  >
                  </div>
                )
              }
              <a
                target="_blank"
                className="u-colorBlue text-bold cursor-pointer"
                href={detail && detail.url_view_more}
              >
                <strong>{t("Tìm hiểu thêm")}</strong>
              </a>
            </Alert>

          <Box style={{ background: "#fff" }}>
            <Stack small>
              <div />
              <Box padding="0 1rem">
                <SearchBox
                  fullWidth
                  placeholder={t("Tìm nhóm quyền")}
                  onChange={handleInputChange}
                />
              </Box>
              <Box padding="0 1rem">
                <AddButton
                  onClick={() => {
                    setModal(<AddGroupPermissionModal />);
                  }}
                  label={t("Thêm nhóm")}
                />
              </Box>
            </Stack>
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
                      className={
                        select && item && select.id === item.id ? "active" : ""
                      }
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
                        <Icon
                          style={{ flexShrink: 0, fill: "#8d8d8d" }}
                          path={mdiAccountKey}
                          size={1}
                        />
                      </div>

                      <ListItemLayout
                        title={name}
                        subTitle={template(
                          t("Đã gán <%= number %> thành viên")
                        )({
                          number: total_of_member_assigned,
                        })}
                        actions={
                          can_modify ? (
                            <IconButton
                              title={t("thêm")}
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
                                color="#8d8d8d"
                              />
                            </IconButton>
                          ) : (
                            <IconButton
                              title={t("Không sửa, xóa")}
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
                                path={mdiLockOutline}
                                size={1}
                                color="#8d8d8d"
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
                        className={
                          select && item && select.id === item.id
                            ? "active onHover"
                            : "onHover"
                        }
                        onClick={() => {
                          setSelect(item);
                        }}
                      >
                        {bindDragHandle(
                          <div style={{ flexShrink: 0, lineHeight: 1 }}>
                            <Icon
                              className="onHover__show"
                              path={mdiDragVertical}
                              size={1}
                              color="#8d8d8d"
                            />
                            <Icon
                              className="onHover__hide"
                              style={{ fill: "#8d8d8d" }}
                              path={mdiAccountKey}
                              size={1}
                            />
                          </div>
                        )}

                        <ListItemLayout
                          title={name}
                          subTitle={template(
                            t("Đã gán <%= number %> thành viên")
                          )({
                            number: total_of_member_assigned,
                          })}
                          actions={
                            <IconButton
                              title={t("thêm")}
                              className="onHover__show"
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
    select,
    setSelect,
    setModal,
    groupPermissionList,
    groupPermissionDefaultList,
  } = useContext(GroupPermissionSettingsContext);
  return (
    <Left
      groupPermissionList={groupPermissionList}
      groupPermissionDefaultList={groupPermissionDefaultList}
      {...{ setSelect, setModal, select }}
    />
  );
};
