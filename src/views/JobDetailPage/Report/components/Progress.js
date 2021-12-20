import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Progress = ({
  title,
  progress,
  color,
  stateProgress,
  isPlan = false,
}) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Typography variant="h6" component="div" style={{ fontSize: "1rem" }}>
        {title}
      </Typography>
      <WrapperProgress progress={progress} color={color}>
        <span>{progress}%</span>
        <WrapperCursor progress={stateProgress}>
          <ProgressCursor isPlan={isPlan} />
        </WrapperCursor>
      </WrapperProgress>
    </div>
  );
};

const WrapperProgress = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: #fff;
  padding: 1em;
  span {
    z-index: 999;
    position: absolute;
    top: 50%;
    transform: translate(-100%, -50%);
    left: ${({ progress }) => `${progress < 5 ? 5 : progress}%`};
  }
  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
  }
  &:after {
    width: 100%;
    height: 100%;
    background: ${(props) => props.color};
    opacity: 0.3;
  }
  &:before {
    width: ${(props) => `${props.progress}%`};
    height: 100%;
    background: ${(props) => props.color};
  }
`;

const WrapperCursor = styled.div`
  position: absolute;
  left: ${({ progress }) => `calc(${progress}% - 9.5px)`};
  color: #feb019;
  bottom: 0;
  z-index: 99;
  height: 100%;
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #feb019;
    left: 50%;
    bottom: 0;
  }
`;

const ProgressCursor = styled(ArrowDropDownIcon)`
  visibility: ${({ isPlan }) => (isPlan ? "visibility" : "hidden")};

  position: ${({ isPlan }) => (isPlan ? "absolute" : "unset")};
  top: -50%;
  left: -1px;
`;

export default Progress;
