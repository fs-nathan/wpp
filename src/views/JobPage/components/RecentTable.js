import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { taskAtrrs } from "../contants/attrs";
import { createMapPropsFromAttrs, loginlineFunc } from "../utils";
import RecentTableRow from "./RecentTableRow";
export const RecentTable = ({
  tasks = [],
  isToggleSortName,
  toggleSortName
}) => {
  const { t } = useTranslation();
  return (
    <Table className="header-document">
      <TableHead>
        <TableRow>
          <TableCell width="5%"></TableCell>
          <TableCell sortDirection={true} align="left">
            <TableSortLabel
              active={true}
              direction={isToggleSortName ? "asc" : "desc"}
              onClick={() => toggleSortName()}
            >
              {t("Tên công việc")}
            </TableSortLabel>
          </TableCell>
          <TableCell width="10%" align="left">
            {t("Tiến độ")}
          </TableCell>
          <TableCell width="10%" align="right">
            {t("Kết thúc")}
          </TableCell>
          <TableCell width="10%" align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, index) => {
          const [
            project_id,
            id,
            avatar,
            user_name,
            name,
            status_code,
            status_name,
            time_end,
            haveNewChat,
            duration_value,
            duration_unit,
            complete,
            number_member
          ] = loginlineFunc(
            createMapPropsFromAttrs([
              taskAtrrs.project_id,
              taskAtrrs.id,
              taskAtrrs.user_create_avatar,
              taskAtrrs.user_create_name,
              taskAtrrs.name,
              taskAtrrs.status_code,
              taskAtrrs.status_name,
              taskAtrrs.time_end,
              taskAtrrs.haveNewChat,
              taskAtrrs.duration_value,
              taskAtrrs.duration_unit,
              taskAtrrs.complete,
              taskAtrrs.number_member
            ])
          )(task);
          return (
            <RecentTableRow
              {...{
                project_id,
                id,
                avatar,
                name,
                status_code,
                status_name,
                time_end,
                haveNewChat,
                duration_value,
                duration_unit,
                user_name,
                complete,
                number_member
              }}
              className="table-body-row"
              key={index}
            ></RecentTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
