import {
  Avatar,
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { mdiAccountKey, mdiKey } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomTableProvider } from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyledTableBodyCell } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { LayoutStateLess } from "views/JobPage/Layout";
import { template } from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { GroupPermissionSettingsContext } from "..";
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import TasksScrollbar from "../components/TasksScrollbar";
import UpdateGroupPermissionModal from "../components/UpdateGroupPermissionModal";
import "./index.css";
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
const ColumnLeft = () => {
  const { t } = useTranslation();
  const {
    setModal,
    detail: item,
    permissionsNumber,
    permissions = emptyArray,
    can_modify,
  } = useContext(GroupPermissionSettingsContext);
  // if (!item) return null;
  return (
    <ColumnLayout
      title={t("Chi tiết quyền trong nhóm")}
      subTitle={template(t("Có <%= number %> quyền đã được chọn"))({
        number: permissionsNumber,
      })}
      actions={
        can_modify && (
          <AddButton
            disabled={!can_modify}
            onClick={() => setModal(<UpdateGroupPermissionModal item={item} />)}
            label={t("Thêm quyền")}
          />
        )
      }
    >
      <Table stickyHeader className="header-document">
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
      </Table>
    </ColumnLayout>
  );
};
const ColumnRight = () => {
  const { t } = useTranslation();
  const {
    detail,
    permissionModules = emptyArray,
    members_assigned = emptyArray,
    module: groupModule,
  } = useContext(GroupPermissionSettingsContext);
  return (
    <div className="comp_rightColumn">
      <TasksScrollbar>
        <div className="comp_rightColumn_content">
          <Stack>
            <b className="comp_QuickViewFilter__title">
              {t("Module được gán nhóm quyền")}
            </b>
            <Box>
              {permissionModules
                .filter(({ value }) => "" + groupModule === "" + value)
                .map(({ name, value }) => (
                  <Box fontSize="15px" key={value}>
                    {t(name)}
                  </Box>
                ))}
            </Box>
            <Alert severity="info">
              <div>
                {t(
                  "Nhóm quyền này chỉ được gán cho các thành viên trong module thành viên"
                )}
              </div>
              <a
                target="_blank"
                className="u-colorBlue text-bold cursor-pointer"
                href={detail && detail.url_view_more}
              >
                <strong>{t("Tìm hiểu thêm")}</strong>
              </a>
            </Alert>
            <Divider />
            <ListItemLayout
              title={t("Thành viên được gán nhóm quyền")}
            />
            <Stack>
              {members_assigned.map(
                ({ name, members = emptyArray, icon } = {}, i) => (
                  <Stack key={i} small>
                    <b style={{ fontSize: "15px", color: "#8d8d8d" }}>
                      {name} ({members.length})
                    </b>
                    {members.map(({ avatar, id, name, position } = {}) => {
                      return (
                        <ListItemLayout
                          key={id}
                          left={<Avatar src={avatar}/>}
                          title={name}
                          subTitle={position}
                        />
                      );
                    })}
                  </Stack>
                )
              )}
            </Stack>
          </Stack>
        </div>
      </TasksScrollbar>
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
      <Box display="flex" alignItems="center">
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
          <Right />
        </LayoutStateLess>
      </>
    </CustomTableProvider>
  );
};
