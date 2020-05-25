import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { usePrimarySubmitActionStyles } from "views/HomePage/components/PrimarySubmitAction";
import ShareFromLibraryModal from "views/JobDetailPage/ChatComponent/ShareFromLibraryModal";
import { loginlineParams } from "views/JobPage/utils";
import useWebpush from "webpush/useWebpush";
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
  webpush: {
    path: rootPath + "/webpush",
    breadcumName: "webpush",
    Component: ({ onBack }) => {
      const {
        isSubscribed,
        handleSubscribe,
        handleUnsubscribe,
        loading,
      } = useWebpush();
      const classes = usePrimarySubmitActionStyles();
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
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                onClick={() => {
                  !isSubscribed
                    ? handleSubscribe()
                    : (() => {
                        if (
                          window.confirm("Do you really want to unsubscribe?")
                        ) {
                          handleUnsubscribe();
                        }
                      })();
                }}
                color={!isSubscribed ? "primary" : "default"}
              >
                {!isSubscribed ? "subscribed" : "unsubscribe"}
              </Button>
              {loading && (
                <CircularProgress
                  color="primary"
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
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
          path={routeEntities.webpush.path}
          render={() => (
            <routeEntities.webpush.Component
              onBack={handleBack}
            ></routeEntities.webpush.Component>
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
              <Grid
                spacing={4}
                container
                item
                justify="center"
                alignItems="center"
              >
                <Grid item>
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
                <Grid item>
                  <ButtonBase>
                    <Card
                      onClick={() =>
                        history.replace(
                          routeEntities.shareFromLibraryModal.path
                        )
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
                <Grid item>
                  <ButtonBase>
                    <Card
                      onClick={() =>
                        history.replace(routeEntities.webpush.path)
                      }
                    >
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Hướng dẫn
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {routeEntities.webpush.breadcumName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ButtonBase>
                </Grid>
              </Grid>
            </>
          )}
        ></Route>
      </Switch>
    </Grid>
  );
};
export default Playground;
