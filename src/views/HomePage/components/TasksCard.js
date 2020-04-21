import { CardContent } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import React from "react";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import "./TasksCard.css";
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    // fontSize: "15px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const injectClassName = (classN) => (C) => {
  return ({ className, ...props }) => {
    return <C className={classnames(classN, className)} {...props}></C>;
  };
};
const Container = injectClassName("comp_TasksCard__Container")((props) => {
  return <Card variant="outlined" {...props}></Card>;
});
const HeaderAvatar = injectClassName("comp_TasksCard__HeaderAvatar")(Avatar);
const HeaderTitle = injectClassName("comp_TasksCard__HeaderTitle")((props) => (
  <Typography component="div" {...props} />
));
const HeaderSubTitle = injectClassName("comp_TasksCard__HeaderSubTitle")(
  Typography
);
const Header = ({ className, avatar, title, subheader, action, ...props }) => {
  const classes = {
    root: "comp_TasksCard__Header",
    action: "comp_TasksCard__HeaderAction",
  };
  return (
    <CardHeader
      classes={classes}
      avatar={avatar}
      action={action}
      title={title}
      subheader={subheader}
      {...props}
    />
  );
};
const Content = injectClassName("comp_TasksCard__Content")(CardContent);

const Media = injectClassName("comp_TasksCard__Media")(
  ({ className, srcs = emptyArray, ...props }) => {
    if (!srcs.length) return null;
    const [one, two, three, four] = srcs;
    const hadMore = srcs.length && srcs.length >= 5;
    return (
      <div
        className={classnames(
          className,
          `comp_TasksCard__Media${Math.min(4, srcs.length)}`
        )}
        {...props}
      >
        <div>
          {one && <img src={one} alt="" />}
          {two && <img src={two} alt="" />}
          {three && <img src={three} alt="" />}
          {hadMore ? (
            <div style={{ position: "relative", height: "100%" }}>
              <img src={four} alt="" />
              <div
                style={{
                  top: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "#00000057",
                  color: "#fff",
                  fontSize: "28px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +{srcs.length - 4}
              </div>
            </div>
          ) : (
            four && <img src={four} alt="" />
          )}
        </div>
      </div>
    );
  }
);

export default {
  Container,
  HeaderAvatar,
  HeaderTitle,
  HeaderSubTitle,
  Header,
  Content,
  Media,
};
