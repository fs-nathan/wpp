import React from 'react';
import { Select, MenuItem, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../../../../components/SearchInput';

const Header = styled.div`
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    margin-bottom: 5px;
  }
`;

const HeaderBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomSelect = styled(Select)`
  width: 100%;
  & > div:focus {
    background-color: #fff !important;
  }
  &::before, &:hover::before, &:focus::before {
    border-bottom: none !important;
  }
  &::after, &:hover::after, &:focus::after {
    border-bottom: none !important;
  }
`;

function ListHeaderSelect() {

  const [value, setValue] = React.useState(0);

  return (
    <CustomSelect value={value} onChange={evt => setValue(evt.target.value)}>
      <MenuItem value={0}>Job-1</MenuItem>
      <MenuItem value={1}>Job-2</MenuItem>
      <MenuItem value={2}>Job-3</MenuItem>
    </CustomSelect>
  )
}

function ListHeader() {
  return (
    <Header>
      <ListHeaderSelect />
      <HeaderBottomBox>
        <SearchInput placeholder='Tìm công việc trong dự án' />
        <IconButton>
          <Icon path={mdiPlus} size={1} />
        </IconButton>
      </HeaderBottomBox>
    </Header>
  )
}

export default ListHeader;
