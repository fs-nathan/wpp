import {
  Box,
  Checkbox,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {mdiAccountKey, mdiDotsVertical, mdiDragVertical, mdiKey, mdiLockOutline, mdiFilterOutline, mdiMenuDown} from "@mdi/js";
import Icon from "@mdi/react";
import {CustomTableProvider} from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import {bgColorSelector} from "components/LoadingOverlay/selectors";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StyledTableBodyCell} from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import {emptyArray} from "views/JobPage/contants/defaultValue";
import {LayoutStateLess} from "views/JobPage/Layout";
import {createMapPropsFromAttrs, get, loginlineParams, template} from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import {Space} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import {GroupPermissionSettingsContext} from "..";
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import TasksScrollbar from "../components/TasksScrollbar";
import UpdateGroupPermissionModal from "../components/UpdateGroupPermissionModal";
import "./index.scss";
import SearchBox from "../../../../components/SearchInput";
import AddGroupPermissionModal, {CustomTableBodyCell} from "../components/AddGroupPermissionModal";
import Chip from '@material-ui/core/Chip';
import {size} from "lodash";
import {StyledList, StyledListItem} from "../../../../components/CustomList";
import {groupPermissionAttr} from "../contants";
import IconButton from "@material-ui/core/IconButton";
import UpdateInfoGroupPermissionModal from "../components/UpdateInfoGroupPermissionModal";
import {ItemMenu} from "../components/ItemMenu";
import {DraggableList} from "../../TablePart/SettingGroupRight/Home/components/DraggableList";
import {RoundSearchBox} from "../components/SearchBox";
import {useMultipleSelect} from "../../../JobPage/hooks/useMultipleSelect";

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
const ColumnRight = () => {
  const { t } = useTranslation();
  const {
    setModal,
    detail: item,
    permissionsNumber,
    permissions = emptyArray,
    can_modify,
  } = useContext(GroupPermissionSettingsContext);
  const allPremission = permissions.flatMap((item) =>
    (item.permissions || emptyArray).flatMap((item) => item.permission)
  );
  const [keyword, setKeyword] = useState("");
  const value = emptyArray;
  const [select, setSelect, __, selectAll] = useMultipleSelect(
    value.reduce(
      (result, key) => ({
        ...result,
        [key]: true,
      }),
      {}
    ),
    true,
    true
  );
  const onInputChange = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );
  return (
    <ColumnLayout
      title={t("Chi tiết quyền trong nhóm")}
      subTitle={template(t("Có <%= number %> quyền đã được chọn"))({
        number: permissionsNumber,
      })}
      actions={
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
          {can_modify && (
            <AddButton
              disabled={!can_modify}
              onClick={() => setModal(<UpdateGroupPermissionModal item={item} />)}
              label={t("Thêm quyền")}
            />
          )}
          <Box marginTop={"2px"} marginBottom={"7px"} display={"flex"} alignItems={"center"}>
            <Icon path={mdiFilterOutline} size={1} color={"rgba(0,0,0,0.54)"}/>
            <span style={{marginLeft: "5px"}}>{t("LABEL_PERMISSION_FILTER")}:</span>
            <Box className={"comp_rightColumn--customSelectBox"}>
              {t("IDS_WP_ALL")}
              <Icon path={mdiMenuDown} size={1} color={"rgba(0,0,0,0.54)"}/>
            </Box>
          </Box>
        </Box>
      }
    >
      <Box padding={"20px"}>
        <Box marginBottom={"10px"}>
          <RoundSearchBox
            onChange={() => null}
            placeholder={t("Tìm kiếm quyền")}
          />
        </Box>
        <Table stickyHeader className="header-document">
          <TableHead>
            <TableRow>
              <TableCell style={{ padding: "0px" }} width="20px">
                <Checkbox
                  checked={
                    !(
                      allPremission.findIndex((item) => !select[item]) >=
                      0
                    )
                  }
                  onChange={() => {
                    const isAll = !(
                      allPremission.findIndex((item) => !select[item]) >=
                      0
                    );
                    if (!isAll) {
                      selectAll(
                        allPremission.reduce((result, v) => {
                          result[v] = true;
                          return result;
                        }, {})
                      );
                    } else {
                      selectAll(
                        allPremission.reduce((result, v) => {
                          result[v] = false;
                          return result;
                        }, {})
                      );
                    }
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell width="30%" align="left">
                {t("Tên quyền")}
              </TableCell>
              <TableCell align="left">{t("Mô tả")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map(({ name, description }, i) => (
              <React.Fragment key={i}>
                <TableRow
                  key={name}
                  className="comp_RecentTableRow table-body-row"
                >
                  <CustomTableBodyCell
                    style={{ padding: "0px" }}
                    align="left"
                  >
                    <Checkbox
                      checked={!!select[name]}
                      onChange={() => setSelect(name)}
                      color="primary"
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
            ))}
          </TableBody>
        </Table>
        {/*<Table stickyHeader className="header-document">
          <TableHead>
            <TableRow>
              <TableCell width="20px"/>
              <TableCell width="300px" align="left">
                {t("Tên quyền")}
              </TableCell>
              <TableCell align="left">{t("Mô tả")}</TableCell>
              <TableCell width="20px" align="right"/>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map(({ name, description }, i) => (
              <TableRow
                key={i}
                className="comp_RecentTableRow comp_PermissionRow table-body-row "
              >
                <CustomTableBodyCell
                  style={{ padding: "0px" }}
                  align="left"
                >
                  <Checkbox
                    checked={false}
                    onChange={() => null}
                    color="primary"
                  />
                </CustomTableBodyCell>
                <StyledTableBodyCell
                  style={{ paddingLeft: "20px" }}
                  className="comp_AvatarCell"
                  align="left"
                >
                  <Icon
                    color="#8d8d8d"
                    style={{ width: "18px" }}
                    path={mdiKey}
                  />
                </StyledTableBodyCell>
                <StyledTableBodyCell className="comp_TitleCell" align="left">
                  <Typography
                    title={name}
                    noWrap
                    style={{
                      fontSize: "15px",
                      maxWidth: 300,
                      padding: "10px 10px 10px 0",
                    }}
                    className="comp_TitleCell__inner text-bold"
                  >
                    <b>{name}</b>
                  </Typography>
                </StyledTableBodyCell>
                <StyledTableBodyCell
                  style={{ maxWidth: 300 }}
                  className="comp_TitleCell"
                  align="left"
                >
                  <Typography
                    title={description}
                    className="comp_TitleCell__inner"
                  >
                    {description}
                  </Typography>
                </StyledTableBodyCell>
                <StyledTableBodyCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                  </div>
                </StyledTableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>*/}
      </Box>
    </ColumnLayout>
  );
};
const ColumnLeft = () => {
  const { t } = useTranslation();
  const [filterOption, setFilterOption] = React.useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [keyword, setKeyword] = useState("");
  const {
    select, groupPermissionDefaultList,
    setModal, setSelect, groupPermissionList
  } = useContext(GroupPermissionSettingsContext);
  function handleFilterKeyWord(value) {
    setFilterOption(1);
    setKeyword(value);
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
const Right = () => {
  return (
    <Grid container>
      <ColumnLeft />
      <div
        style={{
          width: "1px",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      />
      <ColumnRight />
    </Grid>
  );
};
export default ({ ...props }) => {
  const { t } = useTranslation();
  const { setModal, name, can_modify } = useContext(
    GroupPermissionSettingsContext
  );
  const [quickTask, setQuickTask] = useState();
  const bgColor = useSelector(bgColorSelector);
  const open = !!quickTask;
  const { detail } = useContext(GroupPermissionSettingsContext);
  const options = {
    title: (
      <Box className={"comp_rightColumn--topHeader"}>
        <Box className={"comp_rightColumn--topHeader-left"}>
          <Typography variant={"h6"}>{t("LABEL_SETTING_GROUP_PERMISSION")}</Typography>
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
    mainAction: can_modify
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
          <Right setModal={setModal}/>
        </LayoutStateLess>
      </>
    </CustomTableProvider>
  );
};
