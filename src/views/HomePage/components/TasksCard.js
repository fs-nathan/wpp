import { CardContent } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import React from "react";
import { useToggle } from "react-use";
import ModalImage from "views/JobDetailPage/ModalImage";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import "./TasksCard.css";

const injectClassName = (classN) => (C = "div") => {
  return ({ className, ...props }) => {
    return React.createElement(C, {
      className: classnames(classN, className),
      ...props,
    });
  };
};
const Container = injectClassName("comp_TasksCard__Container")((props) => {
  return <Card variant="outlined" {...props}></Card>;
});
const HeaderAvatar = injectClassName("comp_TasksCard__HeaderAvatar")(Avatar);
const HeaderTitle = injectClassName("comp_TasksCard__HeaderTitle")((props) => (
  <Typography component="span" {...props} />
));
const HeaderSubTitle = injectClassName(
  "comp_TasksCard__HeaderSubTitle"
)((props) => <Typography component="span" {...props} />);
const HighLight = injectClassName("comp_TasksCard__HighLight")();
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
  ({ className, images = emptyArray, ...props }) => {
    if (!images.length) return null;
    const [one, two, three, four] = images;
    const hadMore = images.length && images.length >= 5;
    const [istoggle, toggle] = useToggle();
    return (
      <div
        className={classnames(
          className,
          `comp_TasksCard__Media${Math.min(4, images.length)}`
        )}
        {...props}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            toggle();
          }}
        >
          {one && <img src={one.url} alt="" />}
          {two && <img src={two.url} alt="" />}
          {three && <img src={three.url} alt="" />}
          {hadMore ? (
            <div style={{ position: "relative", height: "100%" }}>
              <img src={four.url} alt="" />
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
                +{images.length - 4}
              </div>
            </div>
          ) : (
            four && <img src={four.url} alt="" />
          )}
        </div>
        {istoggle && (
          <ModalImage
            {...{
              isOpen: true,
              handleClose: toggle,
              images: images,
            }}
          ></ModalImage>
        )}
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
  HighLight,
};
