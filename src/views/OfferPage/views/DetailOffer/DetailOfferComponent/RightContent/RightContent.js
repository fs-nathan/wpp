import { Avatar, Button, Grid } from "@material-ui/core";
import classNames from 'classnames';
import { isEmpty } from "helpers/utils/isEmpty";
import get from "lodash/get";
import React, { useState } from 'react';
import styled from "styled-components";
import ApproveOfferDialog from "views/JobDetailPage/TabPart/OfferTab/TabBody/ApproveOfferDialog";
import { action } from "views/OfferPage/contants/attrs";
import { styles } from '../style';
import './styles.scss';

const RightContent = ({ status_code, rate_accepted, members_approved, number_member_rejected, number_member_accepted, date_label, hour_label, content, title, id, priority_code, user_create_name, condition_accept, user_create_avatar }) => {
  const classes = styles()
  const [openModal, setOpenModal] = useState(false)
  const onConfirm = () => {
    setOpenModal(false)
  }
  const textStatus = (status_code) => {
    if (status_code === 0) {
      return ""
    }
    if (status_code === 1) {
      return classes.color_orange
    }
    if (status_code === 2) {
      return classes.color_green
    }
    if (status_code === 3) {
      return classes.color_red
    }
  }
  return (
    <Grid item xs={6}>
      <Grid container>
        <Grid item xs={12}>
          <ApproveOfferDialog onConfirm={onConfirm} handleClickClose={onConfirm} isOpen={openModal} item={{
            user_create_avatar,
            content,
            onConfirm,
            title,
            user_create_name,
            priority_code,
            id,
            date_create: hour_label + " " + date_label,
            action: action.HANDLE_OFFER
          }}
          />
          <Button className="offerDetail-createApprovalBtn" variant="contained" onClick={() => setOpenModal(true)} color="primary" disableElevation>
            TẠO PHÊ DUYỆT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button className="offerDetail-approvalStatusBtn" variant="contained" color="primary" disableElevation>
            Trạng thái: {status_code === 0 && "Đang chờ xử lý"} {status_code === 1 && "Đang duyệt"} {status_code === 2 && "Chấp nhận"} {status_code === 3 && "Từ chối"} ({rate_accepted}% đồng ý)
          </Button>
        </Grid>
        <Grid item xs={12} className="offerDetail-approvalConditionContainer">
          <h4 className="offerDetail-approvalConditionContainer-title">Điều kiện phê duyệt đồng ý</h4>
        </Grid>
        <Grid item xs={12} className="offerDetail-memberApprovalRateContainer">
          <div>Tỷ lệ thành viên đồng ý:&nbsp;&nbsp;&nbsp;≥&nbsp;&nbsp;&nbsp;{get(condition_accept, "min_rate", "0")}%</div>
        </Grid>

        <Grid item xs={12} className="offerDetail-memberToAccept-title">
          {get(condition_accept, "condition_logic_member") === "OR"
          ? "Một trong các thành viên sau phải đồng ý:"
          : "Tất cả thành viên sau phải đồng ý:"}
        </Grid>
        <Grid item xs={12} className="offerDetail-memberToAccept-container">
          <Grid container>
            {get(condition_accept, "member_accept", []).map(member =>
              <>
                <Grid item xs={4}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar className="offerDetail-memberToAccept-avatar" src={member.avatar} />
                    </Grid>
                    <Grid className="offerDetail-memberToAccept-name" item xs={8}>
                      <div>{member.name}</div>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {/* - */}
        <Grid item xs={12}>
          <Grid container direction="row">
            <div className="offerDetail-approvalResult-title">Kết quả phê duyệt:&nbsp;</div>
            <div className="offerDetail-approvalResult-result">Đồng ý ({number_member_accepted}) - Từ chối ({number_member_rejected})  </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className="offerDetail-horizontalLine" />
        </Grid>
        {/* - */}
        <Grid item xs={12}>
          {!isEmpty(members_approved) && members_approved.map(member =>
            <>
              <Grid container justify="space-around" alignItems="flex-start">
                <Grid items>
                  <Avatar src={get(member, "avatar")} />
                </Grid>
                <Grid items xs={7} direction="column">
                  <div className="offerDetail-approvalResult-member-name">{get(member, "name")}</div>
                  <div className="offerDetail-approvalResult-member-position">Người phê duyệt</div>
                  <div>Phê duyệt lúc 12:30 ngày 20/02/2020</div>
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="column" alignItems="center" >
                    {
                      get(member, "status") === 0 &&
                      <Button variant="contained" size="small" disableElevation className="bg--green">
                        Đồng ý
                      </Button>
                    }
                    {
                      get(member, "status") === 1 &&
                      <Button variant="contained" size="small" disableElevation className="bg--red">
                        Từ chối
                      </Button>
                    }
                    {/* <Popover /> */}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}

        </Grid>
      </Grid>
    </Grid >
  )
}
export default RightContent;
