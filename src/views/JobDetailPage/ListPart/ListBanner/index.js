import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ColorChip from '../../../../components/ColorChip';
import { WrapperContext } from '../../index';

const ListBanner = props => {
  const value = React.useContext(WrapperContext);
  const [selected, setSelected] = React.useState(0);
  // const [staticTasks, setStaticTask] = React.useState(DEFAULT_VALUE)
  const handleChangeFilterType = typeIdx => {
    value.filterTaskByType(typeIdx);
    setSelected(typeIdx);
  };
  // console.log({value})

  let data = [];
  if (value && value.projectDetail && value.projectDetail) {
    data = value.projectDetail;
  }
  let task_of_me = 0;
  if (value.listTaskDetail && value.listTaskDetail.tasks.length > 0) {
    value.listTaskDetail.tasks.forEach((e, i) => {
      task_of_me += e.tasks.length;
    });
  }

  const taskStatic = {
    task_me: task_of_me,
    task_waiting: data.task_waiting,
    task_doing: data.task_doing,
    task_complete: data.task_complete,
    task_expired: data.task_expired,
    task_stop: data.task_stop
  };
  const jobTypes = [
    'Tất cả (' + (taskStatic.task_me ? taskStatic.task_me : 0) + ')',
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
  const bgColor = props.colors.find(item => item.selected === true);
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

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(withRouter(ListBanner));
