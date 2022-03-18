import { Box, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { apiService } from "constants/axiosInstance";
import {
  DEFAULT_MESSAGE,
  SnackbarEmitter,
  SNACKBAR_VARIANT,
} from "constants/snackbarController";
import { get } from "lodash";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ColumnOptionsList from "./ColumnOptionsList";

const ColumnOptionsGroup = ({
  project,
  taskId,
  defaultSelected = {},
  options = [],
  onEdit = () => {},
}) => {
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const projectId = params.get("groupID");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(defaultSelected);

  React.useEffect(() => {
    if (!anchorEl) return;
    const cellHTML = anchorEl.closest(".td");
    if (Boolean(anchorEl)) {
      cellHTML && cellHTML.classList.add("focus");
    }
    return () => {
      cellHTML && cellHTML.classList.remove("focus");
    };
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _handleSelect = (item) => {
    setSelected(item);
    setSelected(item);

    _handleUpdateProject({
      project_id: project.id,
      project_group_id: projectId,
      name: project.name,
      description: project.description,
      priority: item?.value || 0,
      project_label_id: project?.project_label?.id || null,
    });
  };

  const _handleUpdateProject = async (data) => {
    try {
      await apiService({
        url: "/project/update",
        method: "PUT",
        data,
      });
      SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
    } catch (error) {
      SnackbarEmitter(
        SNACKBAR_VARIANT.ERROR,
        get(error, "messaage", DEFAULT_MESSAGE.MUTATE.ERROR)
      );
    }
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
