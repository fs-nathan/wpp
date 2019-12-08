import React, { useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { mdiMagnify, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../SearchInput';
import './HeaderButton.scss';

const CustomHeaderButton = props => {
  const [isSearch, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeSearch = e => {
    setSearchValue(e.target.value);
  };
  return (
    <React.Fragment>
      <ButtonGroup size="small" variant="text">
        <div className={`search-container ${isSearch ? 'show-input' : ''}`}>
          <SearchInput
            placeholder="Nhập nội dung cần tìm"
            value={searchValue}
            onChange={handleChangeSearch}
          />
        </div>

        {props.listAction.map((el, index) => {
          if (el.isShow) {
            if (el.type === 'search') {
              return (
                <Button
                  disableRipple
                  disableTouchRipple
                  disabled={el.disabled}
                  key={index}
                  onClick={() => setSearch(!isSearch)}
                  className="header-button-custom"
                >
                  <div>
                    <Icon
                      path={isSearch ? mdiClose : mdiMagnify}
                      size={1}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </div>
                  <span>{isSearch ? 'Hủy' : 'Tìm kiếm'}</span>
                </Button>
              );
            } else {
              return (
                <Button
                  disableRipple
                  disableTouchRipple
                  disabled={el.disabled}
                  onClick={() => {
                    if (el.action) el.action();
                  }}
                  key={index}
                  className="header-button-custom"
                >
                  <div>
                    <Icon path={el.icon} size={1} color="rgba(0, 0, 0, 0.54)" />
                  </div>
                  <span>{el.text}</span>
                </Button>
              );
            }
          }
          return null;
        })}
      </ButtonGroup>
    </React.Fragment>
  );
};

export default CustomHeaderButton;
