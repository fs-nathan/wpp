import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchRemind } from '../../../../../actions/taskDetail/taskDetailActions';
import SearchInput from '../../../../../components/SearchInput';
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
    <Body autoHide
      renderView={props => <div {...props} className="remindBody--scroll" />}
      autoHideTimeout={500} autoHideDuration={200}>
      <div className="remindBody--container">
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
