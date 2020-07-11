import {
  Box, FormControlLabel,

  IconButton,
  Radio
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from "@material-ui/icons/Close";
import { mdiCalendar } from '@mdi/js';
import Icon from '@mdi/react';
import { changeFlagFetchProjectSchedules, changeMainCalendar, changeProjectSchedule } from 'actions/gantt';
import { Drawer } from 'antd';
import { apiService } from 'constants/axiosInstance';
import React, { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeInstanceGird } from '../../../actions/gantt';
import { changeVisibleConfigGantt } from '../../../actions/system/system';
import "../../../views/JobPage/components/QuickViewFilter.css";
import "../../../views/JobPage/Layout/QuickView.css";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const StyledScrollbarsSide = ({ className = '', height, ...props }) =>
  <Scrollbars className={`comp_CustomModal___scrollbar-side-${height} ${className}`} {...props} />;
const TimeUnitConfig = ({ changeInstanceGird, mainCalendar, changeMainCalendar, changeProjectSchedule, changeFlagFetchProjectSchedules, fetchProjectSchedule, height, state, type, changeVisibleConfigGantt, girdType, projectSchedules }) => {
  const params = useParams()
  const { t } = useTranslation()
  const handleOnChange = (e) => {
    changeInstanceGird(e.target.value)
  }
  const fetchProjectSchedules = async () => {
    try {
      const { projectId } = params
      const result = await apiService({
        url: `project/get-schedules?project_id=${projectId}`
      })
      changeProjectSchedule(result.data.schedules)
      changeFlagFetchProjectSchedules(false)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (fetchProjectSchedule)
      fetchProjectSchedules()
  }, [fetchProjectSchedule])
  return (
    <Drawer
      closable={false}
      title={<div style={{ flexDirection: 'row' }} className="comp_QuickViewWrapper">
        <div className="comp_QuickViewHeaderLeft">
          <Box className="comp_QuickViewFilter__headerWrapper comp_QuickViewFilter__headerConfig">
            <Icon
              className="comp_QuickViewFilter__headerIcon"
              path={mdiCalendar}
            ></Icon>
            <Box className="comp_QuickViewFilter__headerTitle">
              {t('LABEL_GANTT_NAME_DURATION_DRAWER_TITLE')}
            </Box>
          </Box>
        </div>
        <div className="comp_QuickViewHeaderRight">
          <IconButton >
            <CloseIcon onClick={() => changeVisibleConfigGantt(false, '')} />
          </IconButton>
        </div>
      </div>
      }
      placement="right"
      mask={false}
      visible={state && type === 'TIME'}
      width={400}
      style={{ height, top: `calc(100vh - ${height}px` }}
    >
      <StyledScrollbarsSide
        autoHide
        autoHideTimeout={500}
        height={'tail'}
      >
        <p className="config--drawer--section">{t('GANTT_DURATION_DRAWER_SET_TIME_UNIT')}</p>
        <p className="config--drawer--title">{t('GANTT_EXPORT_PDF_SET_TIME_UNIT_GANTT')}</p>
        <div className="config--drawer--checkbox-section gantt--time-unit__label-container">
          <div className="">
            <FormControlLabel
              value={'HOUR'}
              control={<Radio color="primary" />}
              label={t('GANTT_GIỜ')}
              onChange={handleOnChange}
              checked={girdType === 'HOUR'}

            />
          </div><div className="">
            <FormControlLabel
              value={'DAY'}
              control={<Radio color="primary" />}
              label={t('GANTT_NGÀY')}
              onChange={handleOnChange}
              checked={girdType === 'DAY'}
            />
            <div className="">
              <FormControlLabel
                value={'WEEK'}
                control={<Radio color="primary" />}
                label={t('GANTT_TUẦN')}
                onChange={handleOnChange}
                checked={girdType === 'WEEK'}
              />
            </div>
          </div><div className="">
            <FormControlLabel
              value={'MONTH'}
              control={<Radio color="primary" />}
              label={t('GANTT_THÁNG')}
              onChange={handleOnChange}
              checked={girdType === 'MONTH'}
            />
          </div><div className="">
            <FormControlLabel
              value={'QUARTER'}
              control={<Radio color="primary" />}
              label={t('GANTT_QUÝ')}
              onChange={handleOnChange}
              checked={girdType === 'QUARTER'}
            />
          </div>
        </div>
        <p className="config--drawer--section">{t('GANTT_EXPORT_PDF_DISPLAY_CALENDAR')}</p>
        <p className="config--drawer--title">{t('GANTT_EXPORT_PDF_DISPLAY_CALENDAR_SELECT')}</p>
        <div className="config--drawer--checkbox-section gantt--time-unit__label-container">
          <div className="">
            <FormControlLabel
              classes={{
                root: 'gantt--timeunitconfig__schedule'
              }}
              control={<NativeSelect
                native
                onChange={(e) => {
                  changeMainCalendar(e.target.value)
                }}
                defaultValue={mainCalendar}
                input={<BootstrapInput />}
              >
                {projectSchedules.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
              </NativeSelect>}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </StyledScrollbarsSide >
    </Drawer >
  )
}

const mapStateToProps = state => ({
  state: state.system.ganttConfig.state,
  type: state.system.ganttConfig.type,
  girdType: state.gantt.girdType,
  projectSchedules: state.gantt.projectSchedules,
  fetchProjectSchedule: state.gantt.fetchProjectSchedule,
  mainCalendar: state.gantt.mainCalendar,

})

const mapDispatchToProps = {
  changeVisibleConfigGantt,
  changeInstanceGird,
  changeProjectSchedule,
  changeFlagFetchProjectSchedules,
  changeMainCalendar
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeUnitConfig)