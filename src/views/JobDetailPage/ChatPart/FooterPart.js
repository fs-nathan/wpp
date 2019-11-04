import React from 'react'
import styled from 'styled-components'
import {
    IconButton
} from '@material-ui/core'
import * as MaterialIcon from '@material-ui/icons'
import colors from '../../../helpers/colorPalette'

const WrapFunctionBar = styled.div`
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const WrapInputMessage = styled.div`
    height: 60px;
    padding: 0 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    transition: border-color 0.6s linear;
    &:focus-within {
        border-top: 1px solid ${colors['green'][0]};
    }
`

const ChatInput = styled.input`
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
        outline: none;
    }
`

const LikeIcon = styled(MaterialIcon.ThumbUp)`
    color: ${colors['like'][0]};
`

const LikeButton = styled(IconButton)`
    &:hover {
        background-color: transparent;
    }
`

function renderFunctionBar(props) {
    return (
        <WrapFunctionBar>
            <div>
                <IconButton>
                    <MaterialIcon.AlternateEmail />
                </IconButton>
                <IconButton>
                    <MaterialIcon.EmojiEmotions />
                </IconButton>
                <IconButton>
                    <MaterialIcon.Image />
                </IconButton>
                <IconButton>
                    <MaterialIcon.AttachFile />
                </IconButton>
                <IconButton>
                    <MaterialIcon.AccountTree />
                </IconButton>
                <IconButton>
                    <MaterialIcon.AlarmAdd />
                </IconButton>
            </div>
            <div>
                <LikeButton>
                    <LikeIcon />
                </LikeButton>
            </div>
        </WrapFunctionBar>
    )
}

export default function FooterPart() {
    return (
        <>
            {renderFunctionBar()}
            <WrapInputMessage>
                <ChatInput type="text" placeholder="Nhập @ gợi ý, nội dung thảo luận..."/>
            </WrapInputMessage>
        </>
    )
}