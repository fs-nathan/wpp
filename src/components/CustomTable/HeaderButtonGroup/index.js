import { Button, ButtonGroup, CircularProgress, Grow, Menu, MenuItem, Popper } from '@material-ui/core';
import { mdiClose, mdiDotsVertical, mdiFullscreen, mdiFullscreenExit, mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { get, isNil } from 'lodash';
import React from 'react';
import SearchInput from '../../SearchInput';
import { CustomTableContext } from '../index';
import './style.scss';

const StyledButton = ({ className = '', ...rest }) =>
  <Button className={`comp_CustomTable_HeaderButtonGroup___button ${className}`} {...rest} />;

const StyledPopper = ({ className = '', ...rest }) =>
  <Popper className={`comp_CustomTable_HeaderButtonGroup___popper ${className}`} {...rest} />;

const SearchBox = ({ className = '', ...rest }) =>
  <div className={`comp_CustomTable_HeaderButtonGroup___search-box ${className}`} {...rest} />;

function HeaderButtonGroup() {

  const { options } = React.useContext(CustomTableContext);
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [moreAnchor, setMoreAnchor] = React.useState(null);

  function handleSearchClick(evt) {
    if (searchAnchor) {
      setSearchAnchor(null);
      get(options, 'search.onChange', () => null)('');
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
        {get(options, 'search') && (
          <StyledButton onClick={handleSearchClick}>
            <div>
              <Icon path={Boolean(searchAnchor) ? mdiClose : mdiMagnify} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>{Boolean(searchAnchor) ? 'Hủy' : 'Tìm kiếm'}</span>
          </StyledButton>
        )}
        {get(options, 'subActions', []).map((subAction, index) => isNil(subAction)
          ? null
          : (
            <StyledButton key={index} onClick={evt => {
              get(subAction, 'onClick', () => null)(evt);
              get(subAction, 'noExpand', false)
                && get(options, 'expand.bool', false)
                && get(options, 'expand.toggleExpand', () => null)();
            }}>
              <div>
                {get(subAction, 'iconPath') ? <Icon path={get(subAction, 'iconPath')} size={1} color={'rgba(0, 0, 0, 0.54)'} /> : get(subAction, 'icon', () => null)()}
              </div>
              <span>{get(subAction, 'label', '')}</span>
            </StyledButton>
          ))}
        {get(options, 'expand') && (
          <StyledButton onClick={get(options, 'expand.toggleExpand', () => null)}>
            <div>
              <Icon path={get(options, 'expand.bool', false) ? mdiFullscreenExit : mdiFullscreen} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>{get(options, 'expand.bool', false) ? 'Thu gọn' : 'Mở rộng'}</span>
          </StyledButton>
        )}
        {get(options, 'moreMenu') && (
          <StyledButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMoreOpen}>
            <div>
              <Icon path={mdiDotsVertical} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </div>
            <span>Thêm</span>
          </StyledButton>
        )}
      </ButtonGroup>
      {get(options, 'search') && (
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
                  value={get(options, 'search.patern', '')}
                  onChange={evt => get(options, 'search.onChange', () => null)(evt.target.value)}
                />
              </SearchBox>
            </Grow>
          )}
        </StyledPopper>
      )}
      {get(options, 'moreMenu') && (
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
          {get(options, 'moreMenu', []).map((item, index) => isNil(item) ? null : (
            <MenuItem
              key={index}
              onClick={handleMoreClick(get(item, 'onClick', () => null))}
              disabled={get(item, 'disabled', false)}
            >
              {get(item, 'disabled', false) &&
                <CircularProgress
                  size={16}
                  className="margin-circular"
                  color="white"
                />}
              {get(item, 'label', '')}
            </MenuItem>
          ))}
        </Menu>
      )}
    </React.Fragment>
  )
}

export default HeaderButtonGroup;
