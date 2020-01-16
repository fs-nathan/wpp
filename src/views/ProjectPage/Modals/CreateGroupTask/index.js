import React from 'react';
import Icon from '@mdi/react';
import { mdiNotePlusOutline, mdiContentCopy } from '@mdi/js';
import CustomModal from '../../../../components/CustomModal';
import CreateNewGroupTask from '../CreateNewGroupTask';
import CopyGroupTask from '../CopyGroupTask';
import './style.scss';

const Container = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_CreateGroup_Modal___container ${className}`}
    {...props}
  />;

const ButtonCase = ({ className = '', ...props }) => 
  <div 
    className={`view_Project_CreateGroup_Modal___button ${className}`}
    {...props}
  />;

function CreateGroupTask({ open, setOpen, }) {

  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  return (
    <>
    <CustomModal
      title='Tạo nhóm công việc'
      open={open}
      setOpen={setOpen}
      confirmRender={null}
      height='short'
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
    <CopyGroupTask open={copy} setOpen={setCopy} />
    </>
  )
}

export default CreateGroupTask;
