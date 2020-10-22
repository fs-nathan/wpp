import React from 'react';
import CustomModal from 'components/CustomModal';
import TitleSectionModal from 'components/TitleSectionModal';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { CREATE_PROJECT_GROUP, CustomEventDispose, CustomEventListener, KANBAN } from 'constants/events.js';
import './style.scss';

const Title = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_EditTask___title ${className}`}
    {...props}
  />

const SubContainer = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_EditTask___sub-container ${className}`}
    {...props}
  />

const SubTitle = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_EditTask___sub-title ${className}`}
    {...props}
  />

const UserList = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_EditTask___user-list ${className}`}
    {...props}
  />

const User = ({ className = '', ...props }) =>
  <div 
    className={`view_KanbanPage_Modal_EditTask___user ${className}`}
    {...props}
  />

const assignOptions = [{
  label: 'Giao việc thủ công theo từng công việc (mặc định)',
  value: 0,
}, {
  label: 'Tự động giao việc cho thành viên sau',
  value: 1,
}, {
  label: 'Giữ nguyên người nhận việc giai đoạn trước',
  value: 2,
}];

const changeOptions = [{
  label: 'Không bắt buộc',
  value: 0,
}, {
  label: 'Phải hoàn thành toàn bộ công việc',
  value: 1,
}];

function EditTask({
  open, setOpen,
  task,
  handleUpdateData,
  doReload,
  projectId,
}) {

  const { t } = useTranslation();
  const [name, setName] = React.useState(get(task, 'name'));
  const [description, setDescription] = React.useState(get(task, 'description'));
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    setName(get(task, 'name'));
    setDescription(get(task, 'description'));
  }, [task]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(KANBAN.UPDATE_TASK.SUCCESS, doReload);
    CustomEventListener(KANBAN.UPDATE_TASK.FAIL, fail);
    return () => {
      CustomEventDispose(KANBAN.UPDATE_TASK.SUCCESS, doReload);
      CustomEventDispose(KANBAN.UPDATE_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [task, projectId]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(KANBAN.LIST_TASK.SUCCESS, success);
    CustomEventListener(KANBAN.LIST_TASK.FAIL, fail);
    return () => {
      CustomEventDispose(KANBAN.LIST_TASK.SUCCESS, success);
      CustomEventDispose(KANBAN.LIST_TASK.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [projectId]);

  return (
    <React.Fragment>
      <CustomModal
        title={t('LABEL_CHAT_TASK_CHINH_SUA_CONG_VIEC')}
        open={open}
        setOpen={setOpen}
        canConfirm={true}
        onConfirm={() => {
          handleUpdateData({
            name,
            description,
          });
          setActiveLoading(true);
        }}
        onCancle={() => setOpen(false)}
        loading={false}
        activeLoading={activeLoading}
        manualClose={true}
      >
        <TitleSectionModal label={t('LABEL_CHAT_TASK_TEN_CONG_VIEC')} isRequired />
        <TextField
          className="createJob--inputTextJob"
          margin="normal"
          variant="outlined"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
        />
        <TitleSectionModal label={t('LABEL_CHAT_TASK_MO_TA_CONG_VIEC')} />
        <TextField
          className="createJob--content"
          margin="normal"
          variant="outlined"
          multiline
          rows={3}
          rowsMax={18}
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={t('LABEL_CHAT_TASK_NHAP_NOI_DUNG')}
        />
      </CustomModal>
    </React.Fragment>
  )
}

export default EditTask;
