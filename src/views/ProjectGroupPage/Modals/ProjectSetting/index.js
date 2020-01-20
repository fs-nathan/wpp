import React from 'react';
import { updateStatusCopy } from '../../../../actions/project/setting/updateStatusCopy';
import { updateStatusDate } from '../../../../actions/project/setting/updateStatusDate';
import { connect } from 'react-redux';
import { FormControlLabel, RadioGroup, FormControl, FormLabel, Radio, } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
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
  updateStatusCopy, doUpdateStatusCopy,
  updateStatusDate, doUpdateStatusDate,
}) {

  const { loading: copyLoading } = updateStatusCopy;
  const { loading: dateLoading } = updateStatusDate;

  const [progress, setProgress] = React.useState(0);
  const [copy, setCopy] = React.useState(0);

  return (
    <React.Fragment>
      <CustomModal
        title={'Cài đặt dự án'}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        cancleRender={() => 'Thoát'}
      >
        <StyledFormControl component='fieldset'>
          <TitleFormLabel component='legend'>Tiến độ dự án</TitleFormLabel>
          <StyledFormLabel component='legend'>Thiết lập cách nhập tiến độ mặc định khi tạo công việc mới của dự án</StyledFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={progress} 
            onChange={evt => {

              setProgress(parseInt(evt.target.value));
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio disabled={dateLoading} color={'primary'}/>} label={<React.Fragment>Ngày và giờ (nhập đầy đủ ngày và giờ) <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio disabled={dateLoading} color={'primary'}/>} label='Chỉ nhập ngày (không nhập giờ bắt đầu và kết thúc)' />
            <CustomFormControlLabel value={2} control={<Radio disabled={dateLoading} color={'primary'}/>} label='Không yêu cầu (dành cho công việc không yêu cầu tiến độ)' />
          </RadioGroup>
        </StyledFormControl>
        <StyledFormControl component='fieldset'>
          <TitleFormLabel component='legend'>Sao chép dự án</TitleFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={copy} 
            onChange={evt => {
              
              setCopy(parseInt(evt.target.value));
            }}
          >
            <CustomFormControlLabel value={0} control={<Radio disabled={copyLoading} color={'primary'}/>} label={<React.Fragment>Không được sao chép <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio disabled={copyLoading} color={'primary'}/>} label='Được sao chép' />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    updateStatusDate: state.project.setting.updateStatusDate,
    updateStatusCopy: state.project.setting.updateStatusCopy,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateStatusDate: ({ projectId, status }) => dispatch(updateStatusDate({ projectId, status, })),
    doUpdateStatusCopy: ({ projectId, status }) => dispatch(updateStatusCopy({ projectId, status, })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSetting);
