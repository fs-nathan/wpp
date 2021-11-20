import React from "react";
import ContentColumn from "./ContentColumn";

const ListContentColumn = ({ data = [], dragHandle = {} }) => {
  return data.map((cell) => {
    return <ContentColumn cell={cell} dragHandle={dragHandle} />;
  });
};

export default React.memo(ListContentColumn);
