import { Avatar } from "@material-ui/core";
import { detailUser } from "actions/user/detailUser";
import clsx from "clsx";
import { getUpdateProgressDate } from "helpers/jobDetail/stringHelper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

const ChatSticker = ({
  handleReplyChat,
  id,
  sticker,
  user_create_id,
  user_create_avatar,
  user_create_name,
  time_create = Date.now(),
  user_create_position,
  user_create_roles = [],
  isReply,
  is_me,
  sticker_width_of_web,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();
  const dateFormat = useSelector((state) => state.system.profile.format_date);

  function onClickAvatar() {
    dispatch(detailUser({ userId: user_create_id }));
  }

  return (
    <div className={clsx("ChatSticker", `TextMessage__${chatPosition}`)}>
      {!isReply && !is_me && (
        <abbr title={user_create_name}>
          <Avatar
            onClick={onClickAvatar}
            className={clsx("TextMessage--avatar", {
              "TextMessage--avatar__hidden": chatPosition !== "top",
            })}
            src={user_create_avatar}
          />
        </abbr>
      )}
      <div
        className={clsx("ImageMessage--rightContentWrap", {
          "ImageMessage--rightContentWrap__self": is_me,
        })}
      >
        <div className="ImageMessage--imagesContainer">
          <abbr
            className="TextMessage--tooltip"
            title={
              !isReply ? getUpdateProgressDate(time_create, dateFormat) : ""
            }
          >
            <div className={clsx("ImageMessage--wrap")}>
              <img
                className="ImageMessage--img"
                src={sticker}
                style={{ width: sticker_width_of_web }}
                alt="hd"
              />
            </div>
          </abbr>
        </div>
      </div>
    </div>
  );
};

ChatSticker.propTypes = {};

export default ChatSticker;
