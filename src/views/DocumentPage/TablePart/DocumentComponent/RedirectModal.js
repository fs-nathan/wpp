import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import '../DocumentPage.scss';
import ModalCommon from './ModalCommon';
import { DialogContent } from './TableCommon';
import { Routes } from '../../../../constants/routes';

const RedirectModal = props => {
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <ModalCommon title="Tải tài liệu" onClose={props.onClose} footerAction={[]}>
      <DialogContent dividers className="dialog-content redirect-modal">
        <p className="redirect-text">
          Chọn một thư mục trong nhóm <b>Tài liệu của tôi</b> để lưu trữ trước
          khi tải tài liệu lên
        </p>
        <Button
          variant="outlined"
          className="redirect-btn"
          onClick={() => {
            props.history.push(Routes.DOCUMENT_ME);
            props.onClose();
          }}
          style={{
            background: bgColor.color,
            borderColor: bgColor.color,
            color: '#fff'
          }}
        >
          Đi đến Tài liệu của tôi
        </Button>
      </DialogContent>
    </ModalCommon>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(withRouter(RedirectModal));
