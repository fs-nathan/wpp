// import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from "@material-ui/core";
import Icon from "@mdi/react";
import classnames from "classnames";
import { Primary, Secondary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./LeftSetting.css";

const LeftSetting = props => {
  const { pathname } = props.location;
  return (
    <LeftSideContainer
      title={props.title}
      rightAction={null}
      leftAction={null}
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
              className={classnames(
                `${pathname === item.url ? "item-actived" : ""} ${
                item.url ? "" : "none-action"
                }`,
                item.className
              )}
            >
              {item.icon && (
                <Icon
                  className="left-setting-icon"
                  size={1.4}
                  path={item.icon}
                  color={item.color || "rgba(0, 0, 0, 0.54)"}
                />
              )}
              <ListItemText
                primary={
                  <Primary
                    className={`custom-title-setting-item ${
                      item.icon ? "" : "none-icon"
                      }`}
                  >
                    {item.title}
                  </Primary>
                }
                secondary={<Secondary className="calendar_type_secondary">{item.subtile}</Secondary>}
              />
              {item.rightIcon && item.rightIcon()}
            </StyledListItem>
            {item.sub &&
              item.sub.map((el, idx) => (
                <StyledListItem
                  to={el.url}
                  component={Link}
                  key={idx}
                  className={classnames(
                    `${pathname === el.url ? "item-actived" : ""}`,
                    el.className
                  )}
                >
                  <ListItemText
                    primary={
                      <Primary className="comp_CustomLeftSettingSubItem__label">
                        {el.name}
                      </Primary>
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
