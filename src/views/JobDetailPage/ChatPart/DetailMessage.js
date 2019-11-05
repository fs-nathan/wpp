import React from 'react'
import { Avatar, Typography, ListItemText, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../../../assets/avatar.jpg'
import colorPal from '../../../helpers/colorPalette'
import { mdiClockOutline, mdiArrowRightBold, mdiCheckCircleOutline, mdiAlarm   } from '@mdi/js';
import Icon from '@mdi/react';
import * as MaterialIcon from '@material-ui/icons'




const members = [
    { id: 1, name: 'Nguyễn Văn Hùng', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'], content: 'Xây dựng phương án quản lí dự án' },
    { id: 2, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'], content: 'Sẽ hoàn thành vào sáng ngày mai  ' },
    { id: 3, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 4, name: 'Nguyễn Văn Hà', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'] },
    { id: 5, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 6, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 7, name: 'Nguyễn Văn Hà', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'] },
    { id: 8, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 9, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 10, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 11, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 12, name: 'Nguyễn Văn Hà', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'] },
    { id: 13, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 14, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
]


const Container = styled.div`
    margin: 20px
`
const StyledFrameMess = styled(Typography)`
    height: auto;
    padding: 11px 15px 10px 17px;
    width: 300px;
    border-radius: 10px;
    background-color: #fffefa;
    margin: 5px;
`
const AvatarMess = styled(Avatar)`
    height: 30px;
    width: 30px;
`
// const StyledSubText = styled(Typography)`
//     color: 
// `
const Content = styled.div`
    display: flex;
    margin-bottom: 14px;
`
const StyledTextContentMess = styled(Typography)`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
`
const QuoteMessDetail = styled(Typography)`
    width: auto;
    height: auto;
    border-radius: 10px;
    background-color: #f7f7f7;
    border-left: 3px solid #4e9bff;
    padding: 10px;
    margin-bottom: 13px;
    & > *:first-child {
        font-size: 12px;
        color: ${colorPal['gray'][0]};
        margin-bottom: 2px;
    }
    & > *:last-child {
        font-size: 13px;
        color: ${colorPal['gray'][0]};
        font-weight: 500;
    }
`
const ConversationDelete = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #acacac;
        font-weight: 500;
    }
    & > p:nth-child(2) {
        font-size: 11px;
        color: #939292;
    }
`
const AddMemberMess = styled(Typography)`
    & > p {
        font-size: 14px;
        color: #6e6d6d;
    }
    & > li {
        padding: 10px 10px 10px 0;
        & > div:nth-child(1) {
            margin-right: 7px;
        }
        & > div:nth-child(2) {
            & > *:last-child {
                font-size: 11px;
                color: ${colorPal['gray'][0]}
            }
        }
    }
`

const DeleteMemberMess = styled(Typography)`
    & > p {
        font-size: 14px;
        color: red;
    }
    & > li {
        padding: 10px 10px 10px 0;
        & > div:nth-child(1) {
            margin-right: 7px;
            height: 30px;
            width: 30px;
        }
        & > div:nth-child(2) {
            & > div {
                font-size: 14px;
                color: ${colorPal['gray'][0]}
            }
        }
    }
`
const AdjustmentProgressMess = styled(Typography)`
    margin-bottom: 20px; 
    & > p {
        font-size: 13px;
        color: #6e6d6d;
    }
    & > div {
        display: flex;
        align-items: center;
        margin-top: 7px;
        & > svg {
            margin-right: 7px;
        }
    }
`

const UpdateProgressMess = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 10px;
    }
    & > p:nth-child(2) {
        font-size: 15px;
        margin-bottom: 20px;
    }
`
const UpdateNameWorkMess = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 10px;
    }
    & > p:nth-child(2) {
        font-size: 14px;
        margin-bottom: 20px;
    }
`
const UpdateStatusWorkMess = styled(Typography)`
    margin-bottom: 20px;
    & > div:nth-child(2) {    
        display: flex;
        align-items: center;
        margin-top: 10px;
        & > svg {
            margin: 0 10px;
        }
    }
`
const WorkChildMess = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 10px;
    }
    & > div:nth-child(2) {
        display: flex;
        align-items: center;
        & > div > svg {
            color: #6e6d6d;
            margin-right: 10px;
        }
    }
    
`
const DeleteWorkChildMess = styled(Typography)`
    margin-bottom: 20px;
    & > p:nth-child(1) {
        font-size: 14px;
        color: red;
        margin-bottom: 10px;
    }
    & > p:nth-child(2) {
        font-size: 14px;
        color: ${colorPal['gray'][0]}
    }
`
const RemindMess = styled(Typography)`
    & > p {
        font-size: 14px;
        color: #6e6d6d;
    }
    & > li {
        padding: 10px 10px 10px 0;
        & > svg {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-right: 10px;
            background-color: #fc0845;
            padding: 10px;
        }
        & > div:nth-child(2) {
            & > *:last-child {
                font-size: 11px;
                color: ${colorPal['gray'][0]}
            }
        }
    }
`
const getSubColorRole = (role, authorityList) => {
    let color = ""
    switch (role) {
        case "Trưởng phòng":
            color = "#f0a626";
            break;
        case 'TGĐ':
            color = "#37ded3";
            break;
        case "Nhân viên":
            color = "#2b88d9";
            break;
        default:
            color = "black";
            break;
    }
    return (
        <Typography style={{ color: color }}>{role}-{authorityList}</Typography>
    )
}

const TitleMessage = ({ name, role, authorityList }) => {
    return (
        <Content>
            <ListItemText
                style={{ margin: 0 }}
                primary={
                    <Typography component='div' style={{ color: 'gray' }}>
                        {name}
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        {getSubColorRole(role, authorityList)}
                    </React.Fragment>
                }
            />
            <Typography component='div' style={{ color: 'gray' }}>09:30</Typography>
        </Content>
    )
}

const ContentMessage = ({ content }) => {
    return (
        <StyledTextContentMess component='div'>
            {content}
        </StyledTextContentMess>
    )
}

const QuoteDetailMess = ({ name, content }) => {
    return (
        <QuoteMessDetail component='div'>
            <Typography component='p'>{name}</Typography>
            <Typography component='p'>{content}</Typography>
        </QuoteMessDetail>
    )
}

const DeleteConversation = () => {
    return (
        <ConversationDelete component='div'>
            <Typography component='p'>Thảo luận đã được xóa</Typography>
            <Typography component='p'>Lúc 09:12 - 12/09/2019</Typography>
        </ConversationDelete>
    )
}

const AddMembers = ({ name, role }) => {
    return (
        <AddMemberMess component='div'>
            <Typography component='p'>Đã thêm thành viên</Typography>
            <ListItem>
                <Avatar src={avatar} />
                <ListItemText
                    style={{ margin: 0 }}
                    primary={
                        <Typography component='div'>
                            {name}
                        </Typography>
                    }
                    secondary={
                        <Typography component='p'>{role}</Typography>
                    }
                />
            </ListItem>
        </AddMemberMess>
    )
}

const DeleteMember = ({ name }) => {
    return (
        <DeleteMemberMess component='div'>
            <Typography component='p'>Đã xóa thành viên</Typography>
            <ListItem>
                <Avatar src={avatar} />
                <ListItemText
                    style={{ margin: 0 }}
                    primary={
                        <Typography component='div'>
                            {name}
                        </Typography>
                    }
                />
            </ListItem>
        </DeleteMemberMess>
    )
}

const AdjustmentProgress = () => {
    return (
        <AdjustmentProgressMess component='div'>
            <Typography>Đã điều chỉnh tiến độ </Typography>
                <Icon path={mdiClockOutline} size={1.2} color={'gray'} />
                <Typography component='div'>Ngày bắt đầu: 09:15 - 20/09/2019</Typography>
        </AdjustmentProgressMess>
    )
}

const UpdateProgress = () => {
    return (
        <UpdateProgressMess component='div'>
            <Typography>Đã cập nhập tiến độ</Typography>
            <Typography>Hoàn thành: 30%</Typography>
        </UpdateProgressMess>
    )
}

const UpdateNameWork = () => {
    return (
        <UpdateNameWorkMess component='div'>
            <Typography>Đã cập nhật tên công việc</Typography>
            <Typography>Phân tích hệ thống bằng giải pháp AI</Typography>
        </UpdateNameWorkMess>
    )
}

const UpdateStatusWork = () => {
    return (
        <UpdateStatusWorkMess component='div'>
            <Typography>Đã cập nhật trạng thái công việc</Typography>
            <Typography component='div'>
                Đang chờ <Icon path={mdiArrowRightBold} size={1} color={'#757575'} /> Đang làm
            </Typography>
        </UpdateStatusWorkMess>
    )
}
const WorkChild = () => {
    return (
        <WorkChildMess component='div'>
            <Typography>Đã tạo công việc con</Typography>
            <Typography component='div'>
                <Typography component='div'>
                    <MaterialIcon.AccountTree size={0.7} />
                </Typography>
                <Typography component='span'>Đàm phán hợp đồng</Typography>
            </Typography>
        </WorkChildMess>
    )
}

const DeleteWorkChild = () => {
    return (
        <DeleteWorkChildMess component='div'>
            <Typography>Đã xóa công việc con</Typography>
            <Typography>Chuyển tiền hợp đồng lần 1</Typography>
        </DeleteWorkChildMess>
    )
}

const Remind = () => {
    return (
        <RemindMess component='div'>
            <Typography>Đã tạo nhắc hẹn</Typography>
            <ListItem>
                <Icon path={mdiAlarm} size={1} color={'white'}/>
                <ListItemText
                    style={{ margin: 0 }}
                    primary={
                        <Typography component='div'>
                            Gọi điện tư vấn khách hàng
                        </Typography>
                    }
                    secondary={
                        <Typography component='p'>Nhắc hẹn lúc 09:00 hàng ngày</Typography>
                    }
                />
            </ListItem>
        </RemindMess>
    )
}
export default function DetailMessage() {
    //const [data] = React.useState(members);
    return (
        <Container>
            {members.map((element, index) => {
                return (
                    <Typography component='div'>
                        <StyledFrameMess component='div'>

                            <TitleMessage key={element.id} {...element} />
                            {(element.id === 2) &&
                                <QuoteDetailMess {...element} />
                            }
                            {element.content &&
                                <ContentMessage {...element} />
                            }
                            {(element.id === 3) &&
                                <DeleteConversation />
                            }
                            {(element.id === 4) &&
                                <AddMembers {...element} />
                            }
                            {(element.id === 5) &&
                                <DeleteMember {...element} />
                            }
                            {(element.id === 6) &&
                                <AdjustmentProgress />
                            }
                            {(element.id === 7) &&
                                <UpdateProgress {...element} />
                            }
                            {(element.id === 8) &&
                                <UpdateNameWork />
                            }
                            {(element.id === 9) &&
                                <UpdateStatusWork />
                            }
                            {(element.id === 10) &&
                                <WorkChild />
                            }
                            {(element.id === 11) &&
                                <DeleteWorkChild />
                            }
                            {(element.id === 12) &&
                                <Remind />
                            }
                        </StyledFrameMess>
                    </Typography>
                )
            })}
        </Container>
    )
}