import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { listUserRole } from "actions/userRole/listUserRole";
import StyledTypo from "components/ColorTypo";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RoleManagerContainer } from "views/DepartmentPage/Modals/RoleManager";
import { RoleManagerContext } from "views/DepartmentPage/Modals/RoleManager/presenters";
import {
  RightHeader,
  StyledButton,
  StyledTableBodyCell,
} from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
const HomeWrap = styled.div`
  padding-right: 10px;
  font-size: 16px;
  line-height: 1.4;
`;
function RoleManager({ setHackHeader, ...props }) {
  const { t } = useTranslation();
  const { handleOpenModal, userRoles, handleDeleteUserRole } = useContext(
    RoleManagerContext
  );
  useLayoutEffect(() => {
    setHackHeader(
      <div className="header-setting">
        <StyledTypo className="header-title">
          {t("Thiết lập vai trò")}
        </StyledTypo>
        <RightHeader>
          <StyledButton size="small" onClick={() => handleOpenModal("CREATE")}>
            + {t("IDS_WP_CREATE_ORDER")}
          </StyledButton>
        </RightHeader>
      </div>
    );
    return () => {
      setHackHeader(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHackHeader, t]);
  return (
    <Table stickyHeader className="header-document">
      <TableHead>
        <TableRow>
          <TableCell width="30%" align="left">
            {t("Tên")}
          </TableCell>
          <TableCell width="70%" align="left">
            {t("Mô tả")}
          </TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {userRoles.userRoles.map((item, i) => {
          const { name, description } = item;
          return (
            <TableRow key={i} className="comp_RecentTableRow table-body-row">
              <StyledTableBodyCell className="comp_TitleCell" align="left">
                <Typography
                  noWrap
                  title={name}
                  style={{ padding: "10px 10px 10px 0", maxWidth: 300 }}
                  className="comp_TitleCell__inner text-bold"
                >
                  <b>{name}</b>
                </Typography>
              </StyledTableBodyCell>
              <StyledTableBodyCell className="comp_TitleCell" align="left">
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
                  <Button
                    onClick={() =>
                      handleOpenModal("UPDATE", {
                        updatedUserRole: item,
                      })
                    }
                    disableElevation
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    {t("Sửa")}
                  </Button>
                  <div style={{ width: 10 }}></div>
                  <Button
                    onClick={() =>
                      handleOpenModal("ALERT", {
                        content: "Bạn chắc chắn muốn xóa vai trò?",
                        onConfirm: () => handleDeleteUserRole(item),
                      })
                    }
                    disableElevation
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    {t("Xóa")}
                  </Button>
                </div>
              </StyledTableBodyCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUserRole());
  }, [dispatch]);
  return (
    <HomeWrap>
      <RoleManagerContainer>
        <RoleManager {...props}></RoleManager>
      </RoleManagerContainer>
    </HomeWrap>
  );
};
