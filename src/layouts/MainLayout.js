import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Routes } from '../constants/routes';
import { TOKEN } from '../constants/constants';
import routes from '../routes';
import { avatar_default_120 } from '../assets';
import LeftBar from '../views/LeftBar';
import TopBar from '../views/TopBar';
import SnackbarComponent from '../components/Snackbars';
import DrawerComponent from '../components/Drawer/Drawer';
import NoticeModal from '../components/NoticeModal/NoticeModal';
import GroupModal from '../components/NoticeModal/GroupModal';
import DocumentDetail from '../components/DocumentDetail/DocumentDetail';
import { actionFetchGroupDetail, actionFetchListColor } from '../actions/setting/setting';
import { actionToast } from '../actions/system/system';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 55px 1fr;
  grid-template-columns: 80px minmax(0, 1fr);
  grid-template-areas:
    'logo top'
    'left main';
  &.view-full-page {
    display: initial;
  }
`;

const LogoBox = styled.div`
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  height: 100%;
  & > img {
    height: 90%;
  }
`;

const ContentBox = styled.div`
  grid-area: main;
  overflow: hidden;
  &::-webkit-scrollbar-track {
    background-color: unset !important;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: unset !important;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    cursor: pointer !important;
    min-height: 50px !important;
    &:hover {
      background-color: #4a4a4a54;
    }
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #88888854;
  }
  && * {
    &::-webkit-scrollbar-track {
      background-color: unset !important;
    }
    &::-webkit-scrollbar {
      width: 5px;
      background-color: unset !important;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      cursor: pointer !important;
      min-height: 50px !important;
      &:hover {
        background-color: #4a4a4a54;
      }
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: #88888854;
    }
  }
`;

const Image = styled.img`
  height: 40px !important;
  width: 40px;
  background: #fff;
  border-radius: 50%;
  padding: 2px;
  margin-top: 10px;
`;

function MainLayout({
  location,
  colors,
  history,
  toast,
  actionToast,
  actionFetchGroupDetail,
  groupDetail,
  isDocumentDetail,
  actionFetchListColor
}) {
  const [visibleGroupModal, setVisibleGroupModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(TOKEN) && !isViewFullPage(location.pathname)) {
      actionFetchGroupDetail(true);
      actionFetchListColor()

    }
    // eslint-disable-next-line
  }, []);

  const isViewFullPage = route => {
    return (
      route === Routes.REGISTER ||
      route === Routes.LOGIN ||
      route === Routes.CONFIRM_REGISTRATION ||
      route === Routes.FORGOT_PASSWORD ||
      route === Routes.RESET_PASSWORD
    );
  };

  function configRoute(routes) {
    if (routes.length === 0) return;
    const result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      );
    });
    return <Switch>{result}</Switch>;
  }

  if (!localStorage.getItem(TOKEN) && !isViewFullPage(location.pathname)) {
    history.push(Routes.LOGIN);
  }

  const bgColor = colors.find(item => item.selected === true);
  return (
    <Container
      className={isViewFullPage(location.pathname) ? 'view-full-page' : ''}
    >
      {!isViewFullPage(location.pathname) && (
        <React.Fragment>
          <LogoBox
            onClick={() => setVisibleGroupModal(true)}
            style={{ background: bgColor.color }}
          >
            <Image
              src={groupDetail.logo || avatar_default_120}
              alt="vtask-logo-menu"
            />
          </LogoBox>
          <LeftBar />
          <TopBar />
          <DrawerComponent />
          <NoticeModal />
          {toast.type && (
            <SnackbarComponent
              open={true}
              handleClose={() => actionToast(null, '')}
              vertical="top"
              horizontal="center"
              variant={toast.type}
              message={toast.message}
            />
          )}
          {isDocumentDetail && <DocumentDetail />}
          {visibleGroupModal && (
            <GroupModal
              visibleGroupModal={visibleGroupModal}
              onClose={() => setVisibleGroupModal(false)}
            />
          )}
        </React.Fragment>
      )}
      <ContentBox>{configRoute(routes)}</ContentBox>
    </Container>
  );
}

function MainLayoutWrapper({ ...rest }) {
  return <MainLayout {...rest} />;
}

export default connect(
  state => ({
    colors: state.setting.colors,
    groupDetail: state.setting.groupDetail,
    isDocumentDetail: state.system.isDocumentDetail,
    toast: state.system.toast
  }),
  { actionFetchGroupDetail, actionToast, actionFetchListColor }
)(withRouter(MainLayoutWrapper));
