import React from 'react';
import { InputBase } from '@material-ui/core';
import styled from 'styled-components';
import searchIcon from '../../assets/search-icon.jpg';

const SearchBoxBase = styled(InputBase)`
  padding: .275rem .75rem .275rem 2.5rem;
  font-weight: 400;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: 9px;
  border-radius: 999px;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  &:focus-within {
    color: #495057;
    background-color: #fff;
    border-color: #31b586;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(49, 181, 134, .25);
  }
`;

function SearchBox({ ...rest }) {
  return (
    <SearchBoxBase 
      {...rest}
    />
  )
}

export default SearchBox;
