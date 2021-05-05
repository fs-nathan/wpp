import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {mdiAccountKey, mdiDotsVertical, mdiDragVertical, mdiFilterOutline, mdiKey, mdiLockOutline} from "@mdi/js";
import Icon from "@mdi/react";
import {CustomTableProvider} from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import {bgColorSelector} from "components/LoadingOverlay/selectors";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {emptyArray} from "views/JobPage/contants/defaultValue";
import {LayoutStateLess} from "views/JobPage/Layout";
import {createMapPropsFromAttrs, loginlineParams, template} from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import {Space} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import {GroupPermissionSettingsContext} from "..";
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import TasksScrollbar from "../components/TasksScrollbar";
import "./index.scss";
import SearchBox from "../../../../components/SearchInput";
import AddGroupPermissionModal, {CustomTableBodyCell} from "../components/AddGroupPermissionModal";
import Chip from '@material-ui/core/Chip';
import {filter, find, first, forEach, get, includes, isNil, map, size} from "lodash";
import {StyledList, StyledListItem} from "../../../../components/CustomList";
import {groupPermissionAttr} from "../contants";
import IconButton from "@material-ui/core/IconButton";
import UpdateInfoGroupPermissionModal from "../components/UpdateInfoGroupPermissionModal";
import {ItemMenu} from "../components/ItemMenu";
import {DraggableList} from "../../TablePart/SettingGroupRight/Home/components/DraggableList";
import {RoundSearchBox} from "../components/SearchBox";
import {settingGroupPermission} from "../redux";
import useAsyncTracker from "../../TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Button from "@material-ui/core/Button";
import UpdateUserPermissionModal from "../components/UpdateUserPermission";
import {SNACKBAR_VARIANT, SnackbarEmitter} from "../../../../constants/snackbarController";

const GroupSettingMenu = ({ menuAnchor, item, numberMemberAssigned = 0, setMenuAnchor }) => {
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
        console.log(numberMemberAssigned);
        if(numberMemberAssigned > 0) {
          SnackbarEmitter(SNACKBAR_VARIANT.ERROR, t("MESSAGE_DELETE_GROUP_PERMISSION_ERROR"));
        } else setModal(<DeleteGroupPermissionModal item={item} />);
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
    />
  );
};

const ColumnLayout = ({ children, title, subTitle, actions, ...props }) => {
  return (
    <Grid
      className="comp_ColumnLayout"
      item
      container
      direction="column"
      {...props}
    >
      <Grid className="comp_CustomTable___header" item container>
        <ListItemLayout
          title={title}
          subTitle={subTitle}
          actions={actions}
        />
      </Grid>
      <Grid item container style={{ flex: 1, position: "relative" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <TasksScrollbar>
            <div>
              {children}
              <Space height={"50px"}/>
            </div>
          </TasksScrollbar>
        </div>
      </Grid>
    </Grid>
  );
};
const ColumnRight = ({customPermissionList = [], filterOption = 0}) => {
  const { t } = useTranslation();
  const {
    detail: item,
    permissionsNumber,
    permissions = emptyArray,
    can_modify, mode
  } = useContext(GroupPermissionSettingsContext);

  const permissionList = useSelector(settingGroupPermission.selectors.permissionListSelector);
  const allPermissions = permissionList.flatMap((item) =>
    (item.permissions || emptyArray).flatMap((item) => item.permission)
  );
  const dispatch = useDispatch();
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selected, setSelected] = useState({});
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const [filterValue, setFilterValue] = useState(0);
  const [filterPermission, setFilterPermission] = React.useState(permissionList);
  const [filterPermissionKeyword, setFilterPermissionKeyword] = React.useState(filterPermission);

  const [keyword, setKeyword] = useState("");
  const onInputChange = useCallback((e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]);
  useEffect(() => {
    if(size(permissionList) === 0) {
      dispatch(settingGroupPermission.actions.loadPermissionList());
    }
  }, [dispatch, permissionList]);

  useEffect(() => {
    const _selected = {};
    forEach(permissions, function (item) {
      _selected[item.permission] = true;
    });
    setSelected(_selected);
  }, [permissions]);

  useEffect(() => {
    if(size(selected) === size(allPermissions)) {
      setIsSelectAll(true);
    } setIsSelectAll(false);
  },[allPermissions, selected]);

  function handleSelectPermission(permission) {
    let _selected = selected;
    _selected[permission] = !_selected[permission];
    setSelected({..._selected});
    let dataIDs = [];
    forEach(_selected, function (isSelected, key) {
      if(isSelected && !isNil(key)) dataIDs.push(key);
    });
    handleSubmit(dataIDs);
  }

  const handleSubmit = (values) =>
    setAsyncAction(
      settingGroupPermission.actions.updateGroupPermission({
        group_permission_id: get(item, groupPermissionAttr.id),
        permissions: values
      })
  );

  function handleSelectAll() {
    setIsSelectAll(true);
    handleSubmit(allPermissions);
  }

  useEffect(() => {
    if(filterValue === 0) {
      if(filterOption === 0) {
        const defaultPermissions = get(item,"permissions", []);
        const _permissions = [];
        forEach(permissionList, function (group) {
          const permissions = filter(group.permissions, function (permission) {
            return !isNil(find(defaultPermissions, {"permission": permission.permission}));
          });
          if(size(permissions) > 0) _permissions.push({...group, permissions});
        });
        setFilterPermission(_permissions);
      } else setFilterPermission(mode === "MEMBERS_PERMISSION" ? customPermissionList : permissionList);
    }
    else {
      const _selectedIds = Object.keys(selected);
      const _selected = [];
      forEach(permissionList, function (group) {
        const permissions = filter(group.permissions, function (permission) {
          if(filterValue === 1) {
            return includes(_selectedIds, permission.permission);
          }
          return !includes(_selectedIds, permission.permission);
        });
        if(size(permissions) > 0) return _selected.push({...group, permissions});
      });
      setFilterPermission(_selected);
    }
  }, [filterValue, permissionList, customPermissionList, selected, filterOption]);

  useEffect(() => {
    const _permission = map(filterPermission, function (group) {
      const permissions = filter(group.permissions, function (permission) {
        return permission.name.toLowerCase().includes(keyword.toLowerCase());
      });
      if(size(permissions) > 0) return {...group, permissions};
    });
    setFilterPermissionKeyword(_permission);
  }, [keyword, filterPermission]);

  return (
    <ColumnLayout
      title={t("Chi tiết quyền trong nhóm")}
      subTitle={template(t("Có <%= number %> quyền đã được chọn"))({
        number: permissionsNumber,
      })}
      actions={
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          {can_modify && mode === "GROUP_PERMISSION" && (
            <Box marginTop={"2px"} marginBottom={"7px"} display={"flex"} alignItems={"center"}>
              <Icon path={mdiFilterOutline} size={1} color={"rgba(0,0,0,0.54)"}/>
              <span style={{marginLeft: "5px"}}>{t("LABEL_PERMISSION_FILTER")}:</span>
              <Box className={"comp_rightColumn--customSelectBox"}>
                <Select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                >
                  <MenuItem value={0}>{t("IDS_WP_ALL")}</MenuItem>
                  <MenuItem value={1}>{t("LABEL_SELECTED_PERMISSION")}</MenuItem>
                  <MenuItem value={2}>{t("LABEL_UNSELECTED_PERMISSION")}</MenuItem>
                </Select>
              </Box>
            </Box>
          )}
        </Box>
      }
    >
      <Box padding={"20px"}>
        <Box marginBottom={"10px"}>
          <RoundSearchBox
            onChange={onInputChange}
            placeholder={t("Tìm kiếm quyền")}
          />
        </Box>
        <Table stickyHeader className="header-document">
          <TableHead>
            <TableRow>
              {can_modify && mode === "GROUP_PERMISSION" && (
                <TableCell style={{ padding: "0px" }} width="20px">
                  <Checkbox
                    checked={isSelectAll}
                    onChange={() => handleSelectAll()}
                    color="primary"
                  />
                </TableCell>
              )}
              <TableCell style={{ padding: "0px" }} width="20px"/>
              <TableCell width="30%" align="left">
                {t("Tên quyền")}
              </TableCell>
              <TableCell align="left">{t("Mô tả")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterPermissionKeyword.map((group, i) => {
              if(size(get(group, "permissions", [])) === 0) return;
              return (
                <React.Fragment key={i}>
                  <TableRow>
                    <CustomTableBodyCell
                      style={{ padding: "0px" }}
                      align="left"
                    />
                    <CustomTableBodyCell
                      colSpan={12}
                      className="comp_TitleCell"
                      align="left"
                    >
                      <Typography fontWeight="bold">
                        <b>{get(group, "name")}</b>
                      </Typography>
                    </CustomTableBodyCell>
                  </TableRow>
                  {get(group, "permissions", [])
                    .map(({ name, description, permission }) => (
                      <TableRow
                        key={permission}
                        className="comp_RecentTableRow table-body-row"
                      >
                        {can_modify && mode === "GROUP_PERMISSION" && (
                          <CustomTableBodyCell
                            style={{ padding: "0px" }}
                            align="left"
                          >
                            <Checkbox
                              checked={!!selected[permission] || isSelectAll}
                              onChange={() => handleSelectPermission(permission)}
                              color="primary"
                            />
                          </CustomTableBodyCell>
                        )}
                        <CustomTableBodyCell align="left">
                          <Icon
                            color="#8d8d8d"
                            style={{ width: "18px" }}
                            path={mdiKey}
                          />
                        </CustomTableBodyCell>
                        <CustomTableBodyCell align="left">
                          <Typography title={name}>
                            {name}
                          </Typography>
                        </CustomTableBodyCell>
                        <CustomTableBodyCell align="left">
                          <Typography>{description}</Typography>
                        </CustomTableBodyCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <CustomTableBodyCell
                      colSpan={12}
                      style={{ padding: "5px 0px" }}
                      align="left"
                    >
                      <Divider />
                    </CustomTableBodyCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </ColumnLayout>
  );
};
const ColumnLeft = ({filterOption, setFilterOption}) => {
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const {
    select, groupPermissionDefaultList,
    setModal, setSelect, groupPermissionList
  } = useContext(GroupPermissionSettingsContext);
  function handleFilterKeyWord(value) {
    setFilterOption(1);
    setKeyword(value);
  }
  useEffect(() => {
    if(filterOption === 0) {
      const firstItem = first(groupPermissionDefaultList);
      setSelect(firstItem, true);
    } else {
      const firstItem = first(groupPermissionList);
      setSelect(firstItem, false);
      handlePermissionGroupClick(firstItem.id);
    }
  }, [filterOption]);
  function handlePermissionGroupClick(id) {
    dispatch(settingGroupPermission.actions.loadDetailGroupPermission({group_permission_id: id}));
  }
  return (
    <div className="comp_rightColumn">
      <div className={"comp_rightColumn_topBar"}>
        <SearchBox
          fullWidth
          placeholder={t("Tìm nhóm quyền")}
          onChange={(e) => handleFilterKeyWord(e.target.value)}
        />
        <AddButton
          onClick={() => {
            setModal(<AddGroupPermissionModal />);
          }}
          label={t("Thêm nhóm")}
        />
      </div>
      <div className={"comp_rightColumn_filterBar"}>
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
      <div style={{padding: "10px"}}>
        <Alert severity="info">
          {filterOption === 0 ? t("LABEL_GROUP_PERMISSION_WARNING_1") : t("LABEL_GROUP_PERMISSION_WARNING_2")}
        </Alert>
      </div>
      <TasksScrollbar autoHeight autoHeightMax={"calc(100vh - 375px)"}>
        <div className="comp_rightColumn_content">
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
                      style={{maxWidth: "100%"}}
                      subTitle={template(
                        t("Đã gán <%= number %> thành viên")
                      )({
                        number: total_of_member_assigned,
                      })}
                      actions={
                        <IconButton
                          title={t("Không sửa, xóa")}
                          onClick={(e) => null}
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
                      }
                    />
                  </StyledListItem>
                );
              })}
            </StyledList>
          )}
          {filterOption === 1 && (
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
                        setSelect(item, false);
                        handlePermissionGroupClick(item.id);
                      }}
                    >
                      <div style={{ flexShrink: 0, lineHeight: 1 }}>
                        <Icon
                          style={{ fill: "#8d8d8d" }}
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
                                  numberMemberAssigned={total_of_member_assigned}
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
                      />
                    </StyledListItem>
                  </div>
                );
              }}
            </DraggableList>
          )}
        </div>
      </TasksScrollbar>
      {menuAnchor}
    </div>
  );
};

const ColumnLeftMembers = ({setCustomPermissionList, setFilterOption, openModal, setOpenModal}) => {
  const {t} = useTranslation();
  const [filterKeyword, setFilterKeyword] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState({});
  const [filteredGroup, setFilteredGroup] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const dispatch = useDispatch();
  const groupUsers = useSelector(settingGroupPermission.selectors.groupPermissionUsersSelector);
  const detail = useSelector(settingGroupPermission.selectors.groupPermissionListSelector);
  const permissionList = useSelector(settingGroupPermission.selectors.permissionListSelector);
  const { setSelect } = useContext(GroupPermissionSettingsContext);
  React.useEffect(() => {
    dispatch(settingGroupPermission.actions.doPermissionListUsers());
  }, [dispatch]);

  React.useEffect(() => {
    forEach(groupUsers, function (group) {
      if(size(get(group, "users")) > 0) {
       setSelectedGroup(get(first(group.users), "group_permission_id"));
       handleSelectUser(first(group.users));
       return;
      }
    });
  }, [groupUsers, dispatch]);

  React.useEffect(() => {
    const _group = map(groupUsers, function (group) {
      return {...group, users: filter(group.users, function (user) {
          return user.name.toLowerCase().includes(filterKeyword.toLowerCase());
        })}
    });
    setFilteredGroup(_group);
  }, [filterKeyword, groupUsers]);

  function handleSelectUser(user) {
    setSelectedUser(user);
    if(user.group_permission_id) {
      setSelectedGroup(user.group_permission_id);
      dispatch(
        settingGroupPermission.actions.loadDetailGroupPermission({
          group_permission_id: user.group_permission_id,
        })
      );
    } else {
      setCustomPermissionList([]);
      setFilterOption(1);
    }
  }
  useEffect(() => {
    let permissions = find(detail, {"id": selectedGroup});
    if(size(permissions) > 0) {
      setSelect(permissions, false);
      const _filterPermissions = [];
        forEach(permissionList, function (group) {
        const _permissions = filter(group.permissions, function (permission) {
          return !isNil(find(permissions.permissions, {"value": permission.permission}));
        });
        if(size(_permissions) > 0) {
          _filterPermissions.push({...group, permissions: _permissions});
        }
      });
      setCustomPermissionList(_filterPermissions);
    }
  }, [detail, permissionList, selectedGroup]);

  return (
    <div className="comp_rightColumn">
      <div className={"comp_rightColumn_topBar"} style={{border: "none"}}>
        <SearchBox
          fullWidth
          placeholder={t("LABEL_CHAT_TASK_TIM_THANH_VIEN")}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      </div>
      <TasksScrollbar autoHeight autoHeightMax={"calc(100vh - 185px)"}>
        <div className="comp_rightColumn_content_memberList">
          {filteredGroup.map(function (group, i) {
            return (
              <List
                component={"nav"}
                subheader={
                  <ListSubheader component={"div"} disableSticky>
                    <b style={{ fontSize: "15px", color: "#8d8d8d", textTransform: "uppercase"}}>
                      {group.name} ({group.number_member})
                    </b>
                  </ListSubheader>
                }
              >
                {group.users.map((user) => {
                  return (
                    <ListItem
                      key={user.id}
                      onClick={() => handleSelectUser(user)}
                      className={
                        selectedUser.id === user.id ? "active" : ""
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={user.avatar}/>
                      </ListItemAvatar>
                      <ListItemText primary={user.name} secondary={
                        <Box display={"flex"} alignItems={"center"}>
                          <Icon
                            className="onHover__hide"
                            style={{ fill: "#8d8d8d" }} path={mdiAccountKey} size={1}
                          />
                          <span style={{marginLeft: "7px"}}>{user.group_permission_name ?? <span style={{fontStyle: "italic"}}>{t("LABEL_PERMISSION_NOT_ASSIGN")}</span>}</span>
                        </Box>
                      }/>
                      <ListItemSecondaryAction>
                        <Button
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenModal(true);
                          }}
                          disableElevation color={"primary"} variant={"contained"} size={"small"}
                        >
                          {t("LABEL_CHANGE_PERMISSION")}
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )
          })}
        </div>
      </TasksScrollbar>
      {openModal && (
        <UpdateUserPermissionModal
          user={selectedUser} onClose={() => setOpenModal(false)}
          onSuccess={() => dispatch(settingGroupPermission.actions.doPermissionListUsers())}
        />
      )}
    </div>
  );
}

const Right = ({mode}) => {
  const [customPermissionList, setCustomPermissionList] = React.useState([]);
  const [filterOption, setFilterOption] = React.useState(0);
  const {t} = useTranslation();
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <Grid container>
      {mode === "GROUP_PERMISSION" && (
        <ColumnLeft filterOption={filterOption} setFilterOption={setFilterOption}/>
      )}
      {mode === "MEMBERS_PERMISSION" && (
        <ColumnLeftMembers
          setCustomPermissionList={setCustomPermissionList} setFilterOption={setFilterOption}
          openModal={openModal} setOpenModal={setOpenModal}
        />
      )}
      <div
        style={{
          width: "1px",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      />
      {(mode === "MEMBERS_PERMISSION" && size(customPermissionList) === 0) ? (
        <div className={"comp_rightColumn_content__empty"}>
          <p>{t("LABEL_GROUP_PERMISSION_EMPTY_TITLE")}</p>
          <p>{t("LABEL_GROUP_PERMISSION_EMPTY_DES")}</p>
          <Button
            onClick={() => setOpenModal(true)}
            disableElevation color={"primary"} variant={"contained"} size={"small"}
          >
            {t("LABEL_CHAT_TASK_PHAN_QUYEN")}
          </Button>
        </div>
      ) :
        <ColumnRight customPermissionList={customPermissionList} filterOption={filterOption}/>}
    </Grid>
  );
};
export default ({ ...props }) => {
  const { t } = useTranslation();
  const { setModal, name, can_modify, mode, detail } = useContext(
    GroupPermissionSettingsContext
  );
  const [quickTask, setQuickTask] = useState();
  const bgColor = useSelector(bgColorSelector);
  const open = !!quickTask;
  const options = {
    title: (
      <Box className={"comp_rightColumn--topHeader"}>
        <Box className={"comp_rightColumn--topHeader-left"}>
          <Typography variant={"h6"}>{
            mode === "GROUP_PERMISSION" ? t("LABEL_SETTING_GROUP_PERMISSION") : t("IDS_WP_MEMBER")
          }</Typography>
        </Box>
        <Box className={"comp_rightColumn--topHeader-right"}>
          <Icon size={1.4} {...{ color: "#8d8d8d", path: mdiAccountKey }}/>
          <Box
            {...{
              paddingLeft: "20px",
              fontSize: "21px",
              lineHeight: "1",
              fontWeight: "600",
            }}
          >
            {name}
          </Box>
        </Box>
      </Box>
    ),
    subActions: [],
    mainAction: can_modify && mode === "GROUP_PERMISSION"
      ? {
          color: "red",
          label: t("Xóa nhóm quyền"),
          onClick: () => setModal(<DeleteGroupPermissionModal item={detail} />),
        }
      : undefined,
    draggable: {
      bool: true,
      onDragEnd: () => {},
    },
    loading: {
      bool: false,
      component: () => <LoadingBox />,
    },
    row: {
      id: "id",
    },
  };
  return (
    <CustomTableProvider
      value={{
        options: options,
        bgColor,
      }}
    >
      <>
        <LayoutStateLess
          {...{
            open,
            quickTask,
            options,
            setQuickTask,
            ...props,
          }}
        >
          <Right setModal={setModal} mode={mode}/>
        </LayoutStateLess>
      </>
    </CustomTableProvider>
  );
};
