export const getRowStyle = (
  rowProps,
  providedProps,
  isDragging = false,
  isDraggingOver = false
) => {
  const style = rowProps.style || {};
  return {
    maxWidth: style.width,
    minWidth: style.width,
    width: style.width,
    ...providedProps.style,
  };
};

export const getCellStyle = (cellProps) => {
  return {
    ...cellProps.style,
    maxWidth: cellProps.style.width,
    minWidth: cellProps.style.width,
  };
};
