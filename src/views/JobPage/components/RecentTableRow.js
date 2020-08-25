import { Avatar, TableRow } from "@material-ui/core";
import { mdiAccount, mdiMessageText } from "@mdi/js";
import Icon from "@mdi/react";
import classnames from "classnames";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StyledTableBodyCell } from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import { colors } from "../contants/attrs";
import { JobPageContext } from "../JobPageContext";
import { template } from "../utils";
import InlineBadge from "./InlineBadge";
import InlinePiorityBadge from "./InlinePiorityBadge";
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
    className="comp_AvatarCell"
    {...props}
    align="left"
    width="5%"
  ></StyledTableBodyCell>
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
  <StyledTableBodyCell className="comp_TitleCell" align="left">
    <div className="comp_TitleCell__inner" {...props}></div>
  </StyledTableBodyCell>
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
    align="left"
    width="10%"
    {...props}
  />
);
export const HasMessage = ({ className, path = mdiMessageText, ...props }) => (
  <Icon
    className={classnames("comp_HasMessage", className)}
    path={path}
    {...props}
  />
);

export const TaskTitleLink = ({ complete, className, ...props }) => (
  <Link
    className={classnames(
      "comp_TaskTitleLink",
      complete && "comp_TaskTitleLink__complete",
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
    priority_code,
    priority_name,
    number_member,
    duration_value,
    duration_unit,
    time_end,
    url_redirect,
  }) => {
    const { t } = useTranslation();
    const { setQuickTask } = useContext(JobPageContext);

    return (
      <RecentTableRow>
        <AvatarCell>
          <SmallAvatar title={user_name} src={avatar} />
        </AvatarCell>
        <TitleCell>
          <TaskTitleLink
            title={name}
            complete={complete === 100}
            to={url_redirect}
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
              <InlinePiorityBadge status={priority_code}>
                {priority_name}
              </InlinePiorityBadge>,
              <InlineBadge color={colors.task_complete}>
                {complete}%
              </InlineBadge>,
              <InlineBadge icon={mdiAccount} color={colors.task_waiting}>
                {number_member}
              </InlineBadge>,
            ]
              .filter((item) => item)
              .map((item, i) => (
                <React.Fragment key={i}>{item} </React.Fragment>
              ))}
            {haveNewChat && <HasMessage />}
          </div>
        </TitleCell>
        <DurationCell>
          {duration_value} {t(duration_unit)}
        </DurationCell>
        <EndTimeCell>{time_end !== "Invalid date" && time_end}</EndTimeCell>
        <EndTimeCell>
          {task.remain_day && task.remain_day !== null && (
            <span
              style={{
                color: (() => {
                  switch (task.remain_day) {
                    case 0:
                    case 1:
                      return colors.remain_day_0_1;
                    case 2:
                    case 3:
                      return colors.remain_day_2_3;
                    case 4:
                    case 5:
                      return colors.remain_day_4_5;
                    default:
                      return colors.remain_day_4_5;
                  }
                })(),
              }}
            >
              {template(t("Còn <%= days %> ngày"))({
                days: task.remain_day,
              })}
            </span>
          )}
        </EndTimeCell>
        <QuickViewCell
          onClick={() =>
            setQuickTask(
              <QuickViewTaskDetail
                taskId={id}
                defaultTaskDetail={task}
                onClose={() => setQuickTask(null)}
              />
            )
          }
        >
          {t("Xem nhanh")}
        </QuickViewCell>
      </RecentTableRow>
    );
  }
);
