import { Grid } from "@material-ui/core";
import WPSelectLabel from "components/SelectLabel";
import React from "react";
import TabNumber from "./TabNumber";

const TabContentColumn = ({ type, ...props }) => {
  if (type === "list")
    return (
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <WPSelectLabel {...props} />
      </Grid>
    );
  if (type === "number") return <TabNumber {...props} />;
  return null;
};

export default TabContentColumn;
