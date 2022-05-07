import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { updateGroupTask } from "actions/groupTask/updateGroupTask";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IconDrag } from "views/ProjectPage/RightPart/constant/Columns";

const ColumnNameGroup = ({
  row,
  value,
  dragHandle = {},
  onVisibleAddRow = () => {},
}) => {
  const group = row.original;
  return (
    <WrapperMainGroup>
      <WrapperLeft>
        <WrapperIconDrag className="drag-icon" {...dragHandle}>
          <IconDrag />
        </WrapperIconDrag>
        <WrapperButton {...row.getToggleRowExpandedProps()}>
          {!row.isExpanded ? (
            <ArrowRightRoundedIcon sx={{ fontSize: 28, fill: "#6d6e6f" }} />
          ) : (
            <ArrowDropDownRoundedIcon sx={{ fontSize: 28, fill: "#6d6e6f" }} />
          )}
        </WrapperButton>
        {/* Name group */}
        <NameGroup id={group.id} name={value} />
        {/* End name group */}
        <WrapperButton className="right-side" onClick={onVisibleAddRow}>
          <AddRoundedIcon sx={{ fill: "#6d6e6f" }} />
        </WrapperButton>
        <WrapperButton className="right-side">
          <MoreHorizRoundedIcon sx={{ fill: "#6d6e6f" }} />
        </WrapperButton>
      </WrapperLeft>
    </WrapperMainGroup>
  );
};

const NameGroup = ({ id = "", name = "" }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(name || "");
  const refInput = React.useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      if (isEditing) {
        refInput.current.focus();
        refInput.current.selectionStart = refInput.current.selectionEnd = 10000;
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [isEditing]);

  React.useEffect(() => {
    if (!refInput.current) return;
    const cellHTML = refInput.current.closest(".td");
    if (isEditing) {
      cellHTML && cellHTML.classList.add("focus");
    }
    return () => {
      cellHTML && cellHTML.classList.remove("focus");
    };
  }, [isEditing]);

  const _handleEditing = () => setIsEditing(true);

  const _handleBlur = () => {
    setIsEditing(false);
  };

  const _handleKeyPress = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      refInput.current.blur();
      setValue(e.target.value);
      dispatch(updateGroupTask({ groupTaskId: id, name: e.target.value }));
    }
  };

  const _handleChange = (e) => {
    setValue(e.target.value);
  };

  if (isEditing)
    return (
      <InputCustom
        border="none"
        ref={refInput}
        isGroup
        placeholder={"Write a task name"}
        rows="1"
        tabindex="-1"
        wrap="off"
        value={value}
        onBlur={_handleBlur}
        onChange={_handleChange}
        onKeyPress={_handleKeyPress}
      />
    );
  return (
    <WrapperName onClick={_handleEditing}>
      <StyledHeadingGroup>{value}</StyledHeadingGroup>
    </WrapperName>
  );
};

const WrapperLeft = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: calc(100% - 72px);
  .right-side {
    visibility: hidden;
  }
  &:hover{
    .right-side{
      visibility: visible;
    }
  }
`;

const WrapperRight = styled.div`
  align-items: "center";
`;

const WrapperIconDrag = styled.div`
  position: absolute;
  top: 50%;
  height: 19.5px;
  transform: translateY(-50%);
  visibility: hidden;
  position: absolute;
  left: 8px;
`;

const WrapperMainGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  .wrapper-right {
    display: none;
  }
  &:hover {
    .wrapper-right {
      display: flex;
    }
  }
`;

const WrapperButton = styled.div`
  height: 28px;
  min-height: 28px;
  min-width: 28px;
  width: 28px;
  border-radius: 6px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #6f7782;

  &.right-side {
    margin-left: 4px;
  }
  &:hover {
    background: #1507260a;
    fill: #151b26;
    cursor: pointer;
  }
`;

const TextEllipsis = styled.span`
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1e1f21;
  max-width: 100%;
  display: block;
`;

const StyledHeadingGroup = styled(TextEllipsis)`
  font-size: 16px;
  font-weight: 500;
  line-height: 36px;
  height: 36px;
  margin-left: 0;
  min-width: 1px;
  outline: none;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WrapperName = styled.div`
  min-height: 36px;
  font-size: 15px;
  font-weight: 400;
  margin-left: 0;
  min-width: 120px;
  outline: none;
  cursor: pointer;
`;

const InputCustom = styled.input`
  white-space: pre;
  background: transparent;
  border-radius: 1.5px;
  display: block;
  outline: 0;
  overflow: hidden;
  resize: none;
  width: calc(100% - 160px);
  margin-left: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  min-width: 20px;
  padding: 0 5px;
  text-rendering: optimizeSpeed;
  color: #1e1f21;
  ${(props) => {
    if (props.isGroup) {
      return {
        fontWeight: 500,
        fontSize: 16,
        padding: 5,
        borderColor: "#edeae9",
      };
    }
  }}
  &:hover {
    border: 1px solid #edeae9;
  }
  &:focus {
    border-color: ${(props) => (props.isGroup ? "#edeae9" : "transparent")};
  }
`;

export default ColumnNameGroup;
