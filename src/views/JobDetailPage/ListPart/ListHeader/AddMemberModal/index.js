import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMember } from 'actions/taskDetail/taskDetailActions';
import DialogWrap from 'components/DialogWrap';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProjectMember from './ProjectMember';
import TableMember from './TableMember';


const GridArea = styled(Typography)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #e0e0e0;
`
const ButtonAddAll = styled(Button)`
    color: #417cbf;
    margin: 10px 5px;
`

const BorderGrid = styled(Typography)`
    border-right: 1px solid #e0e0e0;
    min-height: 660px;
`
const FlexMemberProject = styled(Typography)` 
    display: flex;
    justify-content: center;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`

const MemberProject = styled(Typography)`
    margin-bottom: 5px;
    color: #686868;
    font-size: 16px;
    text-transform: uppercase;
`
const FlexJobMember = styled(Typography)`
    display: flex;
    align-items: center
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
    padding-left: 25px;
`

function AddMemberModal({ setOpen, isOpen }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const memberNotAssigned = useSelector(state => state.taskDetail.taskMember.memberNotAssigned);

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
      title={t('LABEL_CHAT_TASK_THANH_VIEN_CONG_VIEC')}
      isOpen={isOpen}
      handleClickClose={handleClose}
      successLabel={t('LABEL_CHAT_TASK_THOAT')}
      onClickSuccess={handleClose}
      maxWidth="xl"
      isOneButton
    >
      <React.Fragment>
        <GridArea component={'div'} style={{ borderBottom: 'none' }} >
          <BorderGrid component={'div'}>
            <FlexMemberProject component={'span'}>
              <MemberProject component={'div'} >{t('LABEL_CHAT_TASK_THANH_VIEN_DU_AN')}</MemberProject>
            </FlexMemberProject>
            <Typography component="span">
              <div style={{ margin: '10px 10px 0 10px' }}>
                <SearchInput placeholder={t('LABEL_CHAT_TASK_TIM_THANH_VIEN')} />
              </div>
              <ButtonAddAll
                onClick={handleAddAll}
              >
                {t('+ Thêm tất cả')}
              </ButtonAddAll>
              <div className="table-scroll-add-member">
                {
                  memberNotAssigned.map((item, key) =>
                    (
                      <ProjectMember avatar={item.avatar} key={item.id}
                        id={item.id}
                        name={item.name} email={item.email}
                        label={item.permission}
                      />
                    )
                  )}
              </div>
            </Typography>
          </BorderGrid>
          <Typography component="div">
            <FlexJobMember component="div">
              <MemberProject component={'div'}>{t('LABEL_CHAT_TASK_THANH_VIEN_CONG_VIEC')}</MemberProject>
            </FlexJobMember>
            <TableMember style={{ boxShadow: 'none' }} />
          </Typography>
        </GridArea>
      </React.Fragment>
    </DialogWrap>
  );
}

export default AddMemberModal;