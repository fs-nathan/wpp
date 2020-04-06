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
import { FormikContext } from "formik";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { Space } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Space";
import { CustomTableBodyCell } from "./AddGroupPermissionModal";
import { RoundSearchBox } from "./SearchBox";
export const SetPermissionModal = ({ loading, onClose }) => {
  const { t } = useTranslation();
  const { handleSubmit } = useContext(FormikContext);
  return (
    <ModalCommon
      loading={loading}
      title={t("Gán quyền cho nhóm")}
      onClose={onClose}
      footerAction={[
        {
          action: handleSubmit,
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
            <RoundSearchBox placeholder={t("Tìm kiếm quyền")} />
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ padding: "0px" }} width="20px">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell width="30%" align="left">
                    {t("Tên quyền")}
                  </TableCell>
                  <TableCell align="left">{t("Mô tả")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <CustomTableBodyCell style={{ padding: "0px" }} align="left">
                    <Checkbox color="primary" />
                  </CustomTableBodyCell>
                  <CustomTableBodyCell
                    colSpan={12}
                    className="comp_TitleCell"
                    align="left"
                  >
                    <Typography fontWeight="bold">
                      <b>{t("Nhóm quyền hệ thống (9)")}</b>
                    </Typography>
                  </CustomTableBodyCell>
                </TableRow>
                {new Array(5)
                  .fill({
                    name: "Chỉnh sửa nhóm việc",
                    description: "Cập nhật thông tin nhóm việc",
                  })
                  .map(({ name, description }, i) => (
                    <TableRow
                      key={i}
                      className="comp_RecentTableRow table-body-row"
                    >
                      <CustomTableBodyCell
                        style={{ padding: "0px" }}
                        align="left"
                      >
                        <Checkbox color="primary" />
                      </CustomTableBodyCell>
                      <CustomTableBodyCell align="left">
                        <Typography>
                          <b>{name + " " + i}</b>
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
                    style={{ padding: "0px" }}
                    align="left"
                  >
                    <Divider />
                  </CustomTableBodyCell>
                </TableRow>
                <TableRow>
                  <CustomTableBodyCell style={{ padding: "0px" }} align="left">
                    <Checkbox color="primary" />
                  </CustomTableBodyCell>
                  <CustomTableBodyCell
                    colSpan={12}
                    className="comp_TitleCell"
                    align="left"
                  >
                    <Typography fontWeight="bold">
                      <b>{t("Nhóm quyền hệ thống (9)")}</b>
                    </Typography>
                  </CustomTableBodyCell>
                </TableRow>
                {new Array(5)
                  .fill({
                    name: "Chỉnh sửa nhóm việc",
                    description: "Cập nhật thông tin nhóm việc",
                  })
                  .map(({ name, description }, i) => (
                    <TableRow
                      key={i}
                      className="comp_RecentTableRow table-body-row"
                    >
                      <CustomTableBodyCell
                        style={{ padding: "0px" }}
                        align="left"
                      >
                        <Checkbox color="primary" />
                      </CustomTableBodyCell>
                      <CustomTableBodyCell align="left">
                        <Typography>
                          <b>{name + " " + i}</b>
                        </Typography>
                      </CustomTableBodyCell>
                      <CustomTableBodyCell align="left">
                        <Typography>{description}</Typography>
                      </CustomTableBodyCell>
                    </TableRow>
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
