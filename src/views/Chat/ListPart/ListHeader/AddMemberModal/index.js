import { DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { createMember } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';
import SearchInput from 'components/SearchInput';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProjectMember from './ProjectMember';
import './styles.scss';
import { currentColorSelector } from 'views/Chat/selectors';

const GridArea = styled(Typography)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    // border: 1px solid #e0e0e0;
`

const BorderGrid = styled(Typography)`
    border-right: 1px solid #e0e0e0;
    // min-height: 660px;
`
const FlexMemberProject = styled(Typography)` 
    display: flex;
    justify-content: center;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`

const FlexJobMember = styled(Typography)`
    display: flex;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`

function AddMemberModal({ setOpen, isOpen }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const memberNotAssigned = useSelector(state => state.taskDetail.taskMember.memberNotAssigned);
  const appColor = useSelector(currentColorSelector)

  const handleClose = () => {
    setOpen(false);
  };

  function handleAddAll() {
    memberNotAssigned.forEach(member => {
      dispatch(createMember({ task_id: taskId, member_id: member.id }))
    })
  }

  return (
    <DialogWrap
      title={t('LABEL_CHAT_TASK_THANH_VIEN')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClose}
      maxWidth="xl"
      isOneButton
      className="AddMemberModal add-member-to-group-chat-parent"
      scroll="body"
    >
      <DialogContent className="wrapper-member-modal">
          <div className="modal-add-member-to-group-chat">
            <div style={{ margin: '10px' }}>
              <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_THANH_VIEN')} />
            </div>
            <div className="table-scroll-add-member">
              <Scrollbars>
                {
                  memberNotAssigned.map((item, key) =>
                    (
                      <ProjectMember
                        appColor={appColor}
                        avatar={item.avatar}
                        key={item.id}
                        id={item.id}
                        name={item.name} email={item.email}
                        label={item.permission}
                      />
                    )
                  )}
              </Scrollbars>
            </div>
          </div>
      </DialogContent>
    </DialogWrap>
  );
}

export default AddMemberModal;