// import { mdiDragVertical } from '@mdi/js';
import { ListItemText } from "@material-ui/core";
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import Icon from "@mdi/react";
import classnames from "classnames";
import { Primary, Secondary, StyledList, StyledListItem } from 'components/CustomList';
import LeftSideContainer from "components/LeftSideContainer";
import React, { Fragment, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link, useHistory, withRouter } from "react-router-dom";
import SearchInput from '../../../components/SearchInput';
import DropdownItem from "../components/DropdownItem";
import { Routes } from "../contants/routes";
import { checkUserIsInOfferGroupRoutes } from '../utils/validate';
import "./LeftSetting.scss";

const LeftSetting = props => {
  const { pathname } = props.location;
  const history = useHistory();
  const { t } = useTranslation();
  const [onHover, setOnHover] = useState({ id: null });
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
        tooltip: t("IDS_WP_BACK"),
        onClick: () => history.push(Routes.OVERVIEW)
      }}
      rightAction={checkBeforeShowRightIcon() && {
        iconPath: mdiPlus,
        onClick: () => props.setOpenModalOfferByGroup(true)
      }}

    >
      {
        props.searchInput && (
          <div className="leftSettings-searchInput">
            <SearchInput
              placeholder={props.searchPlaceHolder}
              onChange={(e) => props.filter(e.target.value)}
            />
          </div>
        )
      }
      <StyledList className="leftSettings-item-disableAutoFocus">
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
              onMouseEnter={() => setOnHover({ id: item.url })}
              onMouseLeave={() => setOnHover({ id: null })}
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
                secondary={<Secondary className="leftSettings-item-subtitle">{item.subtitle}</Secondary>}
              />
              {
                item.rightIconVisiableAlways ? item.rightIcon() : onHover.id === item.url && item.rightIcon ? item.rightIcon() : item.rightLabel && item.rightLabel()
              }
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
