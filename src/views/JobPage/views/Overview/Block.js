import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(theme => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  card: {
    flex: 1,
    width: "100%",
    boxShadow: "none"
  },
  cardHeader: {
    height: "30px",
    alignItems: "start"
  },
  cardContent: {
    justifyContent: "flex-end",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardHeaderTitle: {
    fontSize: "1rem",
    fontWeight: "bold"
  },
  cardHeaderSubTitle: {
    marginTop: "0.2rem",
    fontSize: "0.9rem"
  }
}));
export const Block = ({ title, subheader, extra, children, ...props }) => {
  const classes = useStyles();
  return (
    <Card
      classes={{
        root: classes.card
      }}
      variant="outlined"
    >
      <CardHeader
        classes={{
          root: classes.cardHeader,
          title: classes.cardHeaderTitle,
          subheader: classes.cardHeaderSubTitle
        }}
        action={extra}
        title={title}
        subheader={subheader}
      />
      <CardContent
        classes={{
          root: classes.cardContent
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};
export default Block;
