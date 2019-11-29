import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NoticeModal.scss';
import * as icons from '../../assets';
import {
  openNoticeModal,
  closeNoticeModal,
  actionVisibleDrawerMessage
} from '../../actions/system/system';
// import { actionSettingGroup } from '../../../actions/setting';
import { DRAWER_TYPE } from '../../constants/constants';
import { Routes } from '../../constants/routes';

const NoticeModal = props => {
  // const [type, setType] = useState('intro'); // intro or expire (check follow account status)
  const type = 'intro';
  const closeNoticeModal = () => {
    props.closeNoticeModal();
  };
  const demoMode = () => {
    closeNoticeModal();
    props.history.push(Routes.HOME);
    props.actionVisibleDrawerMessage({
      type: DRAWER_TYPE.GROUP_ACCOUNT,
      anchor: 'top'
    });
  };
  const upgradeAccount = () => {
    closeNoticeModal();
    props.history.push({
      pathname: Routes.SETTING_GROUP_ORDER,
      search: `?createOder`
    });
  };
  const joinGroup = () => {
    closeNoticeModal();
  };
  const extendOrder = () => {
    closeNoticeModal();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      className="notice-modal-container"
      onClose={closeNoticeModal}
      aria-labelledby="customized-dialog-title"
      open={props.visibleNoticeModal}
      disableBackdropClick
    >
      <MuiDialogActions>
        <div className="notice-header">
          <img src={icons.logo} alt="logo" className="notice-logo" />
        </div>
        {type === 'intro' ? (
          <h2 className="notice-header-text">
            Nền tảng quản trị doanh nghiệp WorkPlus
          </h2>
        ) : (
          <h2 className="notice-header-text expire-text">
            Thông báo đơn hàng hết hạn!
          </h2>
        )}
        <p className="notice-text">Xin chào Nguyễn Hữu Thành!</p>
        {type === 'intro' ? (
          <p className="notice-text">
            Bạn đã đăng nhập thành công hệ thống quản trị doanh nghiệp trực
            tuyến Workplus với tài khoản miễn phí!
          </p>
        ) : (
          <p className="notice-text">
            Nhóm làm việc TDGroup tạm thời bị khóa do đơn hàng đã hết thời hạn
            sử dụng vào ngày 20/11/2019
            <p>
              Vui lòng gia hạn đơn hàng để tiếp tục sử dụng hệ thống Workplus.
            </p>
          </p>
        )}
        <p className="notice-text">Bạn hãy lựa chọn</p>
        {type === 'intro' ? (
          <div className="notice-btn-container">
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={demoMode}
            >
              Trải nghiệm demo
            </Button>
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={upgradeAccount}
            >
              Nâng cấp tài khoản
            </Button>
          </div>
        ) : (
          <div className="notice-btn-container">
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={joinGroup}
            >
              Tham gia nhóm khác
            </Button>
            <Button
              variant="outlined"
              className="notice-btn"
              onClick={extendOrder}
            >
              Gia hạn đơn hàng
            </Button>
          </div>
        )}

        <p className="notice-text-info">
          Hoặc liên hệ tới trung tâm trợ giúp của Workplus để được hỗ trợ!
        </p>
        <p className="notice-text-info">
          Hotline: 09.1800.6181 - Email: support@workplus.vn
        </p>
        <div className="notice-icon-container">
          <span className="notice-icon">
            <img src={icons.ic_zalo} alt="" />
            &nbsp; Zalo support
          </span>
          <span className="notice-icon">
            <img src={icons.ic_messeger} alt="" />
            &nbsp; Facebook support
          </span>
        </div>
      </MuiDialogActions>
    </Dialog>
  );
};

export default connect(
  state => ({
    visibleNoticeModal: state.system.visibleNoticeModal
  }),
  {
    openNoticeModal,
    closeNoticeModal,
    actionVisibleDrawerMessage
    // actionSettingGroup
  }
)(withRouter(NoticeModal));