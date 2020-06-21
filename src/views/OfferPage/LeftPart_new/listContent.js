import { Box, ListItemText } from '@material-ui/core';
import { mdiDragVertical } from '@mdi/js';
import Icon from '@mdi/react';
import classnames from "classnames";
import { Primary, Secondary, StyledListItem } from 'components/CustomList';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link, withRouter } from "react-router-dom";
import DropdownItem from "../components/DropdownItem";
import "./LeftSetting.scss";

const ListContent = props => {
  const { pathname } = props.location;
  const [onHover, setOnHover] = React.useState({ id: null });
  return (
    <>
      {
        props.subMenu && props.listMenu.map((item, index) => (
          <Box>
            <DropdownItem name={item.title} subMenu={item.projects} />
          </Box>
        ))
      }
      {!props.subMenu && props.listMenu.map((item, index) => (
        <Box key={index}>
          {
            props.draggable ? (
              <Draggable
                draggableId={item.url}
                index={index}
              >
                {(provided) => (
                  <StyledListItem
                    component={Link}
                    to={item.url || ""}
                    innerRef={provided.innerRef}
                    {...provided.draggableProps}
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
                    {
                      onHover.id === item.url ?
                        (
                          <div {...provided.dragHandleProps}>
                            <Icon className="left-setting-icon dragg-icon" path={mdiDragVertical} size={1.4} color={'rgba(0, 0, 0, 0.54)'} />
                          </div>
                        )
                        :
                        (
                          <div {...provided.dragHandleProps}>
                            <Icon className="left-setting-icon" size={1.4} path={item.icon} color={item.color || "rgba(0, 0, 0, 0.54)"} />
                          </div>
                        )
                    }
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
                      onHover.id === item.url && item.rightIcon && item.rightIcon()
                    }
                  </StyledListItem>
                )}
              </Draggable>
            ) : (
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
                  {
                    item.icon && (<Icon className="left-setting-icon" size={1.4} path={item.icon} color={item.color || "rgba(0, 0, 0, 0.54)"} />)
                  }
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
                    onHover.id === item.url && item.rightIcon && item.rightIcon()
                  }
                </StyledListItem>
              )
          }
        </Box>
      ))}
    </>
  )
}
export default withRouter(ListContent);