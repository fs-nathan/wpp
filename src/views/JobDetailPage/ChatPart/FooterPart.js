import React from 'react'
import styled from 'styled-components'

const WrapFunctionBar = styled.div`
    height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0 10px;
`

const WrapInputMessage = styled.div`
    height: 60px;
    padding: 0 10px;
`

export default function FooterPart () {
    return (
        <div>
            <WrapFunctionBar>
                Icon chuc nang
            </WrapFunctionBar>
            <WrapInputMessage>
                Khung chat
            </WrapInputMessage>
        </div>
    )
}