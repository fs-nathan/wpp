import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiUpload } from '@mdi/js';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';
import ColorTypo from '../../../components/ColorTypo';
import colorPal from '../../../helpers/colorPalette';
import HeaderButtonGroup from './HeaderButtonGroup';
import TableMain from './TableMain';
import { Routes } from '../../../constants/routes';
import RecentContent from './ContentDocumentPage/RecentContent'

const RightHeader = styled.div`
  margin-left: auto;
  & > *:last-child {
    margin-left: 20px;
  }
`;
const StyledButton = styled(Button)`
  background-color: ${colorPal['orange'][0]};
  color: #fff;
  &:hover {
    background-color: ${darken(colorPal['orange'][0], 0.1)};
  }
`;

const getHeaderText = type => {
  switch (type) {
    case Routes.DOCUMENT_RECENT:
      return 'Gần đây';
    case Routes.DOCUMENT_PROJECT:
      return 'Tài liệu dự án';
    case Routes.DOCUMENT_SHARE:
      return 'Đã chia sẻ';
    case Routes.DOCUMENT_SHARE_ME:
      return 'Được chia sẻ với tôi';
    case Routes.DOCUMENT_ME:
      return 'Tài liệu của tôi';
    case Routes.DOCUMENT_GOOGLE_DRIVE:
      return 'Google Drive';
    case Routes.DOCUMENT_TRASH:
      return 'Thùng rác';
    default:
      return null;
  }
};
const TablePart = props => {
  const pathname = props.history.location.pathname;
  const getContentDocument = () => {
    switch (pathname) {
      case Routes.DOCUMENT_RECENT:
        return <RecentContent {...props} />;
      case Routes.DOCUMENT_PROJECT:
        return <TableMain {...props} />;
      case Routes.DOCUMENT_SHARE:
        return <TableMain {...props} />;
      case Routes.DOCUMENT_SHARE_ME:
        return <TableMain {...props} />;
      case Routes.DOCUMENT_ME:
        return <TableMain {...props} />;
      case Routes.DOCUMENT_GOOGLE_DRIVE:
        return <TableMain {...props} />;
      case Routes.DOCUMENT_TRASH:
        return <TableMain {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">
          {getHeaderText(pathname)}
        </ColorTypo>
        <RightHeader>
          <HeaderButtonGroup />
          <StyledButton
            size="small"
            onClick={() =>
              props.history.push({
                pathname: Routes.SETTING_GROUP_ORDER,
                search: `?createOder`
              })
            }
          >
            <Icon path={mdiUpload} size={1} color={'#fff'} />
            TẢI LÊN
          </StyledButton>
        </RightHeader>
      </div>
      <div className="setting-right-content">{getContentDocument()}</div>
    </div>
  );
};

export default withRouter(TablePart);
