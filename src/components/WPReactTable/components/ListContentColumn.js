import React from "react";
import ContentColumn from "./ContentColumn";

const ListContentColumn = ({ data = [], dragHandle = {}, ...props }) => {
  return data.map((cell) => {
    return <ContentColumn cell={cell} dragHandle={dragHandle} {...props} />;
  });
};

export default React.memo(ListContentColumn);
