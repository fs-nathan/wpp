import React from 'react'
import { Avatar, Typography, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../../../assets/avatar.jpg'
import colorPal from '../../../helpers/colorPalette'




const members = [
    { id: 1, name: 'Nguyễn Văn Hùng', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'], content: 'Xây dựng phương án quản lí dự án' },
    { id: 2, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'], content: 'Sẽ hoàn thành vào sáng ngày mai  ' },
    { id: 3, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
    { id: 4, name: 'Nguyễn Văn Hà', role: 'Trưởng phòng', projectRole: 'Admin', authorityList: ['Thực hiện'], content: 'Xây dựng phương án quản lí dự án' },
    { id: 5, name: 'Trần Văn Giang', role: 'TGĐ', projectRole: 'Admin', authorityList: ['Giám sát'], content: 'Sẽ hoàn thành vào sáng ngày mai  ' },
    { id: 6, name: 'Hà Thanh Mai', role: 'Nhân viên', projectRole: 'Khác    ', authorityList: ['Thực hiện'] },
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
        <Typography style={{color: color}}>{role}-{authorityList}</Typography>
    )
}

const TitleMessage = ({ name, role, authorityList }) => {
    return (
        <Content>
            <ListItemText
                style={{ margin: 0}}
                primary={
                    <Typography component='div' style={{ color: 'gray'}}>
                       {name}
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        {getSubColorRole(role, authorityList)}
                    </React.Fragment>
                }
            />
            <Typography component='div' style={{ color: 'gray'}}>09:30</Typography>
        </Content>
    )
}

const ContentMessage = ({content}) => {
    return (
        <StyledTextContentMess component='div'>
            {content}
        </StyledTextContentMess>
    )
}

const QuoteDetailMess = ({name, content}) => {
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

export default function DetailMessage() {
    //const [data] = React.useState(members);
    return (
        <Container>
            {members.map((element, index) => {
                return (
            <Typography component='div'>
                <StyledFrameMess component='div'>
                    
                    <TitleMessage key={element.id} {...element}/>
                    { (element.id === 2) && 
                        <QuoteDetailMess {...element} />
                    }
                    { element.content &&
                        <ContentMessage {...element}/> 
                    }
                    { (element.id === 3) &&
                        <DeleteConversation/>
                    }
                </StyledFrameMess>
            </Typography>
                )
            })}
        </Container>
    )
}