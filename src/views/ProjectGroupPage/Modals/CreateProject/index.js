import React from 'react';
import Icon from '@mdi/react';
import { mdiNotePlusOutline, mdiContentCopy } from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import CreateNewProjectModal from '../CreateNewProject';
import CopyProjectModal from '../CopyProject';
import './style.scss';

const Container = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Create_Project_Modal___container ${className}`}
    {...props}
  />;

const ButtonCase = ({ className = '', ...props }) => 
  <div 
    className={`view_ProjectGroup_Create_Project_Modal___button-case ${className}`}
    {...props}
  />;

function CreateProjectGroup({ open, setOpen, }) {

  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  return (
    <>
    <CustomModal
      title='Tạo dự án'
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
            <span>Tạo mới dự án</span>
            <span>Bắt đầu dự án bằng cách tạo mới hoàn toàn các thông số của dự án</span>
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
            <span>Sao chép dự án</span>
            <span>Tạo dự án mới bằng cách sao chép các thông số của dự án cũ như: Danh mục công việc, tiến độ, ...</span>
          </div>
        </ButtonCase>
      </Container>
    </CustomModal>
    <CreateNewProjectModal open={createNew} setOpen={setCreateNew} />
    <CopyProjectModal open={copy} setOpen={setCopy} />
    </>
  )
}

export default CreateProjectGroup;
