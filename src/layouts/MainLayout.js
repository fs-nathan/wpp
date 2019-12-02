import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Routes } from '../constants/routes';
import { login, loginCheckState } from '../actions/authentications';
import routes from '../routes';
import logo from '../assets/logo.png';
import LeftBar from '../views/LeftBar';
import TopBar from '../views/TopBar';
import DrawerComponent from '../components/Drawer/Drawer';
import NoticeModal from '../components/NoticeModal/NoticeModal';

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

const LogoBox = styled(Link)`
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

function MainLayout({ doLogin, doLoginCheckState, location, colors }) {
  const isViewFullPage = route => {
    return (
      route === Routes.REGISTER ||
      route === Routes.LOGIN ||
      route === Routes.CONFIRM_REGISTRATION ||
      route === Routes.FORGOT_PASSWORD
    );
  };

  React.useEffect(() => {
    doLogin({
      email: 'ducpminh668@gmail.com',
      password: '12345678'
    });
  }, [doLogin]);

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

  const bgColor = colors.find(item => item.selected === true);
  return (
    <Container
      className={isViewFullPage(location.pathname) ? 'view-full-page' : ''}
    >
      {!isViewFullPage(location.pathname) && (
        <React.Fragment>
          <LogoBox to="/" style={{ background: bgColor.value }}>
            <img src={logo} alt="vtask-logo-menu" />
          </LogoBox>
          <LeftBar />
          <TopBar />
          <DrawerComponent />
          <NoticeModal />
        </React.Fragment>
      )}
      <ContentBox>{configRoute(routes)}</ContentBox>
    </Container>
  );
}

function MainLayoutWrapper({ ...rest }) {
  return <MainLayout {...rest} />;
}

const mapDispatchToProps = dispatch => {
  return {
    doLogin: ({ email, password }) => dispatch(login({ email, password })),
    doLoginCheckState: () => dispatch(loginCheckState())
  };
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  mapDispatchToProps
)(withRouter(MainLayoutWrapper));
