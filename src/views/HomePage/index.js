import React from "react";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { groupDetailAttrs } from "./contant/attrs";
import { GroupDetailProvider } from "./GroupDetailContext";
import Left from "./Left";
import Logo from "./Logo";
import Middle from "./Middle";
import Right from "./Right";
import "./style.scss";

function HomePage({ groupDetail }) {
  const [
    id,
    name,
    code,
    description,
    sologan,
    address,
    website,
    phone,
    email,
    number_member,
    logo,
    cover,
  ] = createMapPropsFromAttrs([
    groupDetailAttrs.id,
    groupDetailAttrs.name,
    groupDetailAttrs.code,
    groupDetailAttrs.description,
    groupDetailAttrs.sologan,
    groupDetailAttrs.address,
    groupDetailAttrs.website,
    groupDetailAttrs.phone,
    groupDetailAttrs.email,
    groupDetailAttrs.number_member,
    groupDetailAttrs.logo,
    groupDetailAttrs.cover,
  ])(groupDetail);
  return (
    <GroupDetailProvider
      value={{
        id,
        name,
        code,
        description,
        sologan,
        address,
        website,
        phone,
        email,
        number_member,
        logo,
        cover,
      }}
    >
      <Route
        path="/"
        render={({ match: { url } }) => (
          <>
            <Route
              path={`${url}`}
              exact
              render={(props) => (
                <Scrollbars autoHide autoHideTimeout={500}>
                  <div className="views_HomePage___wrapper">
                    <div className="views_HomePage___container">
                      <div style={{ gridArea: "left" }}>
                        <Left />
                      </div>
                      <div style={{ gridArea: "logo" }}>
                        <Logo />
                      </div>
                      <div style={{ gridArea: "middle" }}>
                        <Middle />
                      </div>
                      <div style={{ gridArea: "right" }}>
                        <Right />
                      </div>
                    </div>
                  </div>
                </Scrollbars>
              )}
            />
          </>
        )}
      />
    </GroupDetailProvider>
  );
}

export default connect((state) => ({
  groupDetail: state.setting.groupDetail,
}))(HomePage);
