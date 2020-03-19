import React from 'react';
import styled from 'styled-components';
import {
  List,
} from '@material-ui/core';
import SearchInput from '../../../../../components/SearchInput';
import { useDispatch } from 'react-redux';
import { searchLocation } from '../../../../../actions/taskDetail/taskDetailActions';
import CustomListItem from './CustomListItem';

const WrapList = styled(List)`
  & > div {
    padding: 0
  }
  & > li {
    padding: 5px 0;
    & > *:last-child {
      min-width: auto !important;
    }
  }
`

const LocationShareBox = () => {
  const dispatch = useDispatch();
  const searchLocationTabPart = (e) => {
    dispatch(searchLocation(e.target.value))
  }
  return (
    <React.Fragment>
      <SearchInput
        placeholder="Nhập từ khóa"
        fullWidth
        onChange={e => searchLocationTabPart(e)}
      />
      <WrapList subheader={<li />}>
        <CustomListItem />
      </WrapList>
    </React.Fragment>
  );
}

export default LocationShareBox