import React from 'react';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, FormControl, FormLabel, Radio, } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';

const StyledFormControl = styled(FormControl)`
  & > *:not(:first-child) {
    margin-top: 8px;
  }
`;

const TitleFormLabel = styled(FormControl)`
  font-size: 14px;
  font-weight: 500;
  && {
    color: #444;
  }
`;

const StyledFormLabel = styled(FormLabel)`
  font-size: 13px;
  font-weight: normal;
  && {
    color: #666;
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  margin-left: 30px;
  & > span:last-child {
    color: #666;
    font-size: 13px;
    & > small {
      font-size: 13px;
      color: #999;
    }
  }
  & span.Mui-checked + span {
    color: #111;
    & > small {
      color: #111;
    }
  }
`;

function ProjectSetting({ open, setOpen, }) {

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
          <RadioGroup aria-label='progress' name='progress' value={progress} onChange={evt => setProgress(parseInt(evt.target.value))}>
            <CustomFormControlLabel value={0} control={<Radio color={'primary'}/>} label={<React.Fragment>Ngày và giờ (nhập đầy đủ ngày và giờ) <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'}/>} label='Chỉ nhập ngày (không nhập giờ bắt đầu và kết thúc)' />
            <CustomFormControlLabel value={2} control={<Radio color={'primary'}/>} label='Không yêu cầu (dành cho công việc không yêu cầu tiến độ)' />
          </RadioGroup>
        </StyledFormControl>
        <StyledFormControl component='fieldset'>
          <TitleFormLabel component='legend'>Sao chép dự án</TitleFormLabel>
          <RadioGroup aria-label='progress' name='progress' value={copy} onChange={evt => setCopy(parseInt(evt.target.value))}>
            <CustomFormControlLabel value={0} control={<Radio color={'primary'}/>} label={<React.Fragment>Không được sao chép <small>(mặc định)</small></React.Fragment>} />
            <CustomFormControlLabel value={1} control={<Radio color={'primary'}/>} label='Được sao chép' />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
    </React.Fragment>
  )
}

export default ProjectSetting;
