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
import { emptyArray } from "../contants/defaultValue";
import { createMapPropsFromAttrs } from "../utils";
import EmptyHolder from "./EmptyHolder";
import RecentTableRow from "./RecentTableRow";
export const TaskTable = ({
  tasks = emptyArray,
  isToggleSortName,
  toggleSortName
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Table className="header-document">
        <TableHead>
          <TableRow>
            <TableCell width="5%"></TableCell>
            <TableCell align="left">
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
            <TableCell width="10%" align="left">
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
              priority_code,
              priority_name,

              time_end,
              haveNewChat,
              duration_value,
              duration_unit,
              complete,
              number_member
            ] = createMapPropsFromAttrs([
              taskAtrrs.project_id,
              taskAtrrs.id,
              taskAtrrs.user_create_avatar,
              taskAtrrs.user_create_name,
              taskAtrrs.name,
              taskAtrrs.status_code,
              taskAtrrs.status_name,
              taskAtrrs.priority_code,
              taskAtrrs.priority_name,
              taskAtrrs.time_end,
              taskAtrrs.haveNewChat,
              taskAtrrs.duration_value,
              taskAtrrs.duration_unit,
              taskAtrrs.complete,
              taskAtrrs.number_member
            ])(task);
            return (
              <RecentTableRow
                {...{
                  project_id,
                  id,
                  avatar,
                  name,
                  status_code,
                  status_name,
                  priority_code,
                  priority_name,
                  time_end,
                  haveNewChat,
                  duration_value,
                  duration_unit,
                  user_name,
                  complete,
                  number_member
                }}
                className="table-body-row"
                task={task}
                key={index}
              ></RecentTableRow>
            );
          })}
        </TableBody>
      </Table>
      {tasks.length === 0 && <EmptyHolder />}
    </>
  );
};
