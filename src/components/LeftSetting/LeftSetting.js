import React, { Fragment } from "react";
import Icon from "@mdi/react";
import { withRouter, Link } from "react-router-dom";
import "./LeftSetting.scss";
import { ListItemText } from "@material-ui/core";
import { StyledList, StyledListItem, Primary, Secondary } from "../CustomList";
import LeftSideContainer from "../LeftSideContainer";
import {get} from "lodash";

const LeftSetting = props => {
  const { pathname } = props.location;
  return (
    <LeftSideContainer
      title={props.title}
      rightAction={{
        iconPath: props.iconTitle || null
      }}
    >
      <StyledList>
        {props.listMenu.map((item, index) => (
          <Fragment key={index}>
            <StyledListItem
              to={item.url || ""}
              component={Link}
              onClick={() => {
                if (item.action) item.action();
              }}
              className={`${(!get(item,"extract", false) && pathname === item.url) || get(item, "extract", false) && pathname.includes(item.url) ? "item-actived" : ""} ${
                item.url ? "" : "none-action"
              }`}
            >
              {item.icon && (
                <Icon
                  className="left-setting-icon"
                  path={item.icon}
                  size={1.4}
                  color={item.color || "rgba(0, 0, 0, 0.54)"}
                />
              )}
              <ListItemText
                primary={
                  <Primary
                    className={`title-setting-item ${
                      item.icon ? "" : "none-icon"
                    }`}
                    style={{fontSize: "14px"}}
                  >
                    {item.title}
                  </Primary>
                }
                secondary={<Secondary>{item.subtile}</Secondary>}
              />
              {item.rightIcon && item.rightIcon()}
            </StyledListItem>
            {item.sub &&
              item.sub.map((el, idx) => (
                <StyledListItem
                  to={el.url}
                  component={Link}
                  key={idx}
                  className={`${pathname === el.url ? "item-actived" : ""}`}
                >
                  <ListItemText
                    primary={
                      <Primary className="sub-setting-item">{el.name}</Primary>
                    }
                  />
                </StyledListItem>
              ))}
          </Fragment>
        ))}
      </StyledList>
    </LeftSideContainer>
  );
};

export default withRouter(LeftSetting);
