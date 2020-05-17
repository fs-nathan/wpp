import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import { updateComplete } from 'actions/taskDetail/taskDetailActions';
import clsx from 'classnames';
import ColorTypo from 'components/ColorTypo';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import clamp from 'lodash/clamp';
import React, { useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    duration_value,
  } = detailTask;
  const isHaveDate = (start_date && end_date);
  // const totalDay = isHaveDate ? differenceInDays(parseDate(end_date), parseDate(start_date)) : 0;
  const completePercent = clamp(complete_with_time, 0, 100);
  return (
    <Scrollbars className="progressTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}
      renderView={props => <div {...props} className="progressTabBody--container" />}>
      <ColorTypo className="progressTabBody--title">{t('LABEL_CHAT_TASK_TIEN_DO_THUC_TE')}</ColorTypo>
      <ColorTypo className="progressTabBody--subTitle">{t('LABEL_CHAT_TASK_KEO_THA_TIEN_DO_DE_CAP_NHAT')}</ColorTypo>
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
              <div>{t('LABEL_CHAT_TASK_BAT_DAU_LABEL')}</div>
              <div>{`${start_time} ${start_date}`}</div>
            </div>
            <div className="progressTabBody--totalDay">
              <div>{t('LABEL_CHAT_TASK_TIEN_DO')}</div>
              <div>{`${duration_value} ngày`}</div>
            </div>
            <div className="progressTabBody--end-date-box">
              <div>{t('LABEL_CHAT_TASK_KET_THUC_LABEL')}</div>
              <div>{`${end_time} ${end_date}`}</div>
            </div>
          </div>
          <ColorTypo className="progressTabBody--title">{t('LABEL_CHAT_TASK_TIEN_DO_KE_HOACH')}</ColorTypo>
          <ColorTypo className="progressTabBody--subTitle">{t('LABEL_CHAT_TASK_TU_DONG_XAC_DINH')}</ColorTypo>
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
      <ColorTypo className="progressTabBody--title">{t('LABEL_CHAT_TASK_BIEU_DO_CAP_NHAT_TIEN_DO')}</ColorTypo>
      <ColorTypo className="progressTabBody--subTitle">{t('LABEL_CHAT_TASK_BIEU_DO_THE_HIEN')}</ColorTypo>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series} type="bar"
        height={20 * chartData.series[0].data.length + 100} />
      <ColorTypo className="progressTabBody--title"
        onClick={toggleDetail}
      >{t('LABEL_CHAT_TASK_DIEU_CHINH_TIEN_DO')}
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
        fixedNumber={trackings.length - i}
        fixStart={track.new_start}
        fixEnd={track.new_end}
        createdAt={track.time_create}
        avatarUrl={track.user_create_avatar}
        userName={track.user_create_name}
      ></EditProgressItem>))}
    </Scrollbars >
  )
}

export default TabBody;
