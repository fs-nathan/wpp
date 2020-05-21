import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import "./style.scss";

const DetailOffer = ({
  can_modify,
  condition_accept,
  documents,
  content,
  date_label,
  hour_label,
  members_approved,
  members_can_approve,
  id,
  user_create_room,
  user_create_avatar,
  user_create_position,
  user_create_id,
  user_create_name,
  url_redirect,
  type_name,
  title,
  status_code,
  status_name,
  rate_accepted,
  priority_code,
  priority_name,
  offer_group_id,
  offer_group_name,
  number_member_accepted,
  number_member_rejected,
  members_monitor,
}) => {
  return (
    <div className="offerDetailContainer">
      <LeftContent
        id={id}
        date_label={date_label}
        hour_label={hour_label}
        user_create_position={user_create_position}
        user_create_name={user_create_name}
        user_create_avatar={user_create_avatar}
        user_create_id={user_create_id}
        can_modify={can_modify}
        title={title}
        priority_name={priority_name}
        status_name={status_name}
        members_can_approve={members_can_approve}
        content={content}
        documents={documents}
        priority_code={priority_code}
        type_name={type_name}
        members_monitor={members_monitor}
      />
      <div className="offerDetailContainer-verticalLine" />
      <RightContent
        can_modify={can_modify}
        status_code={status_code}
        rate_accepted={rate_accepted}
        number_member_rejected={number_member_rejected}
        number_member_accepted={number_member_accepted}
        members_approved={members_approved}
        date_label={date_label}
        hour_label={hour_label}
        priority_code={priority_code}
        content={content}
        title={title}
        id={id}
        user_create_name={user_create_name}
        user_create_avatar={user_create_avatar}
        condition_accept={condition_accept}
      />
    </div>
  );
};
DetailOffer.prototype = {
  can_modify: PropTypes.bool,
  condition_accept: PropTypes.object,
  documents: PropTypes.array,
  content: PropTypes.string,
  date_label: PropTypes.string,
  hour_label: PropTypes.string,
  members_approved: PropTypes.array,
  members_can_approve: PropTypes.array,
  id: PropTypes.string,
  user_create_room: PropTypes.string,
  user_create_position: PropTypes.string,
  user_create_name: PropTypes.string,
  user_create_id: PropTypes.string,
  user_create_avatar: PropTypes.string,
  url_redirect: PropTypes.any,
  type_name: PropTypes.string,
  title: PropTypes.string,
  status_name: PropTypes.string,
  status_code: PropTypes.number,
  rate_accepted: PropTypes.number,
  priority_name: PropTypes.string,
  priority_code: PropTypes.number,
  offer_group_name: PropTypes.string,
  offer_group_id: PropTypes.string,
  number_member_rejected: PropTypes.number,
  number_member_accepted: PropTypes.number,
  members_monitor: PropTypes.array,
};
export default DetailOffer;
