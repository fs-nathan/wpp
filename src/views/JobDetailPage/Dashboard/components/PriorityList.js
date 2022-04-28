import { Button, Menu, MenuItem } from "@material-ui/core";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const options = [
  { id: 0, name: "Thấp", value: 0, color: "#03C30B" },
  { id: 1, name: "Trung bình", value: 1, color: "#FF9800" },
  { id: 2, name: "Cao", value: 2, color: "#ff0000" },
];

const PriorityList = ({ projectId = null, defaultPriority = 0 }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(() =>
    options.find((item) => item.id === defaultPriority)
  );
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleSelect = async (idSelect) => {
    setSelected(() => options.find((item) => item.id === idSelect));
    handleClose();
  };

  return (
    <WrapperPriority>
      <ButtonDropdown
        className={classNames({ active: open })}
        onClick={handleClick}
      >
        <StatusDot color={selected.color} /> {selected.name}&nbsp;
        <KeyboardArrowDownRoundedIcon />
      </ButtonDropdown>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
            maxHeight: 250,
            marginTop: 45,
          },
        }}
      >
        {options.map((option) => (
          <StyledMenuItem
            key={option.id}
            onClick={() => _handleSelect(option.id)}
          >
            {option.id === selected.id && <CheckRoundedIcon />}{" "}
            <StatusDot color={option.color} /> {option.name}
          </StyledMenuItem>
        ))}
      </Menu>
    </WrapperPriority>
  );
};

const StatusDot = styled.div`
  border-radius: 6px;
  display: inline-block;
  flex: 0 0 auto;
  height: 12px;
  width: 12px;
  color-adjust: exact;
  margin-right: 6px;
  background: ${(props) => props.color};
`;

const WrapperPriority = styled.div`
  .MuiMenu-paper {
    margin-top: 150px !important;
  }
`;

const ButtonDropdown = styled(Button)`
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;
  border-radius: 6px;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow: hidden;
  transition-duration: 0.2s;
  transition-property: background, border, box-shadow, color, fill;
  user-select: none;
  white-space: nowrap;
  min-width: 120px;
  border: 0;
  color #1e1f21;

  svg{
    fill: #6d6e6f
  }

  .MuiButton-label { text-transform: none}

  &:hover,
  &:active,
  &.active {
    background: rgba(55, 23, 23, 0.03);
    border-color: transparent;
    color: #1e1f21;
    fill: #1e1f21;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  height: 35px;
  padding-left: 36px;
  svg {
    position: absolute;
    left: 0;
    fill: #6d6e6f;
    flex-shrink: 0;
    margin-left: 10px;
  }
`;

export default PriorityList;
