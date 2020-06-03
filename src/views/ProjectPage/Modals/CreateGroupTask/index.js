import { mdiContentCopy, mdiNotePlusOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { isNil } from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomModal from '../../../../components/CustomModal';
import CopyGroupTask from '../CopyGroupTask';
import CreateNewGroupTask from '../CreateNewGroupTask';
import './style.scss';

const Container = ({ className = '', ...props }) =>
  <div
    className={`view_Project_CreateGroup_Modal___container ${className}`}
    {...props}
  />;

const ButtonCase = ({ className = '', ...props }) =>
  <div
    className={`${className}`}
    {...props}
  />;

function CreateGroupTask({ open, setOpen, project_id = null }) {

  const [createNew, setCreateNew] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  return (
    <>
      <CustomModal
        title='Tạo nhóm công việc'
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        height='short'
        className={'view_Project_CreateGroup_Modal___modal'}
      >
        <Container>
          <ButtonCase
            className={'view_Project_CreateGroup_Modal___button-new'}
            onClick={evt => {
              setCreateNew(true);
              setCopy(false);
              setOpen(false);
            }}>
            <div>
              <Icon path={mdiNotePlusOutline} size={2} />
            </div>
            <div>
              <span>Tạo mới nhóm công việc</span>
              <span>Tạo mới hoàn toàn các thông số của nhóm công việc</span>
            </div>
          </ButtonCase>
          <ButtonCase
            className={'view_Project_CreateGroup_Modal___button-copy'}
            onClick={evt => {
              setCreateNew(false);
              setCopy(true);
              setOpen(false);
            }}>
            <div>
              <Icon path={mdiContentCopy} size={2} />
            </div>
            <div>
              <span>Sao chép nhóm công việc</span>
              <span>Sao chép các nhóm công việc có sẵn vào dự án</span>
            </div>
          </ButtonCase>
        </Container>
      </CustomModal>
      <CreateNewGroupTask open={createNew} setOpen={setCreateNew} project_id={projectId} />
      <CopyGroupTask open={copy} setOpen={setCopy} project_id={projectId} />
    </>
  )
}

export default CreateGroupTask;
