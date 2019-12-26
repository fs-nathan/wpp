import React from 'react'
import styled from 'styled-components'
import {
    IconButton
} from '@material-ui/core'
import { mdiAlarmPlus, mdiFileTree, mdiPaperclip, mdiImage, mdiEmoticon, mdiAt } from '@mdi/js';
import Icon from '@mdi/react'
// import * as MaterialIcon from '@material-ui/icons'
// import colors from '../../../helpers/colorPalette'
import IconLike from '../../../assets/like.svg'

// const WrapFunctionBar = styled.div`
//     height: 50px;
//     padding: 0 10px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
// `

// const WrapInputMessage = styled.div`
//     height: 60px;
//     padding: 0 10px;
//     border-top: 1px solid rgba(0, 0, 0, 0.1);
//     transition: border-color 0.6s linear;
//     &:focus-within {
//         border-top: 1px solid ${colors['green'][0]};
//     }
// `

// const ChatInput = styled.input`
//     border: none;
//     width: 100%;
//     height: 100%;
//     font-size: 15px;
//     &:focus {
//         outline: none;
//     }
// `

// const LikeIcon = styled(MaterialIcon.ThumbUp)`
//     color: ${colors['green'][0]};
// `

// const LikeButton = styled(IconButton)`
//     &:hover {
//         background-color: transparent;
//     }
// `

const ButtonIcon = styled(IconButton)`
  margin-left: auto;
  &:hover {
    background: none;
  }
  & > span > svg {
    &:hover {
      fill: #03b000;
    }
  }
`;

function renderFunctionBar(props) {
    return (
        <div className="wrap-function-bar-fp">
            <div>
                <ButtonIcon>
                    <Icon path={mdiAt} size={1.2} />
                </ButtonIcon>
                <ButtonIcon>
                    <Icon path={mdiEmoticon} size={1.2} />
                </ButtonIcon>
                <ButtonIcon>
                    <Icon path={mdiImage} size={1.2} />
                </ButtonIcon>
                <ButtonIcon>
                    <Icon path={mdiPaperclip} size={1.2} />
                </ButtonIcon>
                <ButtonIcon>
                    <Icon path={mdiFileTree} size={1.2} />
                </ButtonIcon>
                <ButtonIcon>
                    <Icon path={mdiAlarmPlus} size={1.2} />
                </ButtonIcon>
            </div>
            <div>
                <ButtonIcon>
                    <img src={IconLike} alt="vtask_like_icon" style={{ width: 25, height: 25}} />
                </ButtonIcon>
            </div>
        </div>
    )
}

function renderChatBar() {
    return (
        <div className="wrap-input-message">
            <input className="chat-input" type="text" placeholder="Nhập @ gợi ý, nội dung thảo luận..." />
        </div>
    )
}

export default function FooterPart() {
    return (
        <>
            {renderFunctionBar()}
            {renderChatBar()}
        </>
    )
}