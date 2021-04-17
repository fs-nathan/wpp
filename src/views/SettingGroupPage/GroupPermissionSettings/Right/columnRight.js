import {Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from "@material-ui/core";
import {mdiAccountKey, mdiKey} from "@mdi/js";
import Icon from "@mdi/react";
import {CustomTableProvider} from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import {bgColorSelector} from "components/LoadingOverlay/selectors";
import React, {useCallback, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StyledTableBodyCell} from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import {emptyArray} from "views/JobPage/contants/defaultValue";
import {LayoutStateLess} from "views/JobPage/Layout";
import {template} from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import {Space} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import {GroupPermissionSettingsContext} from "..";
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
              <Space height={"50px"} />
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
            <TableCell width="20px" />
            <TableCell className="aaa" width="180px" align="left">
              {t("Tên quyền")}
            </TableCell>
            <TableCell align="left">{t("Mô tả")}</TableCell>
            <TableCell width="20px" align="right" />
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
        <Icon size={1.4} {...{ color: "#8d8d8d", path: mdiAccountKey }} />
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
      onDragEnd: () => { },
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
          <ColumnRight />
        </LayoutStateLess>
      </>
    </CustomTableProvider>
  );
};
