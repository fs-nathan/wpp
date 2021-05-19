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
import CreateThreadChatPrivate from '../../CreateThreadChatPrivate'
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
  const [isOpenCreateChatPrivate, setOpenCreateChatPrivate] = useState(false)
  const [isOpenCreateGroupChat, setOpenCreateGroupChat] = useState(false)
  const [data, setData] = useState([])

  function openCreateChatPrivate(stateOpen = false) {
    setOpenCreateChatPrivate(stateOpen)
  }

  function openCreateGroupChat(stateOpen = false) {
    setOpenCreateGroupChat(stateOpen)
  }

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

  const totalMember = 10;
  const totalGroup = 9;
  const totalAll = 8;

  const jobTypes = [
    t('All', { total_all: listDataNotRoom.length }),
    t('Members', { total_member: listDataNotRoom.filter(e => e.type_chat == 1).length }),
    t('Groups', { total_group: listDataNotRoom.filter(e => e.type_chat == 2).length }),
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
    </div>
  );
};

export default ListBanner;
