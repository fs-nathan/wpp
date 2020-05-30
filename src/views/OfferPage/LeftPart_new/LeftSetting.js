// import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from "@material-ui/core";
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import Icon from "@mdi/react";
import classnames from "classnames";
import { Primary, StyledList, StyledListItem } from "components/CustomList";
import LeftSideContainer from "components/LeftSideContainer";
import React, { Fragment } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import SearchInput from '../../../components/SearchInput';
import DropdownItem from "../components/DropdownItem";
import { Routes } from "../contants/routes";
import { checkUserIsInOfferGroupRoutes } from '../utils/validate';
import "./LeftSetting.css";

// import { isEmpty } from '../../helpers/utils/isEmpty';

const LeftSetting = props => {
  const { pathname } = props.location;
  const history = useHistory()
  const checkBeforeShowLeftIcon = () => {
    const validPathname = [Routes.OVERVIEW, Routes.RECENTLY]
    if (validPathname.includes(pathname)) {
      return false
    }
    return true
  }
  const checkBeforeShowRightIcon = () => {
    return props.isOfferGroupManageable && checkUserIsInOfferGroupRoutes(window.location.pathname)
  }
  return (
    <LeftSideContainer
      title={props.title}
      leftAction={checkBeforeShowLeftIcon() && {
        iconPath: mdiChevronLeft,
        tooltip: 'Quay lại',
        onClick: () => history.push(Routes.OVERVIEW)
      }}
      rightAction={checkBeforeShowRightIcon() && {
        iconPath: mdiPlus,
        onClick: () => props.setOpenModalOfferByGroup(true)
      }}

    >
      <StyledList>
        {props.searchInput && (
          <StyledListItem>
            <SearchInput placeholder={props.searchPlaceHolder} onChange={(e) => props.filter(e.target.value)} />
          </StyledListItem>
        )}
        {
          props.subMenu && props.listMenu.map((item, index) => (
            <Fragment>
              <DropdownItem name={item.title} subMenu={item.projects} />
            </Fragment>
          ))
        }
        {!props.subMenu && props.listMenu.map((item, index) => (
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
                    className={`title-setting-item ${
                      item.icon ? "" : "none-icon"
                      }`}
                  >
                    {item.title}
                  </Primary>
                }
                secondary={item.subtitle}
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
