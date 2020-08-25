import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import CustomModal from 'components/CustomModal';
import { CustomEventDispose, CustomEventListener, DETAIL_STATUS, LIST_PROJECT, UPDATE_STATUS_COPY, UPDATE_STATUS_DATE, UPDATE_STATUS_VIEW } from 'constants/events.js';
import { get } from 'lodash';
import React from 'react';
import './style.scss';

const StyledFormControl = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_ProjectSettingModal___form-control ${className}`}
    {...props}
  />;

const TitleFormLabel = ({ className = '', ...props }) =>
  <FormControl
    className={`view_ProjectGroup_ProjectSettingModal___form-title ${className}`}
    {...props}
  />;

const StyledFormLabel = ({ className = '', ...props }) =>
  <FormLabel
    className={`view_ProjectGroup_ProjectSettingModal___form-label ${className}`}
    {...props}
  />;

const CustomFormControlLabel = ({ className = '', ...props }) =>
  <FormControlLabel
    className={`view_ProjectGroup_ProjectSettingModal___form-control-label ${className}`}
    {...props}
  />;

function ProjectSetting({
  open, setOpen,
  status, curProject,
  canChange,
  handleUpdateStatusCopy,
  handleUpdateStatusDate,
  handleUpdateStatusView,
  doReload,
  projectGroupId, timeRange,
}) {

  const [progress, setProgress] = React.useState(0);
  const [copy, setCopy] = React.useState(0);
  const [view, setView] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [mask, setMask] = React.useState(-1);

  React.useEffect(() => {
    setLoading((mask === 3 || mask === -1) ? false : true);
  }, [mask]);

  React.useEffect(() => {
    setProgress(parseInt(get(status.status, 'date', 0)));
    setCopy(get(status.status, 'copy', false) === true ? 1 : 0);
    setView(parseInt(get(status.status, 'view', 0)));
  }, [status]);

  React.useEffect(() => {
    const fail = () => {
      setMask(-1);
    };
    CustomEventListener(UPDATE_STATUS_COPY.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_DATE.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_VIEW.SUCCESS, doReload);
    CustomEventListener(UPDATE_STATUS_COPY.FAIL, fail);
    CustomEventListener(UPDATE_STATUS_DATE.FAIL, fail);
    CustomEventListener(UPDATE_STATUS_VIEW.FAIL, fail);
    return () => {
      CustomEventDispose(UPDATE_STATUS_COPY.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_DATE.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_VIEW.SUCCESS, doReload);
      CustomEventDispose(UPDATE_STATUS_COPY.FAIL, fail);
      CustomEventDispose(UPDATE_STATUS_DATE.FAIL, fail);
      CustomEventDispose(UPDATE_STATUS_VIEW.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject, projectGroupId, timeRange]);

  React.useEffect(() => {
    const success = bit => () => {
      setMask(oldMask => oldMask | (1 << bit));
    };
    const fail = () => {
      setMask(-1);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success(0));
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    CustomEventListener(DETAIL_STATUS.SUCCESS, success(1));
    CustomEventListener(DETAIL_STATUS.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success(0));
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
      CustomEventDispose(DETAIL_STATUS.SUCCESS, success(1));
      CustomEventDispose(DETAIL_STATUS.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curProject, projectGroupId, timeRange]);

  return (
    <React.Fragment>
      <CustomModal
        title={'Cài đặt dự án'}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        cancleRender={() => 'Thoát'}
        loading={loading || status.loading}
      >
        {get(canChange, 'date', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>Tiến độ dự án</TitleFormLabel>
          <StyledFormLabel component='legend'>Thiết lập cách nhập tiến độ mặc định khi tạo công việc mới của dự án</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={progress}
            onChange={evt => {
              handleUpdateStatusDate(parseInt(evt.target.value));
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={2} control={<Radio color={'primary'} />} label={<React.Fragment>Ngày và giờ (nhập đầy đủ ngày và giờ) <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label='Chỉ nhập ngày (không nhập giờ bắt đầu và kết thúc)' />
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label='Không yêu cầu (dành cho công việc không yêu cầu tiến độ)' />
          </RadioGroup>
        </StyledFormControl>}
        {get(canChange, 'copy', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>Sao chép dự án</TitleFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={copy}
            onChange={evt => {
              handleUpdateStatusCopy(parseInt(evt.target.value) === 1 ? true : false);
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={<React.Fragment>Không được sao chép <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label='Được sao chép' />
          </RadioGroup>
        </StyledFormControl>}
        {get(canChange, 'view', false) && <StyledFormControl component='fieldset' fullWidth>
          <TitleFormLabel component='legend'>Chế độ xem dự án mặc định</TitleFormLabel>
          <StyledFormLabel component='legend'>Thiết lập khung hình mặc định khi click vào một dự án: dạng danh sách công việc (Table), dạng sơ đồ gantt (Gantt), dạng thảo luận (Chat)</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={view}
            onChange={evt => {
              handleUpdateStatusView(parseInt(evt.target.value));
              setMask(0);
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio color={'primary'} />} label={<React.Fragment>Bảng danh sách công việc (Table) <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'} />} label='Thảo luận (Chat)' />
            <CustomFormControlLabel value={2} control={<Radio color={'primary'} />} label='Sơ đồ gantt (Gantt)' />
          </RadioGroup>
        </StyledFormControl>}
      </CustomModal>
    </React.Fragment>
  )
}

export default ProjectSetting;