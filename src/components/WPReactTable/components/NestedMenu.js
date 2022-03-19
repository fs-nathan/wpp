import { makeStyles, Menu, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyledMenuItem, StyledListItemIcon } from "./HeaderColumn";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    marginTop: ({ isFirstColumn }) => (isFirstColumn ? 0 : "5px"),
    display: ({ isAlignItem, hasChildrenItems }) =>
      isAlignItem && !hasChildrenItems ? "grid" : "flex",
    gridTemplateColumns: ({ isAlignItem, hasChildrenItems }) =>
      !isAlignItem && hasChildrenItems ? "unset" : "auto 1fr auto",
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    paddingRight: 6,
  },
  expandIcon: {
    fontSize: 12,
  },
}));

const NestedMenuItem = React.forwardRef(
  (
    {
      id: parentId,
      name: parentName,
      isActive = false,
      activeValue = null,
      isAlignItem = false,
      icon = null,
      activeKey = "value",
      childrenItems: parentChildrenItems = [],
      onClick = () => {},
      isFirstColumn = false,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isSubMenuOpen = Boolean(Boolean(anchorEl));
    const hasChildrenItems = parentChildrenItems?.length || false;
    const classes = useStyles({
      isSubMenuOpen,
      hasChildrenItems,
      isFirstColumn,
      isAlignItem,
    });
    const isLeafNode = !hasChildrenItems;

    const handleMouseEnter = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = (event) => {
      event.stopPropagation();
      if (isLeafNode) {
        onClick(parentId);
      }
    };

    console.log("@Pham_Tinh_Console:", isAlignItem);

    return (
      <StyledMenuItem
        ref={ref}
        className={classes.menuItem}
        style={{
          justifyContent: !hasChildrenItems ? "start" : "space-between",
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleClose}
      >
        {!isAlignItem && !!isLeafNode && (
          <StyledListItemIcon>
            {isActive && <CheckRoundedIcon />}
          </StyledListItemIcon>
        )}

        {isAlignItem && !hasChildrenItems && (
          <StyledListItemIcon style={{ marginRight: 5 }}>
            {icon}
          </StyledListItemIcon>
        )}
        <Typography textAlign="center">{t(parentName)}</Typography>

        {!hasChildrenItems && isAlignItem && (
          <StyledListItemIcon>
            {isActive && <CheckRoundedIcon />}
          </StyledListItemIcon>
        )}

        {hasChildrenItems && (
          <ArrowForwardIosIcon className={classes.expandIcon} />
        )}

        {hasChildrenItems && (
          <>
            <Menu
              style={{ pointerEvents: "none" }}
              anchorEl={anchorEl}
              open={isSubMenuOpen}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                elevation: 4,
              }}
            >
              {/* reset pointer event here so that the menu items could receive mouse events */}
              <div style={{ pointerEvents: "auto" }}>
                {parentChildrenItems.map((item) => {
                  const { id, name, children, icon } = item;
                  const isActive = item?.[activeKey] === activeValue;
                  return (
                    <NestedMenuItem
                      key={id}
                      id={id}
                      name={name}
                      icon={icon}
                      isActive={isActive}
                      childrenItems={children}
                      isAlignItem={isAlignItem}
                      onClick={onClick}
                    />
                  );
                })}
              </div>
            </Menu>
          </>
        )}
      </StyledMenuItem>
    );
  }
);

export default NestedMenuItem;
