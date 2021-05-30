import React, { Fragment } from "react";
import Icon from "@mdi/react";
import { withRouter, Link, useHistory } from "react-router-dom";
import "./LeftSetting.scss";
import { Button, ListItemText } from "@material-ui/core";
import { StyledList, StyledListItem, Primary, Secondary } from "../CustomList";
import LeftSideContainer from "../LeftSideContainer";
import {get} from "lodash";
import {Routes} from 'constants/routes';
import { mdiImageFilterDrama } from "@mdi/js";
import { useTranslation } from "react-i18next";
import {
  getInfoPromotionCreateOrder
} from 'actions/setting/setting';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

const LeftSetting = props => {
  const { pathname } = props.location;
  const {t} = useTranslation();
  const history = useHistory();
  const [numberPromotionCode, setNumberPromotionCode] = React.useState(0)
  const {color} = props?.colors && props?.colors?.find((item) => item?.selected === true) || '';
  let isManage = false;
  if(Array.isArray(props?.profile?.modules)){
    // eslint-disable-next-line no-unused-expressions
    props?.profile?.modules?.forEach((el,index)=> {
      if(el?.is_manage_group){
        isManage = true;
      }
    })
  }
  React.useEffect(() => {
    fetPromotionCode(); // eslint-disable-next-line
  }, []);
  const fetPromotionCode = async params => {
    try {
      const { data } = await getInfoPromotionCreateOrder(params);
      setNumberPromotionCode(data.data.length);
    } catch (error) {}
  };

  
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
                  {
                    el.noti && numberPromotionCode && <div className="noti-promotion">
                      <CardGiftcardIcon className="step-icon" />
                      <span className="step-number">{numberPromotionCode}</span>
                    </div>
                  }
                </StyledListItem>
              ))}
          </Fragment>
        ))}
        {props.isMemory &&
        <div className="status-memory">
          <div className="status-memory__title">
            <Icon path={mdiImageFilterDrama} size={1.4}
                  color="rgba(0, 0, 0, 0.54)"/>
            <div className="status-memory__title-text">{t('LABEL_MEMMORY')}</div>      
          </div>
          <div style={{height: '5px', marginTop: '15px', borderRadius: '15px',position: 'relative',backgroundColor: '#ccc'}}>
          <div style={{height: '5px', borderRadius: '15px',position: 'absolute',top: '0', left: '0', backgroundColor: color, width: `${props?.profile?.storage?.used_size/props?.profile?.storage?.total_size*100}%`}}></div>
          </div>
          

          <div className="status-memory__note">{t('LABEL_STATUS_STORE_MEMORY',{use_store: props?.profile?.storage?.used_size_label, total_store: props?.profile?.storage?.total_size_label})}</div>
          {isManage && <Button onClick={()=>history.push(`${Routes.SETTING_GROUP_CREATE_ORDER}`)} style={{color: color}}>{t('LABEL_BTN_STORE_MEMORY')}</Button>}
        </div>
        }
      </StyledList>
    </LeftSideContainer>
  );
};

export default withRouter(LeftSetting);
