import { List } from '@material-ui/core';
import { getMember, getMemberNotAssigned, searchMember } from 'actions/taskDetail/taskDetailActions';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import MemberListItem from './MemberListItem';
import './styles.scss';

function TabBody() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const [open, setOpen] = React.useState(false);

  const searchMemberTabPart = (e) => {
    dispatch(searchMember(e.target.value));
  }
  function handleClickPermission() {
    setOpen(true);
    dispatch(getMember({ task_id: taskId }));
    dispatch(getMemberNotAssigned({ task_id: taskId }));
  }
  return (
    <Scrollbars className="memberTabBody"
      renderView={props => <div {...props} className="memberTabBody--container" />}
      autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-member-tabbody">
        <div
          className="memberTabBody--search"
        >
          <SearchInput
            placeholder={t('LABEL_CHAT_TASK_NHAP_TU_KHOA')}
            fullWidth
            onChange={e => searchMemberTabPart(e)}
          />
        </div>
        <List>
          {members.map((element, index) => {
            return (
              <MemberListItem key={element.id} {...element} handleClickPermission={handleClickPermission} />
            );
          })}
        </List>
        <AddMemberModal isOpen={open} setOpen={setOpen} />
      </div>
    </Scrollbars>
  )
}

export default TabBody;
