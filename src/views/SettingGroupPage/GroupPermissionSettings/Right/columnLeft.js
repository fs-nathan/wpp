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
import React, { useContext, useState, useCallback } from "react";
import SearchBox from "components/SearchInput";
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
    detail,
    permissionModules = emptyArray,
    members_assigned = emptyArray,
    module: groupModule,
  } = useContext(GroupPermissionSettingsContext);
  console.log(detail)
  const [keyword, setKeyword] = useState("");
  const handleInputChange = useCallback((e) => setKeyword(e.target.value), []);
  return (
    <div className="comp_leftColumn">
      <TasksScrollbar>
        <div className="comp_leftColumn_content">
          <Stack>
            <Box padding="0 1rem">
                <SearchBox
                  fullWidth
                  placeholder={t("Tìm nhóm quyền")}
                  onChange={handleInputChange}
                />
              </Box>
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
        <Box
          {...{
            paddingLeft: "20px",
            fontSize: "21px",
            lineHeight: "1",
            fontWeight: "600",
          }}
        >
          <b className="comp_QuickViewFilter__title">
              {t("Thiết lập nhóm quyền")}
            </b>
        </Box>
      </Box>
      
    ),
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
        <LayoutStateLess
          {...{
            open,
            quickTask,
            options,
            setQuickTask,
            ...props,
          }}
        >
          <ColumnLeft />
        </LayoutStateLess>
    </CustomTableProvider>
  );
};
