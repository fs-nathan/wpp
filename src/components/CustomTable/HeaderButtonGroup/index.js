import React from 'react';
import styled from 'styled-components';
import { 
  ButtonGroup, 
  Button, 
  Menu, 
  MenuItem,
  Popper, 
  Grow,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiMagnify,
  mdiClose,
  mdiDotsVertical,
  mdiFullscreen,
  mdiFullscreenExit,
} from '@mdi/js';
import { CustomTableContext } from '../index';
import SearchInput from '../../SearchInput';

const StyledButton = styled(Button)`
  && {
    padding: 4px;
    border-radius: 0;
  }
  &&:not(:last-child) {
    border-right: none;
  }
  &&:hover {
    background-color: #fff;
    & path {
      fill: #05b50c !important;
    }
    color: #05b50c;
  }
  && > span:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > span {
      margin-top: 5px;
      font-size: 12px;
    }
  }
  && > span:last-child {
    display: none;
  }
`;

const StyledPopper = styled(Popper)`
  z-index: 20;
`;

const SearchBox = styled.div`
  margin-right: 8px;
`;

function HeaderButtonGroup() {

  const { options } = React.useContext(CustomTableContext);
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [moreAnchor, setMoreAnchor] = React.useState(null);

  function handleSearchClick(evt) {
    if (searchAnchor) {
      setSearchAnchor(null);
      options.search.onChange('');
    } else {
      setSearchAnchor(evt.currentTarget);
    }
  }

  function handleMoreOpen(evt) {
    setMoreAnchor(evt.currentTarget);
  }

  function handleMoreClick(handler) {
    return evt => {
      setMoreAnchor(null);
      handler();
    }
  }

  function handleMoreClose() {
    setMoreAnchor(null);
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size='small'
        variant="text"
      >
        <StyledButton onClick={handleSearchClick}>
          <div>
            <Icon path={Boolean(searchAnchor) ? mdiClose : mdiMagnify} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
          </div>
          <span>{Boolean(searchAnchor) ? 'Hủy' : 'Tìm kiếm'}</span>
        </StyledButton>
        {options.subActions.map((subAction, index) => (
          <StyledButton key={index} onClick={subAction.onClick}>
            <div>
              <Icon path={subAction.iconPath} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
            </div>
            <span>{subAction.label}</span>
          </StyledButton>
        ))}
        <StyledButton onClick={options.expand.toggleExpand}>
          <div>
            <Icon path={options.expand.bool ? mdiFullscreenExit : mdiFullscreen} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
          </div>
          <span>{options.expand.bool ? 'Thu gọn' : 'Mở rộng'}</span>
        </StyledButton>
        <StyledButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMoreOpen}>
          <div>
            <Icon path={mdiDotsVertical} size={1} color={'rgba(0, 0, 0, 0.54)'}/>
          </div>
          <span>Thêm</span>
        </StyledButton>
      </ButtonGroup>
      <StyledPopper 
        open={Boolean(searchAnchor)}
        anchorEl={searchAnchor}
        transition
        placement='left'
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={100}>
            <SearchBox>
              <SearchInput 
                placeholder='Nhập nội dung cần tìm'
                value={options.search.patern}
                onChange={evt => options.search.onChange(evt.target.value)}
              />
            </SearchBox>
          </Grow>
        )}
      </StyledPopper>
      <Menu
        id="simple-menu"
        anchorEl={moreAnchor}
        open={Boolean(moreAnchor)}
        onClose={handleMoreClose}
        transformOrigin={{
          vertical: -30,
          horizontal: 'right',
        }}
      >
        {options.moreMenu.map((item, index) => (
          <MenuItem key={index} onClick={handleMoreClick(item.onClick)}>{item.label}</MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default HeaderButtonGroup;
