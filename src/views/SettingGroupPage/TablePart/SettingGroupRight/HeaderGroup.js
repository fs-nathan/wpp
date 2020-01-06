import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiStar, mdiMagnify, mdiCart, mdiClose } from '@mdi/js';
import { Link } from 'react-router-dom';
import { SETTING_GROUP } from '../../../constants/constant';
import './SettingGroupRight.scss';
import { actionSettingGroup } from '../../../actions/setting';

const getTitleHeader = groupType => {
  switch (groupType) {
    case SETTING_GROUP.INFO:
      return 'Thông tin nhóm';
    case SETTING_GROUP.SET_UP:
      return 'Cài đặt';
    case SETTING_GROUP.ORDER:
      return 'Đơn hàng';
    case SETTING_GROUP.ORDER_DETAIL:
      return 'Chi tiết đơn hàng';
    case SETTING_GROUP.PAYMENT:
      return 'Thanh toán';
    default:
      return 'Tạo đơn hàng';
  }
};
class HeaderGroup extends Component {
  handleClick = type => {
    this.props.actionSettingGroup(type);
  };
  render() {
    const { settingGroupType } = this.props;
    return (
      <div className="SettingGroupHeader MainRight__action d-sm-flex justify-content-between align-items-center">
        <div className="ml-3 mb-2 message-title">
          <Icon path={mdiStar} size={1} color="#31b586" />
          <strong className="ml-2 text-green">
            {getTitleHeader(settingGroupType)}
          </strong>
        </div>
        {(settingGroupType === SETTING_GROUP.ORDER ||
          settingGroupType === SETTING_GROUP.CREATE_ORDER ||
          settingGroupType === SETTING_GROUP.PAYMENT) && (
          <div className="d-sm-flex align-items-center">
            <ul className="nav">
              {settingGroupType === SETTING_GROUP.ORDER && (
                <li className="nav-item">
                  <a
                    href="/"
                    className="d-block h-100 d-flex flex-column align-items-center justify-content-center"
                  >
                    <div>
                      <Icon path={mdiMagnify} size={1} />
                    </div>

                    <div className="mt-1">TÌM KIẾM</div>
                  </a>
                </li>
              )}
              <li className="nav-item">
                <Link
                  onClick={() => this.handleClick(SETTING_GROUP.ORDER)}
                  className="d-block h-100 d-flex flex-column align-items-center justify-content-center"
                >
                  <div>
                    <Icon path={mdiCart} size={1} />
                  </div>

                  <div className="mt-1">ĐƠN HÀNG</div>
                </Link>
              </li>
            </ul>
            <button
              className="btn btn-warning mr-3 right-header-button"
              onClick={() => this.handleClick(SETTING_GROUP.CREATE_ORDER)}
            >
              + TẠO ĐƠN HÀNG
            </button>
          </div>
        )}
        {settingGroupType === SETTING_GROUP.ORDER_DETAIL && (
          <span className="close-header">
            <Icon
              path={mdiClose}
              size={1}
              onClick={() => this.handleClick(SETTING_GROUP.ORDER)}
              title="Đóng"
            />
          </span>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    settingGroupType: state.settingReducer.settingGroupType
  }),
  { actionSettingGroup }
)(HeaderGroup);
