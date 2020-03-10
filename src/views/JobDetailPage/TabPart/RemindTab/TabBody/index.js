import React from 'react';
import styled from 'styled-components';

import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import SearchInput from '../../../../../components/SearchInput';
import { searchRemind } from '../../../../../actions/taskDetail/taskDetailActions';
import RemindList from './RemindList';

const Body = styled(Scrollbars)`
  grid-area: body;
  height: 100%;
`;

function TabBody(props) {
  const dispatch = useDispatch();
  const searchRemindTabPart = (e) => {
    dispatch(searchRemind(e.target.value))
  }
  return (
    <Body autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className="container-tabbody-remind">
        <SearchInput
          placeholder={'Nhập từ khóa'}
          fullWidth
          onChange={e => searchRemindTabPart(e)}
        />
        <RemindList {...props} />
      </div>
    </Body>
  )
}

export default TabBody;
