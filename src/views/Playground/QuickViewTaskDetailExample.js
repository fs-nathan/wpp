import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import QuickViewTaskDetailDrawer from "views/JobPage/components/QuickViewTaskDetailDrawer";
import "./QuickViewTaskDetailExample.css";
export const QuickViewTaskDetailExample = ({ onBack }) => {
  const [taskId, setTaskId] = useState();
  return (
    <>
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Button onClick={onBack}>Back</Button>
        <Button onClick={() => setTaskId("5e9dcfe4fc288bb413acaad8")}>
          Show task
        </Button>
      </Grid>
      <QuickViewTaskDetailDrawer
        className="comp_QuickViewTaskDetailExample"
        taskId={taskId}
        onClose={() => setTaskId(null)}
      />
    </>
  );
};
