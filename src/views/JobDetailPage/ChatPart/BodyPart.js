import React, {
    useEffect,
    // useRef 
} from 'react'
import styled from 'styled-components'
import {
    IconButton, Typography, Avatar
} from '@material-ui/core'
import Icon from '@mdi/react';
import { mdiShare, 
    // mdiDivingSnorkel 
} from '@mdi/js';
import * as MaterialIcon from '@material-ui/icons'
// import colors from '../../../helpers/colorPalette'
import fakeAvatar from '../../../assets/avatar.jpg'
import AvatarCircleList from '../../../components/AvatarCircleList'
import DetailMessage from './DetailMessage'


// const Container = styled.div`

// `

// const WrapChat = styled.div`
// `

// const WrapMessageRow = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
//     align-items: center;
//     &:hover > .wrap-function-message {
//         display: block;
//     }
//     margin-bottom: 10px;
// `

// const WrapMessage = styled.div`
//     background-color: ${props => props.isUser ? '#dbfff3' : '#fff'};
//     min-height: 30px;
//     padding: 5px 10px;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;
//     margin-left: 5px;
// `

// const WrapFunctionBar = styled.div`
//     margin-right: 5px;
//     display: none;
// `

// const WrapCommonRow = styled.div`
//     display: flex;
//     justify-content:center;
//     align-items: center;
//     margin-bottom: 10px;
// `

// const WrapProjectMessage = styled.div`
//     background-color: white;
//     border-radius: 4px;
//     padding: 20px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 0px 0px 6px 2px rgba(0,0,0,.3);
// `
// const Line = styled.div`
//     border: 1px solid #e6e7e8;
//     position: absolute;
//     top: 50%;
//     width: 100%;
//     transform: translateY(-50%);
// `

// const WrapTime = styled.div`
//     position: relative;
//     margin-bottom: 10px;
//     height: 20px;
// `

// const Time = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: 1;
//     background-color: #d7d7d8;
//     color: #f5f5f5;
//     border-radius: 10px;
//     padding: 8px;
// `

const FunctionButton = styled(IconButton)`
    max-height: 40px;
    &:hover {
        //background-color: transparent;
    }
`

const MemberText = styled(Typography)`
    font-weight: bold;
    color: #7f7f7f;
`

const SubText = styled(Typography)`
    color: #b1b1b1;
`

const ProjectText = styled(Typography)`
    color: #00af6e;
    font-weight: bold;
`

function MessageParent(props) {
    const {
        isUser, content
    } = props
    return (
        <div isUser={isUser}
        className={"wrap-message-row " + isUser ? "wmr-row-reverse" : "wmr-row" }
        // className={isUser ? "wrap-message-row wmr-row-reverse" : "wrap-message-row wmr-row"} 
        >
            
            {!isUser && <Avatar src={fakeAvatar} />}

            <div className="wrap-message" isUser={isUser}>
                {content}
            </div>
            <div className="wrap-function-bar">
                <FunctionButton>
                    <Icon path={mdiShare} size={1} color={'rgba(0, 0, 0, 0.54)'} />
                </FunctionButton>
                <FunctionButton>
                    <MaterialIcon.ThumbUp size="small" />
                </FunctionButton>
                <FunctionButton>
                    <MaterialIcon.FormatQuote size="small" />
                </FunctionButton>
                <FunctionButton>
                    <MaterialIcon.MoreVert size="small" />
                </FunctionButton>
            </div>
        </div>
    )
}

function NotifyText(props) {
    return (
        <div className="wrap-common-row">
            <MemberText>{"Nguyễn Hữu Thành"}</MemberText>
            <SubText>&nbsp;{"đã tạo công việc mới"}</SubText>
        </div>
    )
}

function TimeText(props) {
    return (
        <div className="wrap-time">
            <div className="line" />
            <div className="time">09:03 hôm nay</div>
        </div>
    )
}

function ProjectDetailMessage(props) {
    return (
        <div className="wrap-common-row">
            <div className="wrap-project-message">
                <ProjectText>
                    Xây dựng phương án kinh doanh cho công ty
                </ProjectText>
                <SubText>
                    Bắt đầu: 09:25 ngày 12/09/2019
                </SubText>
                <SubText>
                    Kết thúc: 19:00 ngày 22/09/2019
                </SubText>
                <SubText>
                    Mức độ ưu tiên: Trung bình
                </SubText>
                <AvatarCircleList total={18} display={4} />
            </div>
        </div>
    )
}

export default function BodyPart(props) {

    let chatRef = null

    useEffect(() => {
        if (chatRef) {
            chatRef.scrollTop = 700
            // console.log(chatRef)
            // chatRef.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatRef])

    return (
        <div>
            <div ref={ref => chatRef = ref}>
                <TimeText />
                <NotifyText />
                <ProjectDetailMessage />
                <MessageParent isUser content="Tạo project mới" />
                <MessageParent content="Ae triển khai công việc nhé !!!" />
                <DetailMessage />
                <div style={{ height: 800 }}></div>
            </div>
        </div>
    )
}