import { Box, Typography } from "@material-ui/core";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import AddColumnModal from "components/WPReactTable/components/AddColumnModal";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SortListColumn, { AntSwitch } from "./SortListColumn";
import { useStyles } from "./styles";

const ManageTableData = forwardRef(
  (
    {
      onFilter = () => {},
      onAddColumns = () => {},
      onReOrderColumns = () => {},
    },
    ref
  ) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const refAdd = useRef(null);
    const refSortColumns = useRef(null);

    useImperativeHandle(ref, () => ({ _toggle: toggleDrawer }));

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };

    const _handleAddColumns = () => {
      refAdd.current._open("list");
    };

    const _handleAddSuccess = (dataColumn) => {
      onAddColumns(dataColumn);
      refSortColumns.current._addColumns(dataColumn);
    };

    return (
      <>
        <Box
          className={classNames(classes.drawerWrapper, { isCollapsed: isOpen })}
        >
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
              <StyledTypo variant="h5" component="h5">
                Danh sách cột
              </StyledTypo>

              <div className={classes.addButton} onClick={_handleAddColumns}>
                + Thêm cột
              </div>
            </div>

            <SortListColumn
              ref={refSortColumns}
              onReOrderColumns={onReOrderColumns}
            />

            <div className={classes.wrapperOption}>
              <p>Hiện dữ liệu tổng hợp của nhóm việc</p>
              <AntSwitch defaultChecked />
            </div>

            <div className={classes.wrapperOption}>
              <p>Hiện dữ liệu tổng hợp của bảng việc</p>
              <AntSwitch defaultChecked />
            </div>
          </div>
        </Box>
        <AddColumnModal ref={refAdd} onAddColumns={_handleAddSuccess} />
      </>
    );
  }
);

const StyledTypo = styled(Typography)`
  font-size: 16px;
  line-height: 20px;
  color: #1e1f21;
  font-weight: 500;
`;

export default ManageTableData;
