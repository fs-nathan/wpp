import React from "react";
import { Grid, Paper, makeStyles, Container } from "@material-ui/core";
import Layout from "../../Layout";

const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
    boxShadow: "none"
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

const Mission = () => {
  const classes = useStyles();
  return (
    <Layout title="MISSION">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Mission;
