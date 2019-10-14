import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login, loginCheckState } from '../actions/authentications';
import routes from '../routes';
import logo from '../assets/logo.png';
import LeftBar from '../views/LeftBar';
import TopBar from '../views/TopBar';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 55px 1fr;
  grid-template-columns: 80px minmax(0, 1fr);
  grid-template-areas:
    "logo top"
    "left main";
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
  overflow-y: auto;
  &::-webkit-scrollbar-track{
    background-color: unset !important;
  }
  &::-webkit-scrollbar{
    width: 10px;
    background-color: unset !important;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 5px;
    cursor: pointer !important;
    min-height: 50px !important;
    &:hover {
      background-color: #4a4a4a54;
    }
  }
  &:hover::-webkit-scrollbar-thumb{
    background-color: #88888854;
  }
`;

function MainLayout({ doLogin, doLoginCheckState }) {

  React.useEffect(() => {
    doLoginCheckState();
  }, [doLoginCheckState]);
  
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
    })
    return <Switch>{result}</Switch>;
  }
  
  return (
    <Container>
      <LogoBox to="/">
        <img
          src={logo}
          alt="vtask-logo-menu"
        />
      </LogoBox>
      <LeftBar />
      <TopBar />
      <ContentBox>
        {configRoute(routes)}
      </ContentBox>
    </Container>
  )
}

function MainLayoutWrapper({ ...rest }) {
  return (
    <Router>
      <MainLayout {...rest} />
    </Router>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    doLogin: ({ email, password }) => dispatch(login({ email, password })),
    doLoginCheckState: () => dispatch(loginCheckState()),
  };
};

export default connect(
  null, 
  mapDispatchToProps,
)(MainLayoutWrapper);
