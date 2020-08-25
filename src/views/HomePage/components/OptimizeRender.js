import React from "react";
import { useDebounce } from "react-use";
const OptimizeRender = ({ children, timeout = 300 }) => {
  const [debouncedValue, setDebouncedValue] = React.useState(null);

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(children());
    },
    300,
    [children]
  );
  return debouncedValue;
};
export default OptimizeRender;
