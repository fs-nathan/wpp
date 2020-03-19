import React from 'react';
import SearchInput from '../../../../../components/SearchInput';
import { useDispatch } from 'react-redux';

import { searchLink, } from '../../../../../actions/taskDetail/taskDetailActions';
import LinkBox from './LinkBox';

const LinkContainer = (props) => {
  const dispatch = useDispatch();
  const searchLinkTabPart = (e) => {
    dispatch(searchLink(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        fullWidth
        placeholder='Nhập từ khóa link'
        onChange={e => searchLinkTabPart(e)}
      />
      <LinkBox {...props} />
    </React.Fragment>
  );
}

export default LinkContainer;