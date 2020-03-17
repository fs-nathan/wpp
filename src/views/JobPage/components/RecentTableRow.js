import { Avatar, TableRow } from "@material-ui/core";
import { mdiAccount } from "@mdi/js";
import classnames from "classnames";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledTableBodyCell } from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import { colors } from "../contants/attrs";
import { taskDetailLink } from "../contants/links";
import { loginlineFunc } from "../utils";
import InlineBadge from "./InlineBadge";

export const RecentTableRow = ({ className, ...props }) => (
  <TableRow className={classnames("table-body-row", className)} {...props} />
);

export const AvatarCell = ({ ...props }) => (
  <StyledTableBodyCell align="left" width="5%" {...props} />
);
export const QuickViewCell = styled(({ ...props }) => (
  <StyledTableBodyCell align="right" width="10%" {...props} />
))`
  color: ${colors.task_doing};
`;
export const TitleCell = styled(({ ...props }) => (
  <StyledTableBodyCell align="left" {...props} />
))`
  padding: 10px !important;
`;
export const DurationCell = ({ ...props }) => (
  <StyledTableBodyCell align="right" width="10%" {...props} />
);
export const EndTimeCell = ({ ...props }) => (
  <StyledTableBodyCell align="right" width="10%" {...props} />
);
export const TaskTitleLink = styled(Link)`
  color: #000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const SmallAvatar = styled(Avatar)`
  width: 25px;
  height: 25px;
`;
export default ({
  project_id,
  id,
  avatar,
  name,
  complete,
  status_name,
  status_code,
  number_member,
  duration_value,
  duration_unit,
  time_end
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState();

  return (
    <RecentTableRow>
      <AvatarCell onClick={loginlineFunc}>
        <SmallAvatar src={avatar} />
      </AvatarCell>
      <TitleCell onClick={loginlineFunc}>
        <TaskTitleLink
          to={taskDetailLink
            .replace("{projectId}", project_id)
            .replace("{taskId}", id)}
        >
          {name}
        </TaskTitleLink>{" "}
        {[
          complete === 100 && (
            <InlineBadge color={colors.task_complete}>
              {t("Hoàn thành")}
            </InlineBadge>
          ),
          status_code === 0 && (
            <InlineBadge color={colors.task_waiting}>{status_name}</InlineBadge>
          ),
          status_code === 1 && (
            <InlineBadge color={colors.task_expired}>
              quá hạn 10 ngày
            </InlineBadge>
          ),
          <InlineBadge color={colors.task_complete}>{complete}%</InlineBadge>,
          <InlineBadge icon={mdiAccount} color={colors.task_waiting}>
            {number_member}
          </InlineBadge>
        ]
          .filter(item => item)
          .map((item, i) => (
            <React.Fragment key={i}>{item} </React.Fragment>
          ))}
      </TitleCell>
      <DurationCell onClick={loginlineFunc}>
        {duration_value} {t(duration_unit)}
      </DurationCell>
      <EndTimeCell onClick={loginlineFunc}>{time_end}</EndTimeCell>
      <QuickViewCell onClick={() => setOpen(true)}>
        {t("Xem nhanh")}
      </QuickViewCell>
    </RecentTableRow>
  );
};
