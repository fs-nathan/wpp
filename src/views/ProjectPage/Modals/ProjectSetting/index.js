import React from 'react';
import styled from 'styled-components';
import { FormControlLabel, RadioGroup, FormControl, FormLabel, Radio, } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';

const StyledFormControl = styled(FormControl)`
  & > *:not(:first-child) {
    margin-top: 8px;
  }
  & > legend {
    color: black;
    font-size: 14px;
    font-weight: 500;
  }
  & > div > label > span:last-child {
    color: #888;
    font-size: 14px;
    & > small {
      font-size: 14px;
      color: #bbb;
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
        onConfirm={() => null}
      >
        <StyledFormControl component='fieldset'>
          <FormLabel component='legend'>Tiến độ dự án</FormLabel>
          <FormLabel component='legend'>Thiết lập cách nhập tiến độ mặc định khi tạo công việc mới của dự án</FormLabel>
          <RadioGroup aria-label='progress' name='progress' value={progress} onChange={evt => setProgress(parseInt(evt.target.value))}>
            <FormControlLabel value={0} control={<Radio color={'primary'}/>} label={<React.Fragment>Ngày và giờ (nhập đầy đủ ngày và giờ) <small>(mặc định)</small></React.Fragment>} />
            <FormControlLabel value={1} control={<Radio color={'primary'}/>} label='Chỉ nhập ngày (không nhập giờ bắt đầu và kết thúc)' />
            <FormControlLabel value={2} control={<Radio color={'primary'}/>} label='Không yêu cầu (dành cho công việc không yêu cầu tiến độ)' />
          </RadioGroup>
        </StyledFormControl>
        <StyledFormControl component='fieldset'>
          <FormLabel component='legend'>Sao chép dự án</FormLabel>
          <RadioGroup aria-label='progress' name='progress' value={copy} onChange={evt => setCopy(parseInt(evt.target.value))}>
            <FormControlLabel value={0} control={<Radio color={'primary'}/>} label={<React.Fragment>Không được sao chép <small>(mặc định)</small></React.Fragment>} />
            <FormControlLabel value={1} control={<Radio color={'primary'}/>} label='Được sao chép' />
          </RadioGroup>
        </StyledFormControl>
      </CustomModal>
    </React.Fragment>
  )
}

export default ProjectSetting;
