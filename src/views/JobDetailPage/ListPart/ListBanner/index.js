import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import sum from 'lodash/sum';

import ColorChip from '../../../../components/ColorChip';
import { filterTaskByType } from '../../../../actions/taskDetail/taskDetailActions';

const ListBanner = props => {
  const dispatch = useDispatch();
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);
  const colors = useSelector(state => state.setting.colors);
  const [selected, setSelected] = React.useState(0);
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const handleChangeFilterType = typeIdx => {
    dispatch(filterTaskByType(typeIdx));
    setSelected(typeIdx);
  };
  // console.log('listTaskDetail', value)

  let data = [];
  if (projectDetail) {
    data = projectDetail;
  }

  const taskStatic = {
    task_waiting: data.task_waiting,
    task_doing: data.task_doing,
    task_complete: data.task_complete,
    task_expired: data.task_expired,
    task_stop: data.task_stop
  };
  const allTask = sum(Object.values(taskStatic));

  const jobTypes = [
    'Tất cả (' + allTask + ')',
    'Đang chờ (' +
    (taskStatic.task_waiting ? taskStatic.task_waiting : 0) +
    ')', // Waiting
    'Đang làm (' + (taskStatic.task_doing ? taskStatic.task_doing : 0) + ')', // Doing
    'Hoàn thành (' +
    (taskStatic.task_complete ? taskStatic.task_complete : 0) +
    ')', // Complete
    'Quá hạn (' + (taskStatic.task_expired ? taskStatic.task_expired : 0) + ')', // Expired
    'Tạm dừng (' + (taskStatic.task_stop ? taskStatic.task_stop : 0) + ')' // Stop
  ];
  const bgColor = colors.find(item => item.selected === true);
  return (
    <div className="container-list-banner">
      {jobTypes.map((jobType, index) => (
        <ColorChip
          key={index}
          label={jobType}
          onClick={() => handleChangeFilterType(index)}
          color={selected === index ? 'light-blue' : 'white'}
          style={{ background: selected === index && bgColor.color }}
          size="small"
        />
      ))}
    </div>
  );
};

export default ListBanner;
