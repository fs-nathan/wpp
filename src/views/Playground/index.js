import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ShareFromLibraryModal from "views/JobDetailPage/ChatComponent/ShareFromLibraryModal";
import { loginlineParams } from "views/JobPage/utils";
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
    Component: QuickViewTaskDetailExample,
  },
  shareFromLibraryModal: {
    path: rootPath + "/shareFromLibraryModal",
    breadcumName: "shareFromLibraryModal",
    Component: ({ onBack }) => {
      const [open, setOpen] = useState();
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
            <Button onClick={() => setOpen(true)}>Show modal</Button>
          </Grid>
          <ShareFromLibraryModal
            open={open}
            setOpen={setOpen}
            onClickConfirm={loginlineParams}
          />
        </>
      );
    },
  },
};
const Playground = () => {
  const history = useHistory();
  const handleBack = useCallback(
    () => history.replace(routeEntities.default.path),
    [history]
  );

  return (
    <Grid container style={{ height: "100%" }}>
      <Switch>
        <Route
          path={routeEntities.quickViewTask.path}
          render={() => (
            <routeEntities.quickViewTask.Component
              onBack={handleBack}
            ></routeEntities.quickViewTask.Component>
          )}
        ></Route>
        <Route
          path={routeEntities.shareFromLibraryModal.path}
          render={() => (
            <routeEntities.shareFromLibraryModal.Component
              onBack={handleBack}
            ></routeEntities.shareFromLibraryModal.Component>
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
                <ButtonBase>
                  <Card
                    onClick={() =>
                      history.replace(routeEntities.shareFromLibraryModal.path)
                    }
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Hướng dẫn
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {routeEntities.shareFromLibraryModal.breadcumName}
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
