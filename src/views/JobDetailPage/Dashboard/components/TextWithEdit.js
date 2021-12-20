import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

const TextWithEdit = ({
  variant = "p",
  isTitle = false,
  isNewData = false,
  defaultValue = "",
  styleTitle = {},
  styleInput = {},
  placeholder = "",
}) => {
  const refInput = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(isNewData);

  useEffect(() => {
    if (isNewData && isTitle)
      setTimeout(() => {
        refInput.current.focus();
      }, 100);
  }, [isNewData]);

  const _handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      refInput.current.focus();
    }, 100);
  };

  const _handleChange = (e) => setValue(e.target.value);

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const _handleBlur = (e) => {
    if (value) setIsEditing(false);
  };

  return (
    <Wrapper>
      <input
        type="text"
        ref={refInput}
        placeholder={placeholder}
        value={value}
        style={{ ...styleInput, display: isEditing ? "block" : "none" }}
        onChange={_handleChange}
        onKeyDown={_handleKeyDown}
        onBlur={_handleBlur}
      />
      <>
        <Typography
          variant={variant}
          component="div"
          style={{ ...styleTitle, display: !isEditing ? "block" : "none" }}
        >
          {value}
        </Typography>
        <div
          className="wp-wrapper-button"
          style={{
            margin: "0 5px",
            color: "#878787",
            display: !isEditing ? "flex" : "none",
          }}
          onClick={_handleEdit}
        >
          <EditIcon />
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default TextWithEdit;
