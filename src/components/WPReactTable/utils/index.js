export const getRowStyle = (rowProps, providedProps, isDragging = false) => {
  const style = rowProps.style || {};
  if (isDragging) return { ...providedProps.style };
  return {
    display: "flex",
    maxWidth: style.width,
    minWidth: style.width,
    width: style.width,
  };
};

export const getCellStyle = (cellProps) => {
  return {
    ...cellProps.style,
    maxWidth: cellProps.style.width,
    minWidth: cellProps.style.width,
  };
};
