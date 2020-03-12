import React from 'react';
import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector, useDispatch } from 'react-redux';
import ColorTypo from '../../../../../components/ColorTypo';
import { taskIdSelector } from '../../../selectors';
import { updateComplete } from '../../../../../actions/taskDetail/taskDetailActions';
import ProgressSlider from './ProgressSlider';
import DetailEditProgress from './DetailEditProgress';

import './styles.scss'

function TabBody() {
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails);
  const taskId = useSelector(taskIdSelector);
  const listTime = useSelector(state => state.taskDetail.trackingTime.listTime);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

  const trackings = listTime ? listTime.trackings : [];
  const [firstTrack] = trackings
  const onChangeCommitted = (data) => {
    let task_id = taskId
    let complete = parseFloat(data);
    dispatch(updateComplete({ data: { task_id, complete }, projectId: projectId }));
  }

  return (
    <Scrollbars className="progressTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-progress-tabbody">
        <div className="start-end-date-box">
          <div className="start-date-box">
            <ColorTypo>{detailTask && detailTask.start_time}</ColorTypo>
            <ColorTypo>{detailTask && detailTask.start_date}</ColorTypo>
          </div>
          <div className="end-date-box">
            <ColorTypo>{detailTask && detailTask.end_time}</ColorTypo>
            <ColorTypo>{detailTask && detailTask.end_date}</ColorTypo>
          </div>
        </div>
        {/* progress bar */}
        <ProgressSlider
          value={detailTask.complete}
          onChange={onChangeCommitted}
          expected={detailTask.complete_with_time}
        />
        <div className="legend-box">
          <Icon path={mdiCircle} size={1} color={'#2dc63a'} />
          <ColorTypo>Tiến độ hoàn thành
          {firstTrack && <span className="progressTabBody--recent">(cập nhật gần đây {firstTrack.time_create})</span>}
          </ColorTypo>
        </div>
        <div className="legend-box">
          <Icon path={mdiCircle} size={1} color={'#ff9800'} />
          <ColorTypo>Tiến độ kế hoạch đến ngày hiện tại (dự kiến)</ColorTypo>
        </div>
        <DetailEditProgress trackings={trackings} />
      </div>
    </Scrollbars>
  )
}

export default TabBody;
