import ModalCommon from "../../../DocumentPage/TablePart/DocumentComponent/ModalCommon";
import React, {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {DialogContent} from "../../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import VerticleList from "../../../JobPage/components/VerticleList";
import {Avatar, Box, ListItem, ListItemAvatar, ListItemText, Radio} from "@material-ui/core";
import {RoundSearchBox} from "./SearchBox";
import "./UpdateUserPermission.scss";
import Chip from "@material-ui/core/Chip";
import {get, size, isNil} from "lodash";
import {GroupPermissionSettingsContext} from "../index";
import {StyledList, StyledListItem} from "../../../../components/CustomList";
import {createMapPropsFromAttrs, template} from "../../../JobPage/utils";
import {groupPermissionAttr} from "../contants";
import Icon from "@mdi/react";
import {mdiAccountKey, mdiDragVertical, mdiLockOutline} from "@mdi/js";
import ListItemLayout from "../../TablePart/SettingGroupRight/Home/components/ListItemLayout";
import useAsyncTracker from "../../TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import {settingGroupPermission} from "../redux";
import {apiCallStatus} from "../../TablePart/SettingGroupRight/Home/redux/apiCall/types";
import {SNACKBAR_VARIANT, SnackbarEmitter} from "../../../../constants/snackbarController";

function UpdateUserPermissionModal({onClose, user, onSuccess}) {
  const {t} = useTranslation();
  const [filterOption, setFilterOption] = React.useState(0);
  const {groupPermissionDefaultList, groupPermissionList} = useContext(GroupPermissionSettingsContext);
  const [keyword, setKeyword] = useState("");
  const [filterList, setFilterList] = React.useState([]);
  const [selected, setSelected] = React.useState(get(user, "group_permission_id"));
  const [loading, setLoading] = React.useState(false);
  const [{ status, data }, setAsyncAction] = useAsyncTracker();

  function handleFilterKeyWord(value) {
    setFilterOption(1);
    setKeyword(value);
  }

  React.useEffect(() => {
    const _filtered = groupPermissionList.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterList(_filtered);
  }, [keyword]);

  const handleSubmit = () =>
    setAsyncAction(
      settingGroupPermission.actions.doUpdateGroupPermissionUSer({
        group_permission_id: selected,
        member_id: user.id
      })
    );

  useEffect(() => {
    if (status === apiCallStatus.success && data.state) {
      setLoading(false);
      onSuccess();
      onClose();
    } else {
      if(!isNil(get(data, "msg"))) {
        SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(data, "msg"));
      }
      setLoading(false);
    }
  }, [onClose, status]);

  return (
    <ModalCommon
      loading={loading}
      title={t("LABEL_CHANGE_GROUP_PERMISSION")}
      onClose={onClose}
      footerAction={[
        {
          action: () => {
            setLoading(true);
            handleSubmit();
          },
          disabled: loading,
          name: t("Hoàn thành"),
        },
      ]}
    >
      <DialogContent dividers className="comp_SetPermissionUsersModal_content">
        <Scrollbars autoHide autoHeight autoHeightMin={450}>
          <Box padding={"16px"}>
            <VerticleList>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.avatar}/>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={
                  <Box className={"comp_SetPermissionUsersModal_content_groupPermission"}>
                    <Icon
                      className="onHover__hide"
                      style={{ fill: "#8d8d8d" }} path={mdiAccountKey} size={1}
                    />
                    <span style={{marginLeft: "7px"}}>{user.group_permission_name}</span>
                  </Box>
                }/>
              </ListItem>
              <RoundSearchBox
                onChange={(e) => handleFilterKeyWord(e.target.value)}
                placeholder={t("Tìm nhóm quyền")}
              />
            </VerticleList>
            <div className={"comp_SetPermissionUsersModal_content__filterBar"}>
              <Chip
                label={t("LABEL_GROUP_PERMISSION_DEFAULT_COUNT", {count: size(groupPermissionDefaultList)})} clickable
                color={filterOption === 0 ? "primary" : "default"}
                onClick={() => setFilterOption(0)}
              />
              <Chip
                label={t("LABEL_GROUP_PERMISSION_EXTEND_COUNT", {count: size(groupPermissionList)})} clickable
                color={filterOption === 1 ? "primary" : "default"}
                onClick={() => setFilterOption(1)}
              />
            </div>
            {filterOption === 0 && (
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
                    <StyledListItem key={id} onClick={() =>  setSelected(id)}>
                      <Radio value={id} checked={selected === id} onChange={() => setSelected(id)}/>
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
                          <Icon
                            path={mdiLockOutline}
                            size={1}
                            color="#8d8d8d"
                          />
                        }
                      />
                    </StyledListItem>
                  );
                })}
              </StyledList>
            )}
            {filterOption === 1 && (
              <StyledList>
                {filterList.map((item) => {
                  const [id, name, total_of_member_assigned] = createMapPropsFromAttrs([
                    groupPermissionAttr.id,
                    groupPermissionAttr.name,
                    groupPermissionAttr.total_of_member_assigned,
                    groupPermissionAttr.can_modify,
                  ])(item);
                  return (
                    <StyledListItem key={id} onClick={() =>  setSelected(id)}>
                      <Radio value={id} checked={selected === id} onChange={() => setSelected(id)}/>
                      <div style={{ flexShrink: 0, lineHeight: 1 }}>
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
                      />
                    </StyledListItem>
                  );
                })}
              </StyledList>
            )}
          </Box>
        </Scrollbars>
      </DialogContent>
    </ModalCommon>
  );
}

export default UpdateUserPermissionModal;