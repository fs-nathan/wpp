import React from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import "./PopoverMenu.scss";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "center",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 180,
    marginLeft: "6.5vh",
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

export default function PopoverMenu(props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        variant={props.name}
        className={`menu-item ${props.isSelected ? "actived" : ""}`}
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // to={bottomList.url_redirect}
      >
        {!props?.component ? (
          <>
            <div className="menu-icon">
              {props.icon && <img src={props.icon.default} />}
            </div>
            <p>{t(props.name)}</p>
          </>
        ) : (
          <>
            <div className="menu-icon ">
              {/* {props.icon && <img src={props.icon.default} />} */}
              <span className="menu-icon-profile">
                {props?.profile?.name
                  ? props?.profile?.name.substring(0, 1)
                  : null}
              </span>
            </div>
            <p>{props?.profile?.name}</p>
          </>
        )}
      </div>

      {props.child_menu?.length > 0 ? (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {props.child_menu.map((item, index) => {
            return (
              <MenuItem key={index} onClick={handleClose} disableRipple>
                <div className="menu-icon-popover">
                  {item.url_icon && <img src={item.url_icon.default} />}
                </div>
                {item.name}
              </MenuItem>
            );
          })}
        </StyledMenu>
      ) : null}
    </div>
  );
}
