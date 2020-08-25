import { CardContent } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { showImagesList } from "actions/chat/chat";
import classnames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { injectClassName } from "views/JobPage/utils";
import "./TasksCard.css";
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
const Header = injectClassName("comp_TasksCard__Header")(CardHeader);
const Content = injectClassName("comp_TasksCard__Content")(CardContent);

const Media = injectClassName("comp_TasksCard__Media")(
  ({ className, images = emptyArray, ...props }) => {
    const dispatch = useDispatch();
    if (!images.length) return null;
    const [one, two, three, four] = images;
    const hadMore = images.length && images.length >= 5;
    return (
      <div
        className={classnames(
          className,
          `comp_TasksCard__Media${Math.min(4, images.length)}`
        )}
        {...props}
      >
        <div className="cursor-pointer">
          {one && (
            <img
              src={one.url_thumb}
              alt=""
              onClick={() => {
                dispatch(showImagesList(true, images));
              }}
            />
          )}
          {two && (
            <img
              src={two.url_thumb}
              alt=""
              onClick={() => {
                dispatch(showImagesList(true, images, 1));
              }}
            />
          )}
          {three && (
            <img
              src={three.url_thumb}
              alt=""
              onClick={() => {
                dispatch(showImagesList(true, images, 2));
              }}
            />
          )}
          {hadMore ? (
            <div
              onClick={() => {
                dispatch(showImagesList(true, images, 3));
              }}
            >
              <img src={four.url_thumb} alt="" />
              <div
                onClick={() => {
                  dispatch(showImagesList(true, images, 3));
                }}
                className="comp_TasksCard__Media__mark"
              >
                +{images.length - 4}
              </div>
            </div>
          ) : (
            four && (
              <img
                onClick={() => {
                  dispatch(showImagesList(true, images, 3));
                }}
                src={four.url_thumb}
                alt=""
              />
            )
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
  HighLight,
};
