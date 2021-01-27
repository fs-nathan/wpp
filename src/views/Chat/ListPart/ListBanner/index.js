import flattenDepth from 'lodash/flattenDepth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { filterTaskByType } from '../../../../actions/taskDetail/taskDetailActions';
// import { withRouter } from 'react-router-dom';
import ColorChip from '../../../../components/ColorChip';
import { listTaskDataTypes } from '../ListHeader/CreateJobSetting';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded'
import './index.scss';

const ListBanner = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);
  const filterTaskType = useSelector(state => state.taskDetail.listDetailTask.filterTaskType);
  const colors = useSelector(state => state.setting.colors);
  const listTaskDetail = useSelector(state => state.taskDetail.listDetailTask.listTaskDetail);
  const listDataNotRoom = useSelector(state => state.taskDetail.listDetailTask.listDataNotRoom);
  const listTaskDataType = useSelector(state => state.taskDetail.listDetailTask.listTaskDataType)
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const [data, setData] = useState([])
  const handleChangeFilterType = typeIdx => {
    dispatch(filterTaskByType(typeIdx));
  };
  // console.log('listTaskDetail', value)
  useEffect(() => {
    if (listTaskDataType === listTaskDataTypes[1]) {
      setData(flattenDepth(listTaskDetail.map(({ tasks }) => tasks)))
    } else {
      setData(listDataNotRoom)
    }
  }, [filterTaskType, listDataNotRoom, listTaskDataType, listTaskDetail])

  const totalMember = 0;
  const totalGroup = 0;
  const totalAll = 0;

  const jobTypes = [
    t('All', { total_all: totalAll }),
    t('Members', { total_member: totalMember }),
    t('Groups', { total_group: totalGroup }),
  ];
  const bgColor = colors.find(item => item.selected === true);
  return (
    <div className="chat-container-list-banner">
      {jobTypes.map((jobType, index) => (
        <ColorChip
          key={index}
          label={jobType}
          onClick={() => handleChangeFilterType(index)}
          color={filterTaskType === index ? 'light-blue' : 'white'}
          style={{ background: filterTaskType === index && bgColor.color }}
          size="small"
        />
      ))}
      <div className="chat-group-bt-create-thread">
        <span title={t("Create chat")}>
          <PersonAddRoundedIcon classes={{root: "chat-add-thead-member"}} />
        </span>
        <span title={t("Create group chat")}>
          <GroupAddRoundedIcon classes={{root: "chat-add-thead-group"}} />
        </span>
      </div>
    </div>
  );
};

export default ListBanner;
