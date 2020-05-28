import React from 'react';
import { InputBase } from '@material-ui/core';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiMagnify,
} from '@mdi/js';

const Container = styled.div`
  width: 100%;
  position: relative;
  line-height: 1.3;
  height: 35px;
  & > svg:first-child {
    position: absolute;
    top: 7px;
    left: 7px;
    z-index: 10;
  }
`;

const SearchBoxBase = styled(InputBase)`
  position: relative;
  top: 0;
  left: 0;
  padding: .175rem .65rem .175rem 2.35rem;
  font-weight: 400;
  line-height: 1.3;
  height: 35px;
  background-clip: padding-box;
  background-color: #f6f6f6;
  border-radius: 999px;
  width: 100%;
`;

function SearchBox({ classes, className, onClickSearch, ...rest }) {
  return (
    <Container classes={classes} className={className}>
      <Icon path={mdiMagnify} size={1} color='rgba(0,0,0,.3)' onClick={onClickSearch} />
      <SearchBoxBase
        {...rest}
      />
    </Container>
  )
}

export default SearchBox;
