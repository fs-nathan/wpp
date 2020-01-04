import React, { Component } from 'react';
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

const ResultSearchItem = props => (
  <div className="search-result-item">
    {props.icon && (
      <img src={images.avatar_user} alt="" className="icon-avatar" />
    )}
    <div className="result-content">
      <span className="result-title">{props.title}</span>
      <div className="sub-description">{props.subDes}</div>
    </div>
    <div className="work-status">{props.workStatus}</div>
  </div>
);

class SearchModal extends Component {
  state = {
    resultList: [
      {
        icon: images.avatar_user,
        title: 'Xây dựng phương án kinh doanh cho dự án số 1',
        subDes: 'Công việc chung công ty',
        workStatus: 'Đang làm'
      },
      {
        icon: images.avatar_user,
        title: 'Xây dựng khu tổ hợp hành chính công an quận Hai Bà Trưng',
        subDes: 'Dự án vốn ngân sách',
        workStatus: 'Đang làm'
      }
    ]
  };

  handleCloseModal = () => {
    const { setOpen } = this.props;
    setOpen(false);
  };

  componentDidMount() {
    setTimeout(() => {
      const searchModal = document.querySelector('.search-modal');
      const dialogContainer = searchModal.querySelector('.MuiDialog-container');
      dialogContainer.style.display = 'block';

      const dialogContent = searchModal.querySelector('.MuiPaper-root');
      dialogContent.style.marginTop = `${this.props.marginTop}px`;
      dialogContent.style.marginLeft = `${this.props.marginLeft}px`;
      dialogContent.style.marginRight = `${this.props.marginLeft}px`;
      dialogContent.style.maxWidth = 'initial';
    }, 0);
  }

  render() {
    const { open } = this.props;
    const { resultList } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleCloseModal}
        className="search-modal"
      >
        <div className="content-wrapper">
          <div className="dialog-header">
            <InputBase
              id="searchTextId"
              className="search-box"
              placeholder="Nhập tên công việc..."
              autoFocus
              startAdornment={
                <InputAdornment position="start">
                  <Icon path={mdiMagnify} size={1.3} color="#8e8e8e" />
                </InputAdornment>
              }
            />
            <IconButton onClick={() => this.handleCloseModal()}>
              <Icon path={mdiClose} size={1} color={'rgba(0, 0, 0, 0.54)'} />
            </IconButton>
          </div>
          <DialogContent dividers>
            {resultList.map((item, idx) => (
              <ResultSearchItem key={idx} {...item} />
            ))}
          </DialogContent>
          <DialogActions>
            <div className="num-search-result">
              Có {resultList.length} kết quả tìm kiếm phù hợp
            </div>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

export default SearchModal;
