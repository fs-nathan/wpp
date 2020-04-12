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
import { mdiAccountKey, mdiAccountMultipleCheck, mdiKey } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomTableProvider } from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import colors from "helpers/colorPalette";
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
import { GroupPermissionSettingsCotnext } from "..";
import DeleteGroupPermissionModal from "../components/DeleteGroupPermissionModal";
import TasksScrollbar from "../components/TasksScrollbar";
import UpdateGroupPermissionModal from "../components/UpdateGroupPermissionModal";

const ColumnLayout = ({ children, title, subTitle, actions, ...props }) => {
  return (
    <Grid item container direction="column" style={{ flex: 1 }} {...props}>
      <Grid
        className="comp_CustomTable___header"
        item
        container
        style={{ height: 70 }}
      >
        <ListItemLayout
          title={title}
          subTitle={subTitle}
          actions={actions}
        ></ListItemLayout>
      </Grid>
      <Grid item container style={{ flex: 1, position: "relative" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <TasksScrollbar>
            <div style={{ paddingRight: "10px" }}>
              {children}
              <Space height={"50px"}></Space>
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
  } = useContext(GroupPermissionSettingsCotnext);
  if (!item) return null;
  return (
    <ColumnLayout
      title={t("Chi tiết quyền trong nhóm")}
      subTitle={template(t("Có <%= number %> quyền đã được chọn"))({
        number: permissionsNumber,
      })}
      actions={
        <AddButton
          onClick={() => setModal(<UpdateGroupPermissionModal item={item} />)}
          label={t("Thêm quyền")}
        />
      }
    >
      <Table stickyHeader className="header-document">
        <TableHead>
          <TableRow>
            <TableCell width="20px"></TableCell>
            <TableCell width="300px" align="left">
              {t("Tên quyền")}
            </TableCell>
            <TableCell align="left">{t("Mô tả")}</TableCell>
            <TableCell width="20px" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map(({ name, description }, i) => (
            <TableRow key={i} className="comp_RecentTableRow table-body-row">
              <StyledTableBodyCell className="comp_AvatarCell" align="left">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    color="#8d8d8d"
                    style={{ width: "18px" }}
                    path={mdiKey}
                  ></Icon>
                </div>
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
                  title={{ description }}
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
                  {/* <Icon
                  color="#8d8d8d"
                  style={{ width: "18px" }}
                  path={mdiTrashCanOutline}
                ></Icon> */}
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
    permissionModules = emptyArray,
    members_assigned = emptyArray,
    module: groupModule,
  } = useContext(GroupPermissionSettingsCotnext);
  return (
    <ColumnLayout
      title={t("Sử dụng nhóm quyền")}
      subTitle={t("Phân phối nhóm quyền cho module và thành viên")}
      style={{ width: 300 }}
    >
      <div
        style={{
          padding: "20px 27px 50px 20px",
        }}
      >
        <Stack>
          <b className="comp_QuickViewFilter__title">
            {t("Gán nhóm quyền cho module")}
          </b>
          <Box>
            {permissionModules
              .filter(({ value }) => "" + groupModule === "" + value)
              .map(({ name, value }) => (
                <Box fontSize="15px" key={value}>
                  {name}
                </Box>
              ))}
          </Box>
          <Divider />
          <ListItemLayout
            title={t("Thành viên được gán")}
            subTitle={
              <>
                <Icon
                  color="#8d8d8d"
                  style={{ width: "1.4em", verticalAlign: "sub" }}
                  path={mdiAccountMultipleCheck}
                />{" "}
                {t("Phân phối nhóm quyền cho module và thành viên")}
              </>
            }
          ></ListItemLayout>
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
                        left={<Avatar src={avatar}></Avatar>}
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
    </ColumnLayout>
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
      ></div>
      <ColumnRight />
    </Grid>
  );
};
export default ({ ...props }) => {
  const { t } = useTranslation();
  const { setModal, name } = useContext(GroupPermissionSettingsCotnext);
  const [quickTask, setQuickTask] = useState();
  const bgColor = useSelector(bgColorSelector);
  const open = !!quickTask;
  const { detail } = useContext(GroupPermissionSettingsCotnext);
  const options = {
    title: (
      <Box display="flex" alignItems="center">
        <Icon size={1.4} {...{ color: "#8d8d8d", path: mdiAccountKey }}></Icon>
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
    mainAction: {
      color: colors.red[0],
      label: t("Xóa nhóm quyền"),
      onClick: () => setModal(<DeleteGroupPermissionModal item={detail} />),
    },
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
