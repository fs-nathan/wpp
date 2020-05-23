import { Avatar, Button, Grid, makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import React from "react";
import styled from "styled-components";
import { colors } from "../../contants/attrs";
import { EditPopover } from "./Popover";



const FlexBoxStatus = styled.div`
    display:flex;
    margin-top: 10px;
`
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
const styles = makeStyles(theme => ({
    p_0: {
        margin: 0
    },
    right_1: {
        marginLeft: "1em"
    },
    border_right: {
        borderRight: "1px solid #3333"
    },
    border_bottom: {
        borderBottom: "1px solid #3333"
    },
    left_column: {
        height: "100vh"
    },
    name: {
        fontSize: "20px",
        color: "black"
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    status_title: {
        width: "auto",
        height: "30px",
        lineHeight: "30px",
        paddingLeft: "5px",
        paddingRight: "5px"
    },
    blue: {
        backgroundColor: colors.offer_status_waiting,
        color: "white"
    },
    ml_1: {
        marginLeft: "1em"
    },
    mt_1: {
        marginTop: "1em"
    },
    m_0: {
        margin: 0
    },
    p_1: {
        padding: "1em"
    },
    pb_1: {
        paddingBottom: "1em"
    },
    pt_1: {
        paddingTop: "1em"
    },
    bg_red: {
        backgroundColor: colors.offer_status_cancel,
        color: "white"
    },
    bg_blue: {
        backgroundColor: colors.number_offer,
        color: "white"
    },
    bg_green: {
        backgroundColor: colors.offer_of_me_approved,
        color: "white"
    },
    bg_grey: {
        backgroundColor: "#e6e6e6",
        color: "white"
    },
    color_green: {
        color: colors.offer_of_me_approved
    },
    color_blue: {
        color: colors.number_offer
    },
    color_orange: {
        color: "#FD7E14"
    },
    color_red: {
        color: "#f44336"
    },
    icon_file: {
        height: "30px",
        fontSize: "15px",
        width: "auto",
        display: "flex",
        alignItems: "center",
        opacity: "0.5",
        border: "1px solid #3333",
        color: "black",
        borderRadius: "3px"

    },
    add_file_button: {
        fontWeight: "400px !important"
    },
    h_100: {
        height: "100%"
    },
    w_100: {
        width: "100%"
    },
    btn: {
        borderRadius: "3px",
        border: "1px solid #3333",
        width: "100%",
        height: "40px"
    },
    small_avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }

}))
const RenderListApprovePerson = () => {
    const classes = styles()
    return (
        <>
            <div>
                <h4>Nguời phê duyệt</h4>
            </div>
            <div className={`${classes.mt_1} ${classes.border_bottom} ${classes.pb_1}`}>
                <Button size="small" startIcon={<AddIcon className={`${classes.color_blue} ${classes.add_file_button}`} />} >Thêm tài liệu</Button>
            </div>
        </>
    )
}
const RenderListFile = () => {
    const classes = styles()
    return (
        <>
            <div>
                <h4>Tài liệu đính kèm</h4>
            </div>
            <Grid container>
                <button
                    className={classes.icon_file}
                >
                    <CloudUploadIcon />
                                123.doc
                            </button>
            </Grid>
        </>
    )
}
const Detail = () => {
    const classes = styles()
    return (
        <>
            <div>
                <h2>Tăng lương cho chuyên viên Trần Văn Giang - Chuyên viên phòng tổ chức hành chính</h2>
            </div>
            <div className={classes.color_green}>
                # Tăng lương
                        </div>
            <div>
                <h4>Mô tả chi tiết</h4>
            </div>
            <div>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution</p>
            </div>
        </>
    )
}
const InforPerson = () => {
    const classes = styles()
    return (
        <Grid container className={`${classes.border_bottom} ${classes.pb_1}`}>
            <Grid item xs={2}>
                <Avatar className={classes.avatar} src="https://miro.medium.com/max/696/0*yP7NdX2wWQVilq1_.png" />
            </Grid>
            <Grid item>
                <div className={classes.name}>
                    Nguyễn Văn An
                </div>
                <div>
                    Chuyên viên phòng dự án
                </div>
                <div>
                    Đã tạo lúc 12:30 ngày 02/02/2020
                </div>
            </Grid>
        </Grid>
    )
}
const Status = () => {
    const classes = styles()
    return (
        <>
            <FlexBoxStatus>
                <div className={`${classes.bg_blue} ${classes.status_title}`}>
                    Gấp
                </div>
                <div className={`${classes.bg_red} ${classes.status_title} ${classes.ml_1}`}>
                    Bạn duyệt
                </div>
            </FlexBoxStatus>
        </>
    )
}
const PersonApproved = () => {
    const classes = styles()
    return (
        <Grid container alignItems="center" className={`${classes.p_1} `}>
            <Grid item xs={5}>
                <h4 className={classes.m_0}>Người phê duyệt</h4>
                <Button size="small" startIcon={<AddIcon className={`${classes.color_blue} ${classes.add_file_button}`} />} ><span classes={classes.color_blue} style={{ fontSize: "10px", fontWeight: "300" }}>Thêm người phê duyệt</span></Button>
            </Grid>
            <Grid item xs={7} direction="row" alignItems="center">
                <Grid container>
                    <Grid item xs={2}>
                        <Avatar src="https://miro.medium.com/max/696/0*yP7NdX2wWQVilq1_.png" />
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" className={classes.h_100} justify="center">
                            <h5 className={classes.m_0}>Nguyễn Văn A</h5>
                            <div className={classes.color_orange}>Người phê duyệt</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
const LeftColumn = () => {
    const classes = styles()
    return (
        <Grid item xs={6} className={classes.border_right}>
            <InforPerson />
            <Detail />
            <Status />
            <RenderListFile />
            <RenderListApprovePerson />
            <PersonApproved />
        </Grid>
    )
}
const RightColumn = () => {
    const classes = styles()
    return (
        <Grid item xs={6}>
            <Grid container>
                <Grid item xs={12}>
                    {/* <ApproveOfferDialog isOpen={true} /> */}
                    <WrapperButton1>
                        <Button variant="contained" color="primary" disableElevation className={`${classes.w_100}  ${classes.bg_green}`} >
                            TẠO PHÊ DUYỆT
                        </Button>
                    </WrapperButton1>
                </Grid>
                <Grid item xs={12}>
                    <WrapperButton2>
                        <Button variant="contained" color="primary" disableElevation className={`${classes.w_100} ${classes.color_red} ${classes.mt_1}  ${classes.bg_grey}`}>
                            Trạng thái: Đang xử lý (30% đồng ý)
                        </Button>
                    </WrapperButton2>
                </Grid>
                <Grid item xs={12} className={classes.mt_1}>
                    <h4>Điều kiện đồng ý</h4>
                </Grid>
                <Grid item xs={12} className={classes.mt_1}>
                    <div>Tỷ lệ thành viên đồng ý: >100%</div>
                </Grid>

                <Grid item xs={12} className={classes.mt_1}>
                    <div>Các thành viên sau phải cùng đồng ý</div>
                </Grid>

                <Grid item xs={12} className={classes.mt_1}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Avatar className={classes.small_avatar} src="https://miro.medium.com/max/696/0*yP7NdX2wWQVilq1_.png" />
                                </Grid>
                                <Grid className={classes.ml_1} item xs={8}>
                                    <div>Nguyễn văn a</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* - */}
                <Grid item xs={12} className={`${classes.border_bottom} ${classes.pt_1} ${classes.pb_1}`}>
                    <Grid container direction="row">
                        <h4 className={classes.m_0}>Kết quả phê duyệt:</h4>
                        <div className={classes.ml_1}>Đồng ý(1) </div>
                        <div className={classes.ml_1}>Từ chối(1) </div>
                    </Grid>
                </Grid>
                {/* - */}
                <Grid item xs={12} className={classes.mt_1}>
                    <Grid container>
                        <Grid items xs={2}>
                            <Avatar src="https://miro.medium.com/max/696/0*yP7NdX2wWQVilq1_.png" />
                        </Grid>
                        <Grid items xs={8} direction="column">
                            <h5 className={classes.m_0}>Nguyễn Văn A</h5>
                            <div className={classes.color_orange}>Người phê duyệt</div>
                            <div>Phê duyệt ngày 12:30 ngày 20/02/2020</div>
                            <div className={classes.mt_1}>Đồng ý tăng lương</div>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" alignItems="center" >
                                <WrapperButton1>
                                    <Button variant="contained" size="small" color="primary" disableElevation className={classes.bg_green}>
                                        Đồng ý
                                    </Button>
                                </WrapperButton1>
                                <EditPopover />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
const Content = () => {
    const classes = styles()
    return (
        <Grid container spacing={3}>
            <LeftColumn />
            <RightColumn />
        </Grid>
    )
}
export default Content;