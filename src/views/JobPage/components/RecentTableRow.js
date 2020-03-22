import { Avatar, TableRow } from "@material-ui/core";
import { mdiAccount, mdiMessageAlert } from "@mdi/js";
import Icon from "@mdi/react";
import classnames from "classnames";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StyledTableBodyCell } from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import { colors } from "../contants/attrs";
import { taskDetailLink } from "../contants/links";
import { JobPageContext } from "../JobPageContext";
import InlineBadge from "./InlineBadge";
import InlineStatusBadge from "./InlineStatusBadge";
import QuickViewTaskDetail from "./QuickViewTaskDetail";
import "./RecentTableRow.css";
export const RecentTableRow = ({ className, ...props }) => (
  <TableRow
    className={classnames("comp_RecentTableRow table-body-row", className)}
    {...props}
  />
);

export const AvatarCell = ({ className, ...props }) => (
  <StyledTableBodyCell
    className={classnames("comp_AvatarCell", className)}
    align="left"
    width="5%"
    {...props}
  />
);
export const QuickViewCell = ({ className, ...props }) => (
  <StyledTableBodyCell
    className={classnames("comp_QuickViewCell", className)}
    align="right"
    width="10%"
    {...props}
  />
);
export const TitleCell = ({ className, ...props }) => (
  <StyledTableBodyCell
    className={classnames("comp_TitleCell", className)}
    align="left"
    {...props}
  />
);
export const DurationCell = ({ className, ...props }) => (
  <StyledTableBodyCell
    className={classnames("comp_DurationCell", className)}
    align="left"
    width="10%"
    {...props}
  />
);
export const EndTimeCell = ({ className, ...props }) => (
  <StyledTableBodyCell
    className={classnames("comp_EndTimeCell", className)}
    align="right"
    width="10%"
    {...props}
  />
);
export const HasMessage = ({ className, path = mdiMessageAlert, ...props }) => (
  <Icon
    className={classnames("comp_HasMessage", className)}
    path={path}
    {...props}
  />
);

export const TaskTitleLink = ({ className, ...props }) => (
  <Link
    className={classnames(
      "comp_TaskTitleLink",
      props.complete && "comp_TaskTitleLink__complete",
      className
    )}
    {...props}
  />
);
export const LabelWrap = ({ className, ...props }) => (
  <div className={classnames("comp_LabelWrap", className)} {...props} />
);
export const SmallAvatar = ({ className, ...props }) => (
  <Avatar className={classnames("comp_SmallAvatar", className)} {...props} />
);
export default React.memo(
  ({
    project_id,
    task,
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
    const { setQuickTask } = useContext(JobPageContext);

    return (
      <RecentTableRow>
        <AvatarCell>
          <SmallAvatar src={avatar} />
        </AvatarCell>
        <TitleCell>
          <TaskTitleLink
            title={name}
            complete={complete === 100}
            to={taskDetailLink
              .replace("{projectId}", project_id)
              .replace("{taskId}", id)}
          >
            {name}
          </TaskTitleLink>
          <div className="comp_LabelWrap">
            {[
              status_name && (
                <InlineStatusBadge status={status_code}>
                  {status_name}
                </InlineStatusBadge>
              ),
              <InlineBadge color={colors.task_complete}>
                {complete}%
              </InlineBadge>,
              <InlineBadge icon={mdiAccount} color={colors.task_waiting}>
                {number_member}
              </InlineBadge>
            ]
              .filter(item => item)
              .map((item, i) => (
                <React.Fragment key={i}>{item} </React.Fragment>
              ))}
            {haveNewChat && <HasMessage />}
          </div>
        </TitleCell>
        <DurationCell>
          {duration_value} {t(duration_unit)}
        </DurationCell>
        <EndTimeCell>{time_end}</EndTimeCell>
        <QuickViewCell
          onClick={() =>
            setQuickTask(
              <QuickViewTaskDetail taskId={id} defaultTaskDetail={task} />
            )
          }
        >
          {t("Xem nhanh")}
        </QuickViewCell>
      </RecentTableRow>
    );
  }
);
