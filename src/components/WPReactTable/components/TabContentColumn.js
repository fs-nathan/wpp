import { Grid } from "@material-ui/core";
import WPSelectLabel from "components/SelectLabel";
import React, { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import TabNumber from "./TabNumber";

const TabContentColumn = forwardRef(({ type, ...props }, ref) => {
  const refOptions = useRef(null);
  const refNumber = useRef(null);

  useImperativeHandle(ref, () => ({ _getValue }));

  const _getValue = () => {
    switch (type) {
      case "list":
        return refOptions.current._getValue();
      case "number":
        return refNumber.current._getValue();
      default:
        return null;
    }
  };

  if (type === "list") {
    return (
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <WPSelectLabel ref={refOptions} {...props} />
      </Grid>
    );
  }
  if (type === "number") return <TabNumber ref={refNumber} {...props} />;
  return null;
});

export default TabContentColumn;
