import { Box, Typography } from "@material-ui/core";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import SortListColumn from "./SortListColumn";
import { useStyles } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import BasicSwitch from "./BasicSwitch";

const ManageTableData = forwardRef(({ onFilter = () => {} }, ref) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={classNames(classes.drawerWrapper, { isCollapsed: isOpen })}>
      <div className={classes.drawerHeader}>
        <Typography
          variant="h3"
          component="h3"
          style={{ fontSize: 20, fontWeight: 500 }}
        >
          {t("Menu")}
        </Typography>
        <Icon
          path={mdiClose}
          size={1}
          style={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        />
      </div>

      <div className={classes.wrapperManageData}>
        <div className={classes.wrapperHeader}>
          <Typography
            variant="h5"
            component="h5"
            style={{
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Danh sách cột
          </Typography>

          <div className={classes.addButton}>
            <AddIcon />
            Thêm cột
          </div>
        </div>
        <SortListColumn />
        <div className={classes.wrapperOption}>
          <p>Hiện dữ liệu tổng hợp của nhóm việc</p>
          <BasicSwitch defaultChecked />
        </div>
        <div className={classes.wrapperOption}>
          <p>Hiện dữ liệu tổng hợp của bảng việc</p>
          <BasicSwitch defaultChecked />
        </div>
      </div>
    </Box>
  );
});

export default ManageTableData;
