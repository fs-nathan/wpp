import React from 'react'
import { Avatar, Typography, ListItemText, ListItem, CardMedia, Button } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../../../assets/avatar.jpg'
import colorPal from '../../../helpers/colorPalette'
import { mdiClockOutline, mdiArrowRightBold, mdiAlarm, mdiFileTree, mdiDownload, mdiLinkVariant, mdiLinkOff, mdiMapMarker, mdiEmailSend, mdiBullhorn } from '@mdi/js';
import Icon from '@mdi/react';
import ImageChatTest from '../../../assets/imageChatTest.jpg'
import NoImage from '../../../assets/no-img.png'
import iconXls from '../../../assets/xls.png'



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
    { id: 15, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 16, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 17, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 18, name: 'Nguyễn Văn Hà', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'] },
    { id: 19, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'] },
    { id: 20, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
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
// QuoteDetail
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

const QuoteDetailMess = ({ name, content }) => {
    return (
        <QuoteMessDetail component='div'>
            <Typography component='p'>{name}</Typography>
            <Typography component='p'>{content}</Typography>
        </QuoteMessDetail>
    )
}
// Conversation
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

const DeleteConversation = () => {
    return (
        <ConversationDelete component='div'>
            <Typography component='p'>Thảo luận đã được xóa</Typography>
            <Typography component='p'>Lúc 09:12 - 12/09/2019</Typography>
        </ConversationDelete>
    )
}
// Add member
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
// delete member
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
// Adjustment progress
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

const AdjustmentProgress = () => {
    return (
        <AdjustmentProgressMess component='div'>
            <Typography>Đã điều chỉnh tiến độ </Typography>
            <Typography component='div'>
                <Icon path={mdiClockOutline} size={1.2} color={'gray'} />
                <Typography component='div'>Ngày bắt đầu: 09:15 - 20/09/2019</Typography>
            </Typography>
        </AdjustmentProgressMess>
    )
}
// update progress
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

const UpdateProgress = () => {
    return (
        <UpdateProgressMess component='div'>
            <Typography>Đã cập nhập tiến độ</Typography>
            <Typography>Hoàn thành: 30%</Typography>
        </UpdateProgressMess>
    )
}
// update name
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

const UpdateNameWork = () => {
    return (
        <UpdateNameWorkMess component='div'>
            <Typography>Đã cập nhật tên công việc</Typography>
            <Typography>Phân tích hệ thống bằng giải pháp AI</Typography>
        </UpdateNameWorkMess>
    )
}
// update status
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

// work 
const WorkChildMess = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 10px;
    }
    & > div:nth-child(2) {
        display: flex;
        align-items: center;
        & > div {
            margin-right: 10px;
            background-color: #e3e6e4;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            justify-content: center;
            display: flex;
            align-items: center;
        }
    }
    
`

const WorkChild = () => {
    return (
        <WorkChildMess component='div'>
            <Typography>Đã tạo công việc con</Typography>
            <Typography component='div'>
                <Typography component='div'>
                    <Icon path={mdiFileTree} size={0.8} color={'gray'} />
                </Typography>
                <Typography component='span'>Đàm phán hợp đồng</Typography>
            </Typography>
        </WorkChildMess>
    )
}
// delete work
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

const DeleteWorkChild = () => {
    return (
        <DeleteWorkChildMess component='div'>
            <Typography>Đã xóa công việc con</Typography>
            <Typography>Chuyển tiền hợp đồng lần 1</Typography>
        </DeleteWorkChildMess>
    )
}
// remind
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

const Remind = () => {
    return (
        <RemindMess component='div'>
            <Typography>Đã tạo nhắc hẹn</Typography>
            <ListItem>
                <Icon path={mdiAlarm} size={1} color={'white'} />
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
// ====== image
const ImageChatMess = styled(Typography)`

`
const ImageChat = () => {
    return (
        <ImageChatMess component='div'>
            <CardMedia
                component="img"
                height="auto"
                image={ImageChatTest}
            />
        </ImageChatMess>
    )
}

const NoImageChat = () => {
    return (
        <CardMedia
            component="img"
            height="214px"
            image={NoImage}
        />
    )
}
const DocumentChatMess = styled(Typography)`
    & > p {
        color: #6e6d6d;
    }
    & > *:last-child {
        display: flex;
        & > li {
            padding: 8px 0;
            & > img {
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
            & > div > div {
                font-weight: bold;
                color: #07a2f5;
            }
        }
    }
`
const DocumentChat = () => {
    return (
        <DocumentChatMess component='div'>
            <Typography component='p'>Đã chia sẻ tài liệu</Typography>
            <Typography component='div'>
                <ListItem>
                    <img src={iconXls} alt='avatar' />
                    <ListItemText
                        style={{ margin: 0 }}
                        primary={
                            <Typography component='div'>
                                Bảng tổng hợp khách.xlsx
                            </Typography>
                        }
                        secondary={
                            <Typography component='p'>912KB</Typography>
                        }
                    />
                </ListItem>
                <Icon path={mdiDownload} size={2} color={'gray'} />
            </Typography>
        </DocumentChatMess>
    )
}

const ShareLinkMess = styled(Typography)`
    & > p {
        font-size: 14px;
        color: #6e6d6d;
    }
    & > *:last-child > li {
        padding-left: 0;
        & > div:nth-child(1) {
            padding: 0;
            & > svg {
                width: 37px;
                height: 37px;
                border-radius: 4px;
                margin-right: 12px;
                background-color: #0494e0;
                padding: 10px;
            }
        }
        & > div:nth-child(2) > div > a {
            font-size: 15px;
            font-weight: bold;
            color: #0494e0;
        }

    }
`
const ShareLink = () => {
    return (
        <ShareLinkMess component='div'>
            <Typography component='p'>Đã chia sẻ link</Typography>
            <Typography component='div'>
                <ListItem>
                    <div>
                        <Icon path={mdiLinkVariant} size={2} color={'white'} />
                    </div>
                    <ListItemText
                        style={{ margin: 0 }}
                        primary={
                            <Typography component='div'>
                                <a href='https://vtask.net/' target="_blank">https://vtask.net/</a>
                            </Typography>
                        }
                    />
                </ListItem>
            </Typography>
        </ShareLinkMess>
    )
}
const DeleteLinkMess = styled(Typography)`
    & > li {
        padding: 10px 10px 10px 0;
        & > svg {
            width: 37px;
            height: 37px;
            border-radius: 4px;
            margin-right: 12px;
            background-color: #a4a6a6;
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
const DeleteLink = () => {
    return (
        <DeleteLinkMess component='div'>
            <ListItem>
                <Icon path={mdiLinkOff} size={2} color={'white'} />
                <ListItemText
                    style={{ margin: 0 }}
                    primary={
                        <Typography component='div'>
                            Link đã được xóa
                        </Typography>
                    }
                    secondary={
                        <Typography component='p'>Lúc 09:12 - 12/09/2019</Typography>
                    }
                />
            </ListItem>
        </DeleteLinkMess>
    )
}
const ShareLocationMess = styled(Typography)`
    & > p {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 8px;
    }
    & > *:last-child {
        padding-left: 0;
            padding: 0;
            & > svg {
                width: 37px;
                height: 37px;
                border-radius: 50%;
                margin-right: 12px;
                background-color: #ffa305;
                padding: 10px;
            }
            & > div:nth-child(2) > div {
                font-weight: 400;
                font-size: 15px;
            }
        }

    }
`

const ShareLocation = () => {
    return (
        <ShareLocationMess component='div'>
            <Typography component='p'>Đã chia sẻ vị trí</Typography>
            <ListItem>
                <Icon path={mdiMapMarker} size={1} color={'white'} />
                <ListItemText
                    style={{ margin: 0 }}
                    primary={
                        <Typography component='div'>
                            Công ty CP XNK Việt Nam
                        </Typography>
                    }
                    secondary={
                        <Typography component='p'>Số 32,ngõ 32,đường Giải Phóng</Typography>
                    }
                />
            </ListItem>
        </ShareLocationMess>
    )
}
// ApproveOffer
const ApproveOfferMess = styled(Typography)`
    & > p:nth-child(1) {
        font-size: 14px;
        color: #6e6d6d;
        margin-bottom: 8px;
    }
    & > div {
        width: auto;
        height: auto;
        border-radius: 10px;
        background-color: #f7f7f7;
        border-left: 3px solid #4e9bff;
        padding: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: start;
        align-items: center;
        & > div {
            height: 23px;
            width: 23px;
            display: flex;
            background: #05f4fc;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            border-radius: 50%
        }
        & > p {
            color: #a6a6a6
        }
    }
`
const ApproveOffer = () => {
    return (
        <ApproveOfferMess component='div'>
            <Typography component='p'>Đã duyệt đề xuất</Typography>
            <Typography component='div'>
                <Typography component='div'>
                    <Icon path={mdiEmailSend} size={0.8} color={'white'} />
                </Typography>
                <Typography component='p'>Anh cho em nghỉ ngày mai nhé</Typography>
            </Typography>
            <Typography component='p'>Tôi đồng ý mười tay</Typography>
        </ApproveOfferMess>
    )
}
// reply image
const ReplyImageMess = styled(Typography)`
    width: auto;
    height: auto;
    border-radius: 10px;
    background-color: #f7f7f7;
    border-left: 3px solid #4e9bff;
    padding: 10px;
    margin-bottom: 13px;
    & > *:first-child {
        & > img {
            height: 60px;
            width: 97px;
        }
    }
`

const ReplyImg = () => {
    return (
        <>
            <ReplyImageMess component='div'>
                <Typography component='div'>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={ImageChatTest}
                    />
                </Typography>
            </ReplyImageMess>
            <Typography component='p'>Bức ảnh quá đẹp, tks!</Typography>
        </>
    )
}

const WrapCommonRow = styled.span`
    display: flex;
    justify-content:center;
    align-items: center;
`
const WrapProjectMessage = styled.div`
    background-color: white;
    border-radius: 20px;
    width: 380px;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
    & > div:nth-child(1) {
        background: red;
        text-align: center;
        padding: 13px 0 25px 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        & > span {
            text-align: center;
            font-weight: 600;
            background: red;
            color: white;
            font-size: 14px;
            padding-bottom: 9px;
            border-bottom: 2px solid white;
        }
    }
    & > div:nth-child(2) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #bfbfbf;
        padding: 15px 0;
        & > div:nth-child(1){
            font-size: 16px;
            font-weight: bold;
        }
        & > div:nth-child(2) {
            font-size: 76px;
            font-weight: bold;
        }
        & > div:nth-child(3) {
            font-size: 19px;
            font-weight: 500;
            text-transform: uppercase;
            margin: 0 10px;
            text-align: center;
        }
        & > div:nth-child(4) {
            font-size: 14px;
            margin-top: 10px;
            color: #a6a6a6;
        }
    }
    & > button {
        & > span > div{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        & > div {
            display: flex;
            align-items: center;
            padding: 15px 0;
            & > svg {
                margin-right: 7px;
            }
            & > span {
                color : #05bdfa;
                font-size: 14px;
                font-weight: 500;
            }
        }
    }
}
`

function RemindMessage(props) {
    return (
        <WrapCommonRow>
            <WrapProjectMessage>
                <Typography component='div'>
                    <span>Nhắc hẹn</span>
                </Typography>
                <Typography component='div'>
                    <Typography component='div'>Tháng 9</Typography>
                    <Typography component='div'>17</Typography>
                    <Typography component='div' >Tiến độ thực tế chậm so với kế hoạch 20%</Typography>
                    <Typography component='div'>Lúc 09:25 ngày 17/09/2019 - Nhắc 1 lần</Typography>
                </Typography>
                <Button>
                    <Typography component='div'>
                        <Typography component='div'>
                            <Icon path={mdiAlarm} size={1.3} color={'#05bdfa'} />
                            <Typography component='span'>Xem chi tiết</Typography>
                        </Typography>
                    </Typography>
                </Button>
            </WrapProjectMessage>
        </WrapCommonRow>
    )
}

export default function DetailMessage() {
    //const [data] = React.useState(members);
    return (
        <Container>
            <RemindMessage />
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
                            {(element.id === 13) &&
                                <ImageChat />
                            }
                            {(element.id === 14) &&
                                <NoImageChat />
                            }
                            {(element.id === 15) &&
                                <DocumentChat />
                            }
                            {(element.id === 16) &&
                                <ShareLink />
                            }
                            {(element.id === 17) &&
                                <DeleteLink />
                            }
                            {(element.id === 18) &&
                                <ShareLocation />
                            }
                            {(element.id === 19) &&
                                <ApproveOffer />
                            }
                            {(element.id === 20) &&
                                <ReplyImg />
                            }
                        </StyledFrameMess>
                    </Typography>
                )
            })}
        </Container>
    )
}