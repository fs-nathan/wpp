import React, { useEffect, useState, Fragment } from 'react';
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

// const temp = [
//   {
//     id: '5e0dd975e39b2bc4f9f0f4d2',
//     name: 'Gặp gỡ khách hàng, đàm phán ký kết hợp đồng thẩm tra chi tiết.',
//     project: 'Hầm chui đường Lê Lai Quận 1',
//     user_create_avatar:
//       'https://storage.googleapis.com/storage_vtask_net/2020/1578217550516-filename',
//     user_create_name: 'Thành Nguyễn',
//     state_code: 0,
//     state_name: 'Waiting'
//   }
// ];
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
        <a
          href={props.url_redirect_project}
          className="address-link"
          onClick={props.handleCloseModal}
        >
          {props.project}
        </a>
      </span>
      <div className="sub-description">
        <a
          href={props.url_redirect_task}
          className="address-link"
          onClick={props.handleCloseModal}
        >
          {props.name}
        </a>
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

  const { open } = props;
  return (
    <Dialog open={open} onClose={handleCloseModal} className="search-modal">
      <div className="content-wrapper">
        <div className="dialog-header">
          <InputBase
            id="searchTextId"
            className="search-box"
            placeholder="Nhập tên công việc và nhấn Enter để xem kết quả tìm kiếm"
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
                    Không tìm thấy "<b>{searchValue}</b>" trong danh sách công
                    việc!
                  </p>
                  <p>Đề xuất:</p>
                  <ul>
                    <li>Kiểm tra lại chính tả từ khóa đã nhập</li>
                    <li>Hãy thử những từ khóa khác</li>
                    <li>Hãy bớt từ khóa</li>
                  </ul>
                </div>
              ) : (
                <div className="empty-content-container">
                  <div className="image-contain">
                    <div>
                      <img src={images.search_empty} alt="search-empty" />{' '}
                    </div>
                  </div>

                  <p>Nhập tên công việc để tìm kiếm nhanh!</p>
                </div>
              )}
            </Fragment>
          ) : (
            resultList.map((item, idx) => (
              <ResultSearchItem
                key={idx}
                {...item}
                handleCloseModal={handleCloseModal}
              />
            ))
          )}
        </DialogContent>
        {!isEmpty(resultList) && (
          <DialogActions>
            <div className="num-search-result">
              Có {resultList.length} kết quả tìm kiếm phù hợp
            </div>
          </DialogActions>
        )}
      </div>
    </Dialog>
  );
};

export default SearchModal;
