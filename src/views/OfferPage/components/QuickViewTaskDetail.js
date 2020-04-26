import { Avatar, Box } from "@material-ui/core";
import * as taskDetailAction from "actions/taskDetail/taskDetailActions";
import AvatarCircleList from "components/AvatarCircleList";
import colors from "helpers/colorPalette";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { taskAtrrs } from "../contants/attrs";
import { taskDetailLink } from "../contants/links";
import { OfferPageContext } from "../OfferPageContext";
import QuickView from "../Layout/QuickView";
import { createMapPropsFromAttrs, get, template } from "../utils";
import InlineBadge from "./InlineBadge";
import InlinePiorityBadge from "./InlinePiorityBadge";
import InlineStatusBadge from "./InlineStatusBadge";
import { QuickViewRow } from "./QuickViewRow";
import "./QuickViewTaskDetail.css";
import VerticleList from "./VerticleList";
// const task = {
//   state: true,
//   task: {
//     id: "5e6ed9a11a5a6aab6734322d",
//     project: "5e6ed97f1a5a6aab6734322b",
//     name: "cv 1",
//     description:
//       '{"blocks":[{"key":"bu8bd","text":"123 435","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
//     group_task: null,
//     group_task_name: "Default group",
//     complete: 53,
//     updated_complete_at: "",
//     is_ghim: true,
//     is_turn_of_notification: true,
//     complete_with_time: 250,
//     state_code: 3,
//     state_name: "Expired",
//     priority_code: 1,
//     priority_name: "Medium",
//     assign_code: 2,
//     assign_name: "Allot",
//     duration_value: 2,
//     duration_unit: "days",
//     time_implement: 5,
//     start_time: "08:00",
//     start_date: "17/03/2020",
//     end_time: "17:00",
//     end_date: "19/03/2020",
//     total_subtask: 2,
//     total_subtask_complete: 1,
//     total_remind: 0,
//     total_file: 0,
//     total_img: 0,
//     total_link: 0,
//     total_location: 0,
//     total_offer: 4,
//     total_offer_approved: 1,
//     total_command: 3,
//     members: [
//       {
//         id: "5e5dbb68abaa0b738ab80538",
//         name: "an",
//         avatar:
//           "https://storage.googleapis.com/storage_vtask_net/Icon_default/avatar.png",
//         roles: ["Leader", "Giám sát dự án"]
//       },
//       {
//         id: "5e5dd5d7abaa0b738ab8054f",
//         name: "Workplus Demo",
//         avatar:
//           "https://storage.googleapis.com/storage_vtask_net/1583219023006-filename",
//         roles: []
//       },
//       {
//         id: "5e5e028eb005cfaed662fcfd",
//         name: "VietApp Software",
//         avatar:
//           "https://storage.googleapis.com/storage_vtask_net/Icon_default/avatar.png",
//         roles: []
//       },
//       {
//         id: "5e5d30c8696d1272353532b7",
//         name: "Thai Khac Duong",
//         avatar:
//           "https://storage.googleapis.com/storage_vtask_net/Icon_default/avatar.png",
//         roles: []
//       }
//     ],
//     user_create: {
//       id: "5e5dbb68abaa0b738ab80538",
//       name: "an",
//       avatar:
//         "https://storage.googleapis.com/storage_vtask_net/Icon_default/avatar.png",
//       roles: ["Leader", "Giám sát dự án"]
//     },
//     date_create: "16/03/2020"
//   }
// };

export const QuickViewTaskDetailHeader = ({ detailTask }) => {
  const { t } = useTranslation();
  return (
    <div className="comp_QuickViewTaskDetailHeader">
      <Avatar
        className="comp_QuickViewTaskDetailHeader__avatar"
        src={get(detailTask, taskAtrrs.user_create_avatar)}
      ></Avatar>
      <div className="comp_QuickViewTaskDetailHeader__right">
        <div className="comp_QuickViewTaskDetailHeader__title">
          {get(detailTask, taskAtrrs.user_create_name)}
        </div>
        <div className="comp_QuickViewTaskDetailHeader__subtitle">
          {get(detailTask, taskAtrrs.user_create_roles, []).reduce(
            (result, string, i) => {
              return result + (i === 0 ? "" : " - ") + string;
            },
            ""
          )}
        </div>
        <div className="comp_QuickViewTaskDetailHeader__date">
          {template(t("Đã được giao ngày <%= date %>"))({
            date: get(detailTask, taskAtrrs.date_create)
          })}
        </div>
      </div>
    </div>
  );
};
const EditAction = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <Box className="comp_QuickViewTaskDetail__action" {...props}>
      {t("Chỉnh sửa")}
    </Box>
  );
};

function QuickViewTaskDetail({ detailTask }) {
  const { t } = useTranslation();
  const { pin, setPin } = useContext(OfferPageContext);
  const history = useHistory();
  const [project_id, id] = createMapPropsFromAttrs([
    taskAtrrs.project_id,
    taskAtrrs.id
  ])(detailTask);
  const [openEditJob, setOpenEditJob] = useState();
  const [modal, setModal] = useState(undefined);
  const openModal = useCallback(
    modal => {
      setPin(true);
      setModal(modal);
    },
    [setPin]
  );
  const closeModal = useCallback(() => {
    setPin(false);
    setModal(undefined);
  }, [setPin]);
  return (
    <>
      <QuickView
        bottom={
          <Box className="comp_QuickViewTaskDetail__bottom">
            <Box
              className="comp_QuickViewTaskDetail__bottomAction__detail cursor-pointer"
              onClick={() => {
                history.push(
                  taskDetailLink
                    .replace("{projectId}", project_id)
                    .replace("{taskId}", id)
                );
              }}
            >
              {t("Xem chi tiết công viêc")}
            </Box>
            {/* <Box className="comp_QuickViewTaskDetail__bottomAction__delete cursor-pointer">
              {t("Xóa công viêc")}
            </Box> */}
          </Box>
        }
        title={<QuickViewTaskDetailHeader detailTask={detailTask} />}
      >
        <VerticleList>
          <QuickViewRow
            title={t("TÊN CÔNG VIỆC")}
            actions={
              <EditAction
                onClick={() => {
                  setOpenEditJob(true);
                }}
              />
            }
          >
            {get(detailTask, taskAtrrs.name, "#########")}
          </QuickViewRow>
          <QuickViewRow title={t("MÔ TẢ CÔNG VIỆC")}>
            <Box whiteSpace="pre" lineHeight="1.4" fontSize="14px">
              {JSON.stringify(
                get(detailTask, taskAtrrs.description, "#########")
              )}
            </Box>
          </QuickViewRow>
          <QuickViewRow title={t("TIẾN ĐỘ")}>
            <Box fontSize="14px">
              {t("Ngày bắt đầu")}: {get(detailTask, taskAtrrs.start_time)}{" "}
              {get(detailTask, taskAtrrs.start_date, "##/##/####")}
            </Box>
            <Box marginTop="0.5em" fontSize="14px">
              {t("Ngày kết thúc")}: {get(detailTask, taskAtrrs.end_time)}{" "}
              {get(detailTask, taskAtrrs.end_date, "##/##/####")}
            </Box>
            <Box marginTop="0.5em" fontSize="14px">
              {t("Hoàn thành")}: {get(detailTask, taskAtrrs.complete, 0)}%
            </Box>
          </QuickViewRow>
          <QuickViewRow title={t("TRẠNG THÁI, ƯU TIÊN")}>
            <Box lineHeight="1">
              <InlineStatusBadge status={get(detailTask, taskAtrrs.state_code)}>
                {get(detailTask, taskAtrrs.state_name)}
              </InlineStatusBadge>{" "}
              <InlinePiorityBadge
                status={get(detailTask, taskAtrrs.priority_code)}
              >
                {get(detailTask, taskAtrrs.priority_name)}
              </InlinePiorityBadge>
            </Box>
          </QuickViewRow>
          <QuickViewRow title={t("THÀNH VIÊN")}>
            <AvatarCircleList
              display={3}
              users={get(detailTask, taskAtrrs.members, [{}, {}, {}])}
            />
          </QuickViewRow>
          <QuickViewRow title={t("CÔNG VIỆC CON")}>
            <InlineBadge color={colors.green[0]}>
              {get(detailTask, taskAtrrs.total_subtask, 0)} {t("công việc")}
            </InlineBadge>
          </QuickViewRow>
        </VerticleList>
      </QuickView>
    </>
  );
}
const QuickViewTaskDetailContainer = ({
  taskId,
  defaultTaskDetail = {},
  ...props
}) => {
  const dispatch = useDispatch();
  const detailTask = useSelector(
    state => state.taskDetail.detailTask.taskDetails
  );
  useEffect(() => {
    dispatch(taskDetailAction.getTaskDetailTabPart({ taskId: taskId }));
  }, [dispatch, taskId]);

  const finalTask = {
    ...{
      assign_code: 0
    },
    ...defaultTaskDetail,
    ...(detailTask && detailTask !== null && taskId === detailTask.id
      ? detailTask
      : {})
  };
  return <QuickViewTaskDetail detailTask={finalTask} {...props} />;
};
export default QuickViewTaskDetailContainer;
