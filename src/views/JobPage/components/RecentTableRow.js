import { Avatar, TableRow } from "@material-ui/core";
import { mdiAccount, mdiMessageAlert } from "@mdi/js";
import Icon from "@mdi/react";
import classnames from "classnames";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledTableBodyCell } from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import { colors } from "../contants/attrs";
import { taskDetailLink } from "../contants/links";
import { JobPageContext } from "../JobPageContext";
import { loginlineFunc } from "../utils";
import InlineBadge from "./InlineBadge";
import InlineStatusBadge from "./InlineStatusBadge";
import QuickViewTaskDetail from "./QuickViewTaskDetail";
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
export const HasMessage = styled(({ path = mdiMessageAlert, ...props }) => (
  <Icon path={path} {...props} />
))`
  vertical-align: middle;
  width: 1.5rem;
  fill: ${colors.task_expired};
`;
export const TaskTitleLink = styled(Link)`
  color: ${props => (props.complete ? colors.task_complete : "#000")};
  text-decoration: ${props => (props.complete ? "line-through" : "none")};
  &:hover {
    text-decoration: ${props =>
      props.complete ? "line-through" : "underline"};
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
  user_name,
  name,
  complete,
  haveNewChat,
  status_name,
  status_code,
  number_member,
  duration_value,
  duration_unit,
  time_end
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { setQuickTask } = useContext(JobPageContext);

  return (
    <RecentTableRow>
      <AvatarCell onClick={loginlineFunc}>
        <SmallAvatar src={avatar} />
      </AvatarCell>
      <TitleCell onClick={loginlineFunc}>
        <TaskTitleLink
          complete={complete === 100}
          to={taskDetailLink
            .replace("{projectId}", project_id)
            .replace("{taskId}", id)}
        >
          {name}
        </TaskTitleLink>{" "}
        {[
          status_name && (
            <InlineStatusBadge status={status_code}>
              {status_name}
            </InlineStatusBadge>
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
        {haveNewChat && <HasMessage />}
      </TitleCell>
      <DurationCell onClick={loginlineFunc}>
        {duration_value} {t(duration_unit)}
      </DurationCell>
      <EndTimeCell onClick={loginlineFunc}>{time_end}</EndTimeCell>
      <QuickViewCell
        onClick={() =>
          setQuickTask(<QuickViewTaskDetail {...{ avatar, user_name }} />)
        }
      >
        {t("Xem nhanh")}
      </QuickViewCell>
    </RecentTableRow>
  );
};
