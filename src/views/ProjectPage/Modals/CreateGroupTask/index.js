import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiNotePlusOutline, mdiContentCopy } from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import CreateNewGroupTask from '../CreateNewGroupTask';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ButtonCase = styled.div`
  margin-top: 32px;
  width: 80%;
  height: 100px;
  display: flex;
  align-items: center;
  border: 1px solid #555;
  border-radius: 8px;
  transition: border 0.15s ease-in-out;
  & > div:first-child {
    width: 20%;
    text-align: center;
    svg {
      fill: #555;
      transition: fill 0.15s ease-in-out;
    }
  }
  & > div:last-child {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 16px;
    & > span:first-child {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 500;
      color: #555;
      transition: color 0.15s ease-in-out;
    }
    & > span:last-child {
      margin-top: 16px;
      font-size: 14px;
      color: #555;
    }
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #05b50c;  
    & > div:first-child > svg {
      fill: #05b50c;
    }
    & > div:last-child > span:first-child {
      color: #05b50c;
    }
  }
`;

function CreateGroupTask({ open, setOpen, }) {

  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  return (
    <>
    <CustomModal
      title='Tạo nhóm công việc'
      open={open}
      setOpen={setOpen}
    >
      <Container>
        <ButtonCase onClick={evt => {
          setCreateNew(true);
          setCopy(false);
          setOpen(false);
        }}>
          <div>
            <Icon path={mdiNotePlusOutline} size={2}/>
          </div>
          <div>
            <span>Tạo mới nhóm công việc</span>
            <span>Tạo mới hoàn toàn các thông số của nhóm công việc</span>
          </div>
        </ButtonCase>
        <ButtonCase onClick={evt => {
          setCreateNew(false);
          setCopy(true);
          setOpen(false);
        }}>
          <div>
            <Icon path={mdiContentCopy} size={2}/>
          </div>
          <div>
            <span>Sao chép nhóm công việc</span>
            <span>Sao chép các nhóm công việc có sẵn vào dự án</span>
          </div>
        </ButtonCase>
      </Container>
    </CustomModal>
    <CreateNewGroupTask open={createNew} setOpen={setCreateNew} />
    </>
  )
}

export default CreateGroupTask;
