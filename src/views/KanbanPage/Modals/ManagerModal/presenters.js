import React from 'react';
import CustomModal from 'components/CustomModal';
import CustomAvatar from 'components/CustomAvatar';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import './style.scss';

const ManagerList = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_Manager___managers ${className}`}
    {...props}
  />

const ManagerItem = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_Manager___manager ${className}`}
    {...props}
  />

const ManagerDescription = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_Manager___manager-description ${className}`}
    {...props}
  />

function Manager({
  open, setOpen,
  managers,
  loading,
  name,
}) {

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <CustomModal
        className={'view_KanbanPage_Modal_Manager___manager-modal'}
        title={`${t('LABEL_CHAT_TASK_QUAN_LY')} ${name}`}
        open={open}
        setOpen={setOpen}
        confirmRender={null}
        cancleRender={() => t('LABEL_CHAT_TASK_DONG')}
        onCancle={() => setOpen(false)}
        loading={loading}
        activeLoading={false}
        manualClose={true}
      >
        <ManagerList>
          {managers.map(manager => (
            <ManagerItem key={get(manager, 'id')}>
              <CustomAvatar style={{ width: 40, height: 40 }} src={get(manager, 'avatar')} alt="manager" />
              <ManagerDescription>
                <span>{get(manager, 'name')}</span>
                <span>{get(manager, 'room')} - {get(manager, 'position')}</span>
              </ManagerDescription>
            </ManagerItem>
          ))}
        </ManagerList>
      </CustomModal>
    </React.Fragment>
  )
}

export default Manager;
