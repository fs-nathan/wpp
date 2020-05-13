import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { QuickViewTaskDetailExample } from "./QuickViewTaskDetailExample";

const rootPath = "/playground";

const routeEntities = {
  default: {
    path: rootPath,
    breadcumName: "",
    component: QuickViewTaskDetailExample,
  },
  quickViewTask: {
    path: rootPath + "/QuickViewTaskDetailDrawer",
    breadcumName: "QuickViewTaskDetailDrawer",
    component: QuickViewTaskDetailExample,
  },
};
const Playground = () => {
  const history = useHistory();
  const handleBack = useCallback(
    () => history.replace(routeEntities.default.path),
    []
  );

  return (
    <Grid container style={{ height: "100%" }}>
      <Switch>
        <Route
          path={routeEntities.quickViewTask.path}
          render={() => (
            <routeEntities.quickViewTask.component
              onBack={handleBack}
            ></routeEntities.quickViewTask.component>
          )}
        ></Route>
        <Route
          path={routeEntities.default.path}
          render={() => (
            <>
              <Grid item xs={12}>
                <Box padding="20px">
                  <Typography variant="h3" bold>
                    PlayGround
                  </Typography>
                </Box>
              </Grid>
              <Grid container item justify="center" alignItems="center">
                <ButtonBase>
                  <Card
                    onClick={() =>
                      history.replace(routeEntities.quickViewTask.path)
                    }
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Hướng dẫn
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {routeEntities.quickViewTask.breadcumName}
                      </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase>
              </Grid>
            </>
          )}
        ></Route>
      </Switch>
    </Grid>
  );
};
export default Playground;
