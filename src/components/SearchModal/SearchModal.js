import React, { useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  InputAdornment,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiMagnify, mdiClose } from '@mdi/js';
import './SearchModal.scss';
import * as images from '../../assets';
import { isEmpty } from '../../helpers/utils/isEmpty';
import { actionSearchTask } from '../../actions/system/system';

let searchValue = '';
const getStateColor = status => {
  if (status === 'Expired') return 'rgb(247, 67, 54)';
  else if (status === 'Waiting') return 'rgb(255, 152, 0)';
  else if (status === 'Implementing') return 'rgb(3, 169, 244)';
  else if (status === 'Success') return 'rgb(3, 195, 11)';
  else return 'rgb(3, 169, 244)';
};
const ResultSearchItem = props => (
  <div className="search-result-item">
    {props.user_create_avatar && (
      <img src={props.user_create_avatar} alt="" className="icon-avatar" />
    )}
    <div className="result-content">
      <span className="result-title">
        <p
          className="address-link"
          onClick={() => {
            props.handleRedirect(props.url_redirect_task);
            props.handleCloseModal();
          }}
        >
          {props.name}
        </p>
      </span>
      <div className="sub-description">
        <p
          className="address-link"
          onClick={() => {
            props.handleRedirect(props.url_redirect_project);
            props.handleCloseModal();
          }}
        >
          {props.project}
        </p>
      </div>
    </div>
    <div
      className="work-status"
      style={{ color: getStateColor(props.state_name) }}
    >
      {props.state_name}
    </div>
  </div>
);

const SearchModal = props => {
  const { t } = useTranslation();
  const [resultList, setResultList] = useState([]);
  const [isEmptyResult, setResult] = useState(false);
  const handleCloseModal = () => {
    const { setOpen } = props;
    setOpen(false);
    setResultList([]);
    setResult(false);
    searchValue = '';
  };

  useEffect(() => {
    setTimeout(() => {
      const searchModal = document.querySelector('.search-modal');
      const dialogContainer = searchModal.querySelector('.MuiDialog-container');
      dialogContainer.style.display = 'block';

      const dialogContent = searchModal.querySelector('.MuiPaper-root');
      dialogContent.style.marginTop = `${props.marginTop}px`;
      dialogContent.style.marginLeft = `${props.marginLeft}px`;
      dialogContent.style.marginRight = `${props.marginLeft}px`;
      dialogContent.style.maxWidth = 'initial';
    }, 0); // eslint-disable-next-line
  }, []);
  const handleSearch = async info => {
    searchValue = info;
    try {
      const { data } = await actionSearchTask(info);
      setResultList(data.tasks);
      setResult(isEmpty(data.tasks));
    } catch (error) {
      setResult(true);
    }
  };
  const handleRedirect = url => {
    props.history.push({ pathname: url });
  };
  const { open } = props;
  return (
    <Dialog open={open} onClose={handleCloseModal} className="search-modal">
      <div className="content-wrapper">
        <div className="dialog-header">
          <InputBase
            id="searchTextId"
            className="search-box"
            placeholder={t('IDS_WP_INPUT_JOB_DES')}
            autoFocus
            // onChange={e => handleSearch(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) handleSearch(e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <Icon path={mdiMagnify} size={1.3} color="#8e8e8e" />
              </InputAdornment>
            }
          />
          <IconButton onClick={() => handleCloseModal()}>
            <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
          </IconButton>
        </div>

        <DialogContent dividers>
          {isEmpty(resultList) ? (
            <Fragment>
              {isEmptyResult ? (
                <div className="empty-content-container empty-result">
                  <p>
                    {t('IDS_WP_NOT_FOUND')}&nbsp;"<b>{searchValue}</b>"&nbsp;
                    {t('IDS_WP_IN_JOB_LIST')}
                  </p>
                  <p>{t('IDS_WP_SUGGEST')}:</p>
                  <ul>
                    <li>{t('IDS_WP_RECHECK_INPUT_TEXT')}</li>
                    <li>{t('IDS_WP_TEST_WITH_OTHER_TEXT')}</li>
                    <li>{t('IDS_WP_REMOVE_TEXT')}</li>
                  </ul>
                </div>
              ) : (
                <div className="empty-content-container">
                  <div className="image-contain">
                    <div>
                      <img src={images.search_empty} alt="search-empty" />{' '}
                    </div>
                  </div>

                  <p>{t('IDS_WP_INPUT_JOB_FOR_SEARCH')}</p>
                </div>
              )}
            </Fragment>
          ) : (
            <div className="search-list-result">
              <Scrollbars autoHide autoHideTimeout={500}>
                <div className="result-item">
                  {resultList.map((item, idx) => (
                    <ResultSearchItem
                      key={idx}
                      {...item}
                      handleRedirect={handleRedirect}
                      handleCloseModal={handleCloseModal}
                    />
                  ))}
                </div>
              </Scrollbars>
            </div>
          )}
        </DialogContent>
        {!isEmpty(resultList) && (
          <DialogActions>
            <div className="num-search-result">
              {t('IDS_WP_HAVE')}&nbsp;{resultList.length}&nbsp;
              {t('IDS_WP_RESULT_SEARCH')}
            </div>
          </DialogActions>
        )}
      </div>
    </Dialog>
  );
};

export default withRouter(SearchModal);
