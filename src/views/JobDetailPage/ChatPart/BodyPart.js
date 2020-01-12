import React, {
    useEffect,
    // useRef 
} from 'react'
import styled from 'styled-components'
import {
    Typography
} from '@material-ui/core'
import AvatarCircleList from '../../../components/AvatarCircleList'
import DetailMessage from './DetailMessage'
import RemindMessage from './RemindMessage'
import WrapMessage from './WrapMessage'
import { CHAT_TYPE } from '../../../helpers/jobDetail/arrayHelper'

const FAKE_DATA = [
    {
        id: 1,
        type: 0,
        new_task_name: "Công việc 1",
        user_create_name: "Thành Nguyễn",
        user_create_avatar: "https://storage.googleapis.com/storage_vtask_net/2020/1578061598195-filename",
        user_create_roles: []
    },
    {
        id: "5e0dec61e39b2bc4f9f0f4d5",
        priority: 0,
        priority_name: "Hight",
        type: 19,
        user_create_name: "Thành Nguyễn",
        user_create_avatar: "https://storage.googleapis.com/storage_vtask_net/2020/1578061598195-filename",
        user_create_roles: []
    },
    {
        id: "5e0afa5534f1db1fe300d597",
        content: "That is my design 2 files",
        files: [
            { 
                id: "5e0afa5534f1db1fe300d595", 
                url: "https://storage.googleapis.com/storage_vtask_net/2019/1577777746454-logo.png",
                name: "logo.png", size: "6.16 KB", type: "png"
            },
            {
                id: "5e0afa5534f1db1fe300d596",
                url: "https://storage.googleapis.com/storage_vtask_net/2019/1577777748041-myw3schoolsimage.jpg",
                name: "myw3schoolsimage.jpg", size: "4.27 KB", type: "jpg"
            }
        ],
        type: 1,
        user_create_name: "Thành Nguyễn",
        user_create_avatar: "https://storage.googleapis.com/storage_vtask_net/2020/1578061598195-filename",
        user_create_roles: []
    },
    {
        id: "5e0af5a8d917501c24a6697c",
        content: "CHao ca nha",
        type: 0,
        user_create_name: "Thành Nguyễn",
        user_create_avatar: "https://storage.googleapis.com/storage_vtask_net/2020/1578061598195-filename",
        user_create_roles: []
    }    
]

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

// function MessageParent(props) {
//     const {
//         isUser, content
//     } = props
//     return (
//         <div className={"wrap-message-row " + (isUser ? "wmr-row-reverse" : "wmr-row")}>            
//             {!isUser && <Avatar src={fakeAvatar} />}
//             <div className= {"wrap-message " + (isUser ? "wm-bg-color-blue" : "wm-bg-color-white") }>
//                 {content}
//             </div>
//             <div className="wrap-function-bar-bp">
//                 <FunctionButton>
//                     <Icon path={mdiShare} size={1} color={'rgba(0, 0, 0, 0.54)'} />
//                 </FunctionButton>
//                 <FunctionButton>
//                     <MaterialIcon.ThumbUp size="small" />
//                 </FunctionButton>
//                 <FunctionButton>
//                     <MaterialIcon.FormatQuote size="small" />
//                 </FunctionButton>
//                 <FunctionButton>
//                     <MaterialIcon.MoreVert size="small" />
//                 </FunctionButton>
//             </div>
//         </div>
//     )
// }

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



function TextMessage (props) {
    return (
        <WrapMessage {...props}>
            <p>12323</p>
            <p>123123</p>
        </WrapMessage>
    )
}

function Message (props) {
    switch(props.type) {
        case CHAT_TYPE.REMIND_TASK:
            return <RemindMessage {...props}/>
        case CHAT_TYPE.TEXT:
            return <TextMessage {...props}/>
        default: 
            return (<div>Tin nhắn này bị lỗi hiển thị</div>)
    }
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
                <Message type={0}/>
                <Message type={3} isUser />
                <Message type={3} name='Nguyễn Văn Hùng' role='Trưởng phòng' projectRole='Admin' authorityList={['Thực hiện']}/>
                <Message 
                    type={3} hideAvatar
                    name='Nguyễn Văn Hùng' role='Trưởng phòng' projectRole='Admin' authorityList={['Thực hiện']} 
                />
                {/* <MessageParent isUser content="Tạo project mới" /> */}
                {/* <MessageParent content="Ae triển khai công việc nhé !!!" /> */}
                <DetailMessage />
            </div>
        </div>
    )
}