import flattenDepth from "lodash/flattenDepth";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { filterTaskByType } from "../../../../actions/taskDetail/taskDetailActions";
// import { withRouter } from 'react-router-dom';
import ColorChip from "../../../../components/ColorChip";
import { listTaskDataTypes } from "../ListHeader/CreateJobSetting";
import Icon from "@mdi/react";
import { mdiMenuDown, mdiMenuRight } from "@mdi/js";
import './style.scss';
const ListBanner = (props) => {
  const [openList, setOpenList] = React.useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projectDetail = useSelector(
    (state) => state.taskDetail.commonTaskDetail.projectDetail
  );
  const filterTaskType = useSelector(
    (state) => state.taskDetail.listDetailTask.filterTaskType
  );
  const colors = useSelector((state) => state.setting.colors);
  const listTaskDetail = useSelector(
    (state) => state.taskDetail.listDetailTask.listTaskDetail
  );
  const listDataNotRoom = useSelector(
    (state) => state.taskDetail.listDetailTask.listDataNotRoom
  );
  const listTaskDataType = useSelector(
    (state) => state.taskDetail.listDetailTask.listTaskDataType
  );
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const [data, setData] = useState([]);
  const handleChangeFilterType = (typeIdx) => {
    dispatch(filterTaskByType(typeIdx));
  };
  // console.log('listTaskDetail', value)
  useEffect(() => {
    if (listTaskDataType === listTaskDataTypes[1]) {
      setData(flattenDepth(listTaskDetail.map(({ tasks }) => tasks)));
    } else {
      setData(listDataNotRoom);
    }
  }, [filterTaskType, listDataNotRoom, listTaskDataType, listTaskDetail]);

  const OpenList = () => {
    setOpenList(!openList);
  };

  const task_waiting = data.filter(
    ({ status_code }) => status_code === 0
  ).length;
  const task_doing = data.filter(({ status_code }) => status_code === 1).length;
  const task_complete = data.filter(
    ({ status_code }) => status_code === 2
  ).length;
  const task_expired = data.filter(
    ({ status_code }) => status_code === 3
  ).length;
  const task_stop = data.filter(({ status_code }) => status_code === 4).length;
  const allTask =
    task_waiting + task_doing + task_complete + task_expired + task_stop;

  const jobTypes = [
    t("LABEL_CHAT_TASK_TAT_CA_COUNT", { count: allTask }),
    t("LABEL_CHAT_TASK_DANG_CHO_COUNT", { task_waiting }),
    t("LABEL_CHAT_TASK_DANG_LAM_COUNT", { task_doing }),
    t("LABEL_CHAT_TASK_HOAN_THANH_COUNT", { task_complete }),
    t("LABEL_CHAT_TASK_QUA_HAN_COUNT", { task_expired }),
    t("LABEL_CHAT_TASK_TAM_DUNG_COUNT", { task_stop }),
  ];
  const bgColor = colors.find((item) => item.selected === true);
  return (
    <>
      <div style={{borderBottom: `${!openList ? '1px solid #e5e5e9': 'none'}`}} className="classify-option" onClick={OpenList}>
        <Icon
          style={{ paddingRight: "2px" }}
          path={!openList ? mdiMenuRight : mdiMenuDown}
          size={1}
          color={"rgba(0, 0, 0, 0.54)"}
        />{" "}
        <div className="classify-option__title">{t("LABEL_CLASSIFY")}</div>
      </div>
      {openList && (
        <div className="container-list-banner">
          {jobTypes.map((jobType, index) => (
            <ColorChip
              key={index}
              label={jobType}
              onClick={() => handleChangeFilterType(index)}
              color={filterTaskType === index ? "light-blue" : "white"}
              style={{ background: filterTaskType === index && bgColor.color }}
              size="small"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ListBanner;
