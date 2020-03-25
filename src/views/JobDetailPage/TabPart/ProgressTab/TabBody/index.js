import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import { updateComplete } from 'actions/taskDetail/taskDetailActions';
import clsx from 'classnames';
import ColorTypo from 'components/ColorTypo';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import clamp from 'lodash/clamp';
import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import EditProgressItem from './EditProgressItem';
import ProgressSlider from './ProgressSlider';
import './styles.scss';

const colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
  '#f48024', '#69d2e7'
]
const regDMY = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

function parseDate(date = '') {
  if (regDMY.test(date)) {
    return parse(date, 'dd/MM/yyyy', new Date());
  }
  return parse(date, 'yyyy-MM-dd', new Date());
}

function TabBody() {
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails) || {};
  const taskId = useSelector(taskIdSelector);
  const listTime = useSelector(state => state.taskDetail.trackingTime.listTime);
  const trackTimeCompleted = useSelector(state => state.taskDetail.trackingTime.trackTimeCompleted);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const [showDetail, setShowDetail] = useState(false);

  function toggleDetail() {
    setShowDetail(!showDetail)
  }
  const trackings = listTime ? listTime.trackings : [];
  const onChangeCommitted = (data) => {
    let task_id = taskId
    let complete = parseFloat(data);
    dispatch(updateComplete({ data: { task_id, complete }, projectId: projectId }));
  }

  const { data = [] } = trackTimeCompleted || {};
  const chartData = {
    series: [{
      data: data.map(({ complete }) => complete)
    }],
    options: {
      chart: {
        type: 'bar',
        barHeight: '20px',
        // height: 350
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '30px',
          distributed: true,
          dataLabels: {
            enabled: false
          },
        }
      },
      colors,
      dataLabels: {
        enabled: false
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        categories: data.map(({ time }) => time),
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%"
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: false,
        theme: 'dark',
        x: {
          show: false
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%"
          },
          title: {
            formatter: () => ''
          }
        },
      },
    },
  };

  const {
    start_time,
    start_date,
    end_time,
    end_date,
    complete,
    complete_with_time,
  } = detailTask;
  const isHaveDate = (start_date && end_date);
  const totalDay = isHaveDate ? differenceInDays(parseDate(end_date), parseDate(start_date)) : 0;
  const completePercent = clamp(complete_with_time, 0, 100);
  return (
    <Scrollbars className="progressTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}
      renderView={props => <div {...props} className="progressTabBody--container" />}>
      <ColorTypo className="progressTabBody--title">{"Tiến độ thực tế"}</ColorTypo>
      <ColorTypo className="progressTabBody--subTitle">{"Kéo, thả tiến độ để cập nhật"}</ColorTypo>
      <ProgressSlider
        value={complete}
        onChange={onChangeCommitted}
        expected={completePercent}
        isHaveDate={isHaveDate}
      />
      {
        isHaveDate &&
        <>
          <div className="progressTabBody--timeBox">
            <div className="progressTabBody--start-date-box">
              <div>{"Bắt đầu"}</div>
              <div>{`${start_time} ${start_date}`}</div>
            </div>
            <div className="progressTabBody--totalDay">
              <div>{"Tiến độ"}</div>
              <div>{`${totalDay} ngày`}</div>
            </div>
            <div className="progressTabBody--end-date-box">
              <div>{"Kết thúc"}</div>
              <div>{`${end_time} ${end_date}`}</div>
            </div>
          </div>
          <ColorTypo className="progressTabBody--title">{"Tiến độ kế hoạch"}</ColorTypo>
          <ColorTypo className="progressTabBody--subTitle">{"Tự động xác định đến thời điểm hiện tại"}</ColorTypo>
          <div className="progressTimeExpect">
            <div className="progressTimeExpect--progressExpect"
              style={{ width: `${completePercent}%` }}>
              <div className="progressTimeExpect--progressExpectLabel">
                {`${completePercent}% `}
              </div>
            </div>
          </div>
          <div className="progressTimeExpect--today">
            {`Hôm nay: ${format(new Date(), 'dd/MM/yyyy')}`}
          </div>
        </>
      }
      <ColorTypo className="progressTabBody--title">{"Biểu đồ cập nhật tiến độ"}</ColorTypo>
      <ColorTypo className="progressTabBody--subTitle">{"Biểu đồ thể hiện lịch sử hoàn thành công việc"}</ColorTypo>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series} type="bar"
        height={20 * chartData.series[0].data.length + 100} />
      <ColorTypo className="progressTabBody--title"
        onClick={toggleDetail}
      >{"Điều chỉnh tiến độ"}
        <Icon
          path={mdiMenuDown}
          color="rgba(0, 0, 0, 0.54)"
          size={1}
          className={clsx('progressTabBody--icon', { 'progressTabBody__expanded': showDetail })}
        />
      </ColorTypo>
      <ColorTypo className="progressTabBody--subTitle">{`${trackings.length} lần điều chỉnh`}</ColorTypo>
      {showDetail && trackings.map((track, i) => (<EditProgressItem
        key={i}
        fixedNumber={i + 1}
        fixStart={track.new_start}
        fixEnd={track.new_end}
        createdAt={track.time_create}
        avatarUrl={track.user_create_avatar}
      // userName={track.user_created}
      ></EditProgressItem>))}
    </Scrollbars >
  )
}

export default TabBody;
