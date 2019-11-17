import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiNotePlusOutline, mdiContentCopy } from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import CreateNewProjectModal from '../CreateNewProject';
import CopyProjectModal from '../CopyProject';

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

function CreateProjectGroup({ open, setOpen, }) {

  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  return (
    <CustomModal
      title='Tạo dự án'
      open={open}
      setOpen={setOpen}
    >
      <Container>
        <ButtonCase onClick={evt => {
          setCreateNew(true);
          setCopy(false);
        }}>
          <div>
            <Icon path={mdiNotePlusOutline} size={2}/>
          </div>
          <div>
            <span>Tạo mới dự án</span>
            <span>Bắt đầu dự án bằng cách tạo mới hoàn toàn các thông số của dự án</span>
          </div>
        </ButtonCase>
        <ButtonCase onClick={evt => {
          setCreateNew(false);
          setCopy(true);
        }}>
          <div>
            <Icon path={mdiContentCopy} size={2}/>
          </div>
          <div>
            <span>Sao chép dự án</span>
            <span>Tạo dự án mới bằng cách sao chép các thông số của dự án cũ như: Danh mục công việc, tiến độ, ...</span>
          </div>
        </ButtonCase>
      </Container>
      <CreateNewProjectModal open={createNew} setOpen={setCreateNew} />
      <CopyProjectModal open={copy} setOpen={setCopy} />
    </CustomModal>
  )
}

export default CreateProjectGroup;
