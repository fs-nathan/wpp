import React from 'react';
import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiPlusCircleOutline, mdiContentCopy } from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';

const Container = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ButtonCase = styled(ButtonBase)`
  width: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #555;
  border-radius: 18px;
  transition: border 0.15s ease-in-out;
  & > svg {
    fill: #555;
    transition: fill 0.15s ease-in-out;
  }
  & > span:not(:last-child) {
    margin-top: 16px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    color: #555;
    transition: color 0.15s ease-in-out;
  }
  & > span:last-child {
    display: none;
  }
  &:hover {
    border: 1px solid #05b50c;  
    & > svg {
      fill: #05b50c;
    }
    & > span:not(:last-child) {
      color: #05b50c;
    }
  }
`;

function CreateProjectGroup({ open, setOpen, }) {

  return (
    <CustomModal
      title='Tạo dự án'
      open={open}
      setOpen={setOpen}
    >
      <Container>
        <ButtonCase>
          <Icon path={mdiPlusCircleOutline} size={2}/>
          <span>Tạo mới dự án</span>
        </ButtonCase>
        <ButtonCase>
          <Icon path={mdiContentCopy} size={2}/>
          <span>Sao chép dự án</span>
        </ButtonCase>
      </Container>
    </CustomModal>
  )
}

export default CreateProjectGroup;
