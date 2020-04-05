import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  mdiAccountKey,
  mdiAccountMultipleCheck,
  mdiKey,
  mdiTrashCanOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { CustomTableProvider } from "components/CustomTable";
import LoadingBox from "components/LoadingBox";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import colors from "helpers/colorPalette";
import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StyledTableBodyCell } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { LayoutStateLess } from "views/JobPage/Layout";
import {
  createMapPropsFromAttrs,
  loginlineParams,
  template,
} from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { GroupPermissionSettingsCotnext } from "..";
import { groupPermissionAttr } from "../contants";
import { settingGroupPermission } from "../redux";
const Right = () => {
  const groupPermissionList = useSelector(
    settingGroupPermission.selectors.groupPermissionListSelector
  );
  const {
    select = groupPermissionList[0] || {
      permissions: emptyArray,
    },
    setSelect,
  } = useContext(GroupPermissionSettingsCotnext);
  const [id, name, permissions] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
  ])(select);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(
        settingGroupPermission.actions.loadDetailGroupPermission({
          group_permission_id: id,
        })
      );
    }
  }, [dispatch, id]);
  const permissionsNumber = permissions.length;
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item container direction="column" style={{ flex: 1 }}>
        <Grid
          className="comp_CustomTable___header"
          item
          container
          style={{ height: 70 }}
        >
          <ListItemLayout
            title={name}
            subTitle={template(t("Có <%= number %> quyền đã được chọn"))({
              number: permissionsNumber,
            })}
            actions={
              <AddButton onClick={loginlineParams} label={t("Thêm quyền")} />
            }
          ></ListItemLayout>
        </Grid>
        <Grid item container style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Scrollbars>
              <div style={{ paddingRight: "12px" }}>
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
                    {// new Array(60)
                    //   .fill({
                    //     name: "Chỉnh sửa nhóm việc",
                    //     description: "Cập nhật thông tin nhóm việc",
                    //   })
                    permissions.map(({ name, description }, i) => (
                      <TableRow
                        key={i}
                        className="comp_RecentTableRow table-body-row"
                      >
                        <StyledTableBodyCell
                          className="comp_AvatarCell"
                          align="left"
                        >
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
                        <StyledTableBodyCell
                          className="comp_TitleCell"
                          align="left"
                        >
                          <Typography
                            noWrap
                            style={{ padding: "10px 10px 10px 0" }}
                            className="comp_TitleCell__inner text-bold"
                          >
                            <b>{name + " " + i}</b>
                          </Typography>
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          className="comp_TitleCell"
                          align="left"
                        >
                          <Typography noWrap className="comp_TitleCell__inner">
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
                            <Icon
                              color="#8d8d8d"
                              style={{ width: "18px" }}
                              path={mdiTrashCanOutline}
                            ></Icon>
                          </div>
                        </StyledTableBodyCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Space height={"50px"}></Space>
              </div>
            </Scrollbars>
          </div>
        </Grid>
      </Grid>
      <div
        style={{
          width: "1px",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      ></div>
      <Grid item container direction="column" style={{ width: 300 }}>
        <Grid
          className="comp_CustomTable___header"
          item
          container
          style={{ height: 70 }}
        >
          <ListItemLayout
            title={t("Sử dụng nhóm quyền")}
            subTitle={t("Phân phối nhóm quyền cho module và thành viên")}
          ></ListItemLayout>
        </Grid>
        <Grid item container style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Scrollbars>
              <div
                style={{
                  padding: "20px 27px 50px 20px",
                }}
              >
                <Stack>
                  <FormControl
                    className="comp_QuickViewFilter__formControl"
                    component="fieldset"
                  >
                    <legend>
                      <Box className="comp_QuickViewFilter__title">
                        {t("Gán quyền cho module")}
                      </Box>
                    </legend>
                    <FormGroup className="comp_QuickViewFilter__FormGroup">
                      {[
                        "Quản lý nhóm",
                        "Quản lý thành viên",
                        "Phân quyền dự án",
                        "Phân quyền công việc",
                      ].map((key) => (
                        <FormControlLabel
                          className="comp_QuickViewFilter__FormControlLabel"
                          key={key}
                          control={<Checkbox color="primary" name={key} />}
                          label={key}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
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
                </Stack>
              </div>
            </Scrollbars>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ({ ...props }) => {
  const [quickTask, setQuickTask] = useState();
  const { t } = useTranslation();
  const bgColor = useSelector(bgColorSelector);
  const open = !!quickTask;

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
          Chủ sở hữu
        </Box>
      </Box>
    ),
    subActions: [],
    mainAction: {
      color: colors.red[0],
      label: t("Xóa nhóm quyền"),
      onClick: loginlineParams,
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
