import React from "react";
import ContentColumn from "./ContentColumn";

const ListContentColumn = ({
  data = [],
  dragHandle = {},
  isGroupColumn = false,
  ...props
}) => {
  return data.map((cell, index) => {
    return (
      <ContentColumn
        key={index}
        cell={cell}
        dragHandle={dragHandle}
        isGroupColumn={isGroupColumn}
        {...props}
      />
    );
  });
};

export default React.memo(ListContentColumn);
