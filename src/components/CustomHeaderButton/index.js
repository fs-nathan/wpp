import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from '@material-ui/core';
import { mdiMagnify, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import SearchInput from '../SearchInput';
import './HeaderButton.scss';
import { actionChangeSearchText } from '../../actions/documents';

const CustomHeaderButton = props => {
  const { t } = useTranslation();
  const [isSearch, setSearch] = useState(false);
  const { pathname } = props.location;
  const handleChangeSearch = ({ target: { value } }) => {
    props.actionChangeSearchText(value);
  };
  const closeSearch = () => {
    props.actionChangeSearchText(null);
  };
  useEffect(() => {
    return () => setSearch(false);
  }, [pathname]);
  return (
    <React.Fragment>
      <div className={`search-container ${isSearch ? 'show-input' : ''}`}>
        {isSearch && (
          <SearchInput
            placeholder={t('IDS_WP_INPUT_SEARCH')}
            onChange={handleChangeSearch}
          />
        )}
      </div>
      <ButtonGroup size="small" variant="text">
        {props.listAction.map((el, index) => {
          if (el.isShow) {
            if (el.type === 'search') {
              return (
                <Button
                  disableRipple
                  disableTouchRipple
                  disabled={el.disabled}
                  key={index}
                  onClick={() => {
                    setSearch(!isSearch);
                    if (isSearch) closeSearch();
                  }}
                  className="header-button-custom"
                >
                  <div>
                    <Icon
                      path={isSearch ? mdiClose : mdiMagnify}
                      size={1}
                      color="rgba(0, 0, 0, 0.54)"
                    />
                  </div>
                  <span>
                    {isSearch ? t('IDS_WP_CANCEL') : t('IDS_WP_SEARCH')}
                  </span>
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

export default connect(state => ({}), {
  actionChangeSearchText
})(withRouter(CustomHeaderButton));
