export const getRowStyle = (rowProps) => {
  return {
    ...rowProps.style,
    maxWidth: rowProps.style.width,
    minWidth: rowProps.style.width,
  };
};

export const getCellStyle = (cellProps) => {
  return {
    ...cellProps.style,
    maxWidth: cellProps.style.width,
    minWidth: cellProps.style.width,
  };
};
