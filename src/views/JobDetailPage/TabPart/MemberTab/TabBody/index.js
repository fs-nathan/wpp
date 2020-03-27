import { List } from '@material-ui/core';
import { searchMember } from 'actions/taskDetail/taskDetailActions';
import SearchInput from 'components/SearchInput';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import AddMemberModal from 'views/JobDetailPage/ListPart/ListHeader/AddMemberModal';
import MemberListItem from './MemberListItem';
import './styles.scss';

function TabBody() {
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member);
  const [open, setOpen] = React.useState(false);

  const searchMemberTabPart = (e) => {
    dispatch(searchMember(e.target.value));
  }
  function handleClickPermission() {
    console.log('handleClickPermission')
    setOpen(true)
  }
  return (
    <Scrollbars className="memberTabBody" autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-member-tabbody">
        <SearchInput
          placeholder={'Nhập từ khóa'}
          fullWidth
          onChange={e => searchMemberTabPart(e)}
        />
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
