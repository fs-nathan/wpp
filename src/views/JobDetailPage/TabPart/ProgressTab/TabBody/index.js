import { updateComplete } from 'actions/taskDetail/taskDetailActions';
import ColorTypo from 'components/ColorTypo';
import differenceInDays from 'date-fns/differenceInDays';
import parse from 'date-fns/parse';
import clamp from 'lodash/clamp';
import React from 'react';
import ReactApexChart from "react-apexcharts";
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { taskIdSelector } from '../../../selectors';
import DetailEditProgress from './DetailEditProgress';
import ProgressSlider from './ProgressSlider';
import './styles.scss';

const colors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
  '#f48024', '#69d2e7'
]

function TabBody() {
  const dispatch = useDispatch();
  const detailTask = useSelector(state => state.taskDetail.detailTask.taskDetails) || {};
  const taskId = useSelector(taskIdSelector);
  const listTime = useSelector(state => state.taskDetail.trackingTime.listTime);
  const trackTimeCompleted = useSelector(state => state.taskDetail.trackingTime.trackTimeCompleted);
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);

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
        barHeight: '80%',
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
  const totalDay = isHaveDate ? differenceInDays(parse(end_date, 'yyyy-MM-dd', new Date()), parse(start_date, 'yyyy-MM-dd', new Date())) : 0;
  const completePercent = clamp(complete_with_time, 0, 100);
  return (
    <Scrollbars className="progressTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}
      renderView={props => <div {...props} className="progressTabBody--container" />}>
      <ColorTypo className="progressTabBody--title">{"Tiến độ thực tế"}</ColorTypo>
      <ColorTypo color="#818181">{"Kéo, thả tiến độ để cập nhật"}</ColorTypo>
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
          <ColorTypo color="#818181">{"Tự động xác định đến thời điểm hiện tại"}</ColorTypo>
          <div className="progressTimeExpect">
            <div className="progressTimeExpect--progressExpect"
              style={{ width: `${completePercent}%` }}>
              <div className="progressTimeExpect--progressExpectLabel">
                {`${completePercent}% `}
                <div className="progressTimeExpect--today"
                  style={{ left: `calc(${completePercent}% - 30px)` }}
                >
                  <div>
                    Hôm nay
                </div>
                  <div>
                    {detailTask.start_date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <ColorTypo className="progressTabBody--title">{"Biểu đồ cập nhật tiến độ"}</ColorTypo>
      <ColorTypo color="#818181">{"Biểu đồ thể hiện lịch sử hoàn thành công việc"}</ColorTypo>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      <DetailEditProgress trackings={trackings} />
    </Scrollbars >
  )
}

export default TabBody;
