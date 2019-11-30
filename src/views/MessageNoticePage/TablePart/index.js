import React from 'react';
// import { mdiUpload } from "@mdi/js";
import { withRouter } from 'react-router-dom';

import { isEmpty } from '../../../helpers/utils/isEmpty';
import ColorTypo from '../../../components/ColorTypo';
// import HeaderButtonGroup from "./HeaderButtonGroup";
// import ColorButton from "../../../components/ColorButton";
import { ListItemIcon } from '@material-ui/core';
// import SettingInfo from '../TablePart/SettingAccountRight/SettingInfo';
// import ChangePassword from '../TablePart/SettingAccountRight/ChangePassword';
// import TicketManager from '../TablePart/SettingAccountRight/TicketManager';
// import NotificationWorkPlus from '../TablePart/SettingAccountRight/NotificationWorkPlus';
// import NotificationWorkPlusDetail from '../TablePart/SettingAccountRight/NotificationWorkPlusDetail';
import '../Message.scss';
import MessageRight from './MessageRight';
import { MESSAGE } from '../../../constants/constants';

const TablePart = props => {
  const getContentSettingAccount = () => {
    const type = props.match.params.type;
    const search = props.location.search;
    switch (type) {
      case MESSAGE.ALL:
        return <MessageRight />;
      case MESSAGE.NEW:
        return <MessageRight />;
      case MESSAGE.NOTICE_ALL:
        return <MessageRight />;
      case MESSAGE.NOTICE_NEW:
        return <MessageRight />;
      default:
        return null;
    }
  };
  const getHeader = () => {
    const type = props.match.params.type;
    const search = props.location.search;
    switch (type) {
      case MESSAGE.ALL:
        return 'Tất cả tin nhắn';
      case MESSAGE.NEW:
        return 'Tin nhắn chưa đọc';
      case MESSAGE.NOTICE_ALL:
        return 'Tất cả thông báo';
      case MESSAGE.NOTICE_NEW:
        return 'Thông báo chưa đọc';
      default:
        return null;
    }
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ListItemIcon style={{ minWidth: 40 }}>
          <span className="star-icon">&#9733;</span>
        </ListItemIcon>
        <ColorTypo
          color="green"
          uppercase
          style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          {/* &#9733;  */}
          {getHeader()}
        </ColorTypo>
        {/* <RightHeader>
          <HeaderButtonGroup />
          <ColorButton
            size="small"
            variantColor="blue"
            variant="contained"
            startIcon={<Icon path={mdiUpload} size={1} color={"#fff"} />}
          >
            Tải lên
          </ColorButton>
          <StyledButton
            size="small"
            // onClick={() => this.handleClick(SETTING_GROUP.CREATE_ORDER)}
          >
            + TẠO ĐƠN HÀNG
          </StyledButton>
        </RightHeader> */}
      </div>
      {getContentSettingAccount()}
    </div>
  );
};

export default withRouter(TablePart);
