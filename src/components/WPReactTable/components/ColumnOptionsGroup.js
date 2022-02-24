import { Box, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { isArray } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ColumnOptionsList from "./ColumnOptionsList";

const ColumnOptionsGroup = ({
  projectId,
  taskId,
  defaultSelected = {},
  options = [],
  onEdit = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(defaultSelected);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleSelect = (item) => {
    setSelected(item);
    // dispatch(
    //   updateValueColumns(
    //     {
    //       task_id: taskId,
    //       field_id: idType,
    //       dataType,
    //       value: item._id,
    //     },
    //     () => {}
    //   )
    // );
  };

  const _renderSelected = () => {
    if (!selected?._id)
      return (
        <Typography className="default_tag" style={{ marginLeft: 5 }}>
          —
        </Typography>
      );

    return (
      <LabelColumnOption
        style={{ background: selected.color, maxWidth: "100%" }}
        onClick={handleClick}
      >
        {selected.name}
      </LabelColumnOption>
    );
  };

  return (
    <>
      <BoxColLabel onClick={handleClick}>
        {_renderSelected()}
        <KeyboardArrowDownIcon className="icon" xs={{ color: "#6d6e6f" }} />
      </BoxColLabel>
      <ColumnOptionsList
        selected={selected}
        anchorEl={anchorEl}
        options={options}
        isDisplayEditField={false}
        onClose={_handleClose}
        onSelect={_handleSelect}
      />
    </>
  );
};

const BoxColLabel = styled(Box)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  .default_tag,
  .icon {
    visibility: hidden;
  }
  &:hover {
    .default_tag,
    .icon {
      visibility: visible;
    }
  }
`;

const LabelColumnOption = styled.div`
  border-radius: 10px;
  box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: block;
  font-size: 12px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding: 0 8px;
  text-align: left;
  white-space: nowrap;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default ColumnOptionsGroup;
