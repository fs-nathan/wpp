import { Avatar, Button, Grid } from "@material-ui/core";
import classNames from 'classnames';
import { isEmpty } from "helpers/utils/isEmpty";
import get from "lodash/get";
import React, { useState } from 'react';
import styled from "styled-components";
import ApproveOfferDialog from "views/JobDetailPage/TabPart/OfferTab/TabBody/ApproveOfferDialog";
import { action } from "views/OfferPage/contants/attrs";
import { styles } from './style';
const WrapperButton1 = styled.div`    
    button:hover {
        background-color: #03c30b;
    }
`
const WrapperButton2 = styled.div`    
    button:hover {
        background-color: #e6e6e6;
    }
`
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
          <WrapperButton1>
            <Button variant="contained" onClick={() => setOpenModal(true)} color="primary" disableElevation className={`${classes.w_100}  ${classes.bg_green}`} >
              TẠO PHÊ DUYỆT
            </Button>
          </WrapperButton1>
        </Grid>
        <Grid item xs={12}>
          <WrapperButton2>
            <Button variant="contained" color="primary" disableElevation className={classNames(classes.w_100, classes.mt_1, classes.bg_grey, textStatus(status_code))}>
              Trạng thái: {status_code === 0 && "Đang chờ xử lý"} {status_code === 1 && "Đang duyệt"} {status_code === 2 && "Chấp nhận"} {status_code === 3 && "Từ chối"} ({rate_accepted}% đồng ý)
              </Button>
          </WrapperButton2>
        </Grid>
        <Grid item xs={12} className={classes.mt_1} >
          <h4 className={classNames(classes.m_0)}>Điều kiện đồng ý</h4>
        </Grid>
        <Grid item xs={12} className={classes.mt_1}>
          <div>Tỷ lệ thành viên đồng ý: >{get(condition_accept, "min_rate", "0")}%</div>
        </Grid>

        <Grid item xs={12} className={classes.mt_1}>
          <div>{get(condition_accept, "condition_logic_member") === "OR" ? "Một trong các thành viên sau phải đồng ý" : "Tất cả thành viên sau phải đồng ý"}</div>
        </Grid>

        <Grid item xs={12} className={classes.mt_1}>
          <Grid container>
            {get(condition_accept, "member_accept", []).map(member =>
              <>

                <Grid item xs={4}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Avatar className={classes.small_avatar} src={member.avatar} />
                    </Grid>
                    <Grid className={classes.ml_1} item xs={8}>
                      <div>{member.name}</div>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {/* - */}
        <Grid item xs={12} className={classNames(classes.border_bottom, classes.pb_1)}>
          <Grid container direction="row">
            <h4 className={classes.m_0}>Kết quả phê duyệt:</h4>
            <div className={classes.ml_1}>Đồng ý({number_member_accepted}) - Từ chối({number_member_rejected})  </div>
          </Grid>
        </Grid>
        {/* - */}
        <Grid item xs={12} className={classes.mt_1}>
          {!isEmpty(members_approved) && members_approved.map(member =>
            <>
              <Grid container justify="space-around">
                <Grid items>
                  <Avatar src={get(member, "avatar")} />
                </Grid>
                <Grid items xs={7} direction="column">
                  <h5 className={classes.m_0}>{get(member, "name")}</h5>
                  <div className={classes.color_orange}>Người phê duyệt</div>
                  <div>Phê duyệt ngày 12:30 ngày 20/02/2020</div>
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="column" alignItems="center" >
                    {get(member, "status") === 0 && <Button variant="contained" size="small" disableElevation className={classes.bg_green}>
                      Đồng ý
                  </Button>}
                    {get(member, "status") === 1 && <Button variant="contained" size="small" disableElevation className={classes.bg_red}>
                      Từ chối
                  </Button>}
                    {/* <CustomPopover /> */}
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