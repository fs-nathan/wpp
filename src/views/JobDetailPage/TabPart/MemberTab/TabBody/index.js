import React from 'react';
import { List } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux';

import SearchInput from '../../../../../components/SearchInput';
import { searchMember } from '../../../../../actions/taskDetail/taskDetailActions';
import MemberListItem from './MemberListItem';

const members = [
  { id: 1, name: 'Trần Văn Nam', role: 'Giám đốc', projectRole: 'Admin', authorityList: ['Giao việc'] },
  { id: 2, name: 'Trần Văn Nam', projectRole: 'Quản lý', authorityList: ['Giao việc', 'Giám sát'] },
  { id: 3, name: 'Trần Văn Nam', role: 'Khác', projectRole: 'Admin', authorityList: ['Giao việc'] },
]

function TabBody() {
  const dispatch = useDispatch();
  const members = useSelector(state => state.taskDetail.taskMember.member);

  const searchMemberTabPart = (e) => {
    dispatch(searchMember(e.target.value));
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
              <MemberListItem key={element.id} {...element} />
            );
          })}
        </List>
      </div>
    </Scrollbars>
  )
}

export default TabBody;
