import React, { useEffect, useRef } from "react";
import { useLocation } from "react-use";

const ScrollTopLocationChange = () => {
  const location = useLocation();
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView();
  }, [location]);
  return <div ref={ref} />;
};
export default ScrollTopLocationChange;
