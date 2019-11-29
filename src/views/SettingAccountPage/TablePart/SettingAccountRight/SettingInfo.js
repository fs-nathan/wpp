import React, { Component } from "react";
import { mdiAccountCircle } from "@mdi/js";
import Chip from "@material-ui/core/Chip";
import Icon from "@mdi/react";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import "./SettingAccountRight.scss";

class SettingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "view",
      data: {
        account: "huuthanhxd@gmail.com",
        name: "Nguyễn Hữu Thành",
        address: "Định Công, Hoàng Mai, Hà Nội",
        infoOther: "Không có",
        phone: "09818006181",
        career: "Kỹ sư",
        certificate: "Đại học",
        sex: "Nam",
        birthday: "15/08/2019"
      }
    };
  }
  handleChangeStatus = () => {
    if (this.state.mode === "view") {
      this.setState({ mode: "edit" });
    } else if (this.state.mode === "edit") {
      this.setState({ mode: "view" });
    }
  };
  handleChangeData = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };
  render() {
    const { mode, data } = this.state;
    console.log(data);
    return (
      <div className="setting-info">
        <div className="content-setting-info">
          <div className="avatar-content-setting-info">
            <div className="icon-avatar">
              <Icon path={mdiAccountCircle} size={10} color="#ededed" />
            </div>
            <div className="block-change-avatar">
              <span className="text-change-avatar">Đổi ảnh cá nhân</span>
            </div>
          </div>
          <div className="info-content-setting-info ">
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Tài khoản</span>
              <InputBase
                className="value-item-info email col-sm-9"
                value={data.account}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("account", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Loại tài khoản</span>
              <div className="value-item-info col-sm-9">
                <Chip size="small" label="Pro" className="type-account" />
              </div>
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Họ và tên</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.name}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("name", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Ngày sinh</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.birthday}
                disabled={mode !== "edit"}
                onChange={e =>
                  this.handleChangeData("birthday", e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Giới tính</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.sex}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("sex", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Điện thoại</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.phone}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("phone", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Địa chỉ</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.address}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("address", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Bằng cấp</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.certificate}
                disabled={mode !== "edit"}
                onChange={e =>
                  this.handleChangeData("certificate", e.target.value)
                }
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Ngành nghề</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.career}
                disabled={mode !== "edit"}
                onChange={e => this.handleChangeData("career", e.target.value)}
              />
            </div>
            <div className="item-info row">
              <span className="title-item-info col-sm-3">Thông tin khác</span>
              <InputBase
                className="value-item-info col-sm-9"
                value={data.infoOther}
                disabled={mode !== "edit"}
                onChange={e =>
                  this.handleChangeData("infoOther", e.target.value)
                }
              />
            </div>
            <div className="btn-edit-info">
              <Button
                variant="contained"
                className="btn-action"
                onClick={this.handleChangeStatus}
              >
                {mode === "view" ? "Cập nhập" : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingInfo;