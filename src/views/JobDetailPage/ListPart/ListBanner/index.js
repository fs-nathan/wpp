import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTaskByType } from '../../../../actions/taskDetail/taskDetailActions';
// import { withRouter } from 'react-router-dom';
import ColorChip from '../../../../components/ColorChip';

const ListBanner = props => {
  const dispatch = useDispatch();
  const projectDetail = useSelector(state => state.taskDetail.commonTaskDetail.projectDetail);
  const filterTaskType = useSelector(state => state.taskDetail.listDetailTask.filterTaskType);
  const colors = useSelector(state => state.setting.colors);
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const handleChangeFilterType = typeIdx => {
    dispatch(filterTaskByType(typeIdx));
  };
  // console.log('listTaskDetail', value)

  const {
    task_waiting = 0,
    task_doing = 0,
    task_complete = 0,
    task_expired = 0,
    task_stop = 0
  } = projectDetail || {};
  const allTask = task_waiting + task_doing + task_complete + task_expired + task_stop;

  const jobTypes = [
    'Tất cả (' + allTask + ')',
    'Đang chờ (' +
    (task_waiting) +
    ')', // Waiting
    'Đang làm (' + (task_doing) + ')', // Doing
    'Hoàn thành (' +
    (task_complete) +
    ')', // Complete
    'Quá hạn (' + (task_expired) + ')', // Expired
    'Tạm dừng (' + (task_stop) + ')' // Stop
  ];
  const bgColor = colors.find(item => item.selected === true);
  return (
    <div className="container-list-banner">
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
