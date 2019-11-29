import React, { Component } from "react";
import { connect } from "react-redux";
import "./SettingGroupRight.scss";
import { SETTING_GROUP } from "../../../constants/constant";
import HeaderGroup from "./HeaderGroup";
import Info from "./Info";
import SetUp from "./SetUp";
import Order from "./Order";
import OrderDetail from "./OrderDetail";
import CreateOrder from "./CreateOrder";
import Payment from "./Payment";

class SettingGroupRight extends Component {
  getContentSettingGroup = () => {
    switch (this.props.settingGroupType) {
      case SETTING_GROUP.INFO:
        return <Info />;
      case SETTING_GROUP.SET_UP:
        return <SetUp />;
      case SETTING_GROUP.ORDER:
        return <Order />;
      case SETTING_GROUP.ORDER_DETAIL:
        return <OrderDetail />;
      case SETTING_GROUP.PAYMENT:
        return <Payment />;
      default:
        return <CreateOrder />;
    }
  };
  render() {
    return (
      <div className="SettingGroupPage">
        <HeaderGroup />
        <div className="setting-right-content">
          {this.getContentSettingGroup()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    settingGroupType: state.settingReducer.settingGroupType
  }),
  null
)(SettingGroupRight);
