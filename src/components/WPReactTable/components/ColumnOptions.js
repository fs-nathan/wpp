import { Box, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { updateValueColumns } from "actions/columns/updateValueColumns";
import { isArray } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ColumnOptionsList from "./ColumnOptionsList";

const ColumnOptions = ({
  projectId,
  taskId,
  idType,
  nameType,
  dataType,
  optionsType = [],
  props,
  value,
  option_color,
  option_value,
  onEdit = () => {},
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState({
    name: value,
    color: option_color,
    _id: option_value,
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isArray(optionsType)) return;
    const newSelected = optionsType.find((item) => item._id === option_value);
    if (selected) setSelected(newSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option_value, optionsType]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleSelect = (item) => {
    setSelected(item);
    dispatch(
      updateValueColumns(
        {
          task_id: taskId,
          field_id: idType,
          dataType,
          value: item._id,
        },
        () => {}
      )
    );
  };

  const _handleOpenModalEdit = () => {
    onEdit(dataType, {
      idType,
      projectId,
      taskId,
      dataType,
      name: nameType,
      optionsType: optionsType || [],
    });
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
        options={optionsType}
        onClose={_handleClose}
        onEdit={_handleOpenModalEdit}
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

export default ColumnOptions
