import {
  Box,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get, loginlineParams } from "views/JobPage/utils";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { CustomTableBodyCell } from "./AddGroupPermissionModal";
import { RoundSearchBox } from "./SearchBox";
export const SetPermissionModal = ({
  permissionList = emptyArray,
  loading,
  onClose,
  value = emptyArray,
  onSubmit,
}) => {
  const [keyword, setKeyword] = useState("");
  const { t } = useTranslation();
  const onInputChange = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );
  return (
    <ModalCommon
      loading={loading}
      title={t("Gán quyền cho nhóm")}
      onClose={onClose}
      footerAction={[
        {
          action: onSubmit,
          name: t("Hoàn thành"),
        },
      ]}
    >
      <DialogContent dividers className="dialog-content move-content">
        <Box padding="24px">
          <VerticleList>
            <Box fontSize="15px" fontWeight="bold">
              {t("DANH SÁCH QUYỀN")}
            </Box>
            <RoundSearchBox
              onChange={onInputChange}
              placeholder={t("Tìm kiếm quyền")}
            />
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: "0px" }} width="20px">
                    <Checkbox
                      onChange={(e) => loginlineParams(e.target.value)}
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
                {permissionList.map((group) => (
                  <>
                    <TableRow>
                      <CustomTableBodyCell
                        style={{ padding: "0px" }}
                        align="left"
                      >
                        <Checkbox color="primary" />
                      </CustomTableBodyCell>
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
                      .filter(({ name = "" }) => name.includes(keyword))
                      .map(({ name, description, permission }) => (
                        <TableRow
                          key={permission}
                          className="comp_RecentTableRow table-body-row"
                        >
                          <CustomTableBodyCell
                            style={{ padding: "0px" }}
                            align="left"
                          >
                            <Checkbox
                              checked={value.includes(permission)}
                              onChange={loginlineParams}
                              color="primary"
                            />
                          </CustomTableBodyCell>
                          <CustomTableBodyCell align="left">
                            <Typography noWrap title={name}>
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
                  </>
                ))}
              </TableBody>
            </Table>
            <Space height={"50px"}></Space>
          </VerticleList>
        </Box>
      </DialogContent>
    </ModalCommon>
  );
};
